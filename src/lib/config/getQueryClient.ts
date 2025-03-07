import { QueryCache, QueryClient, isServer } from "@tanstack/react-query";
import { AxiosError } from "axios";

// TODO
// 1. 비즈니스 로직 에러 처리
// 2. UI에 표시할 에러 메시지 가공
// 3. 캐시/상태 관리 관련 처리

// NOTE - QueryClient 설정
// 앱 전반에서 @tanstack/react-query 라이브러리의 QueryClient를 직접 사용하지 않고 이 함수를 통해 생성하는 것을 권장함
function makeQueryClient() {
	return new QueryClient({
		defaultOptions: {
			queries: {
				staleTime: 1 * 60 * 1000, // 1 min - 데이터가 신선한 상태로 유지되는 시간, 이 기간 동안 refetch 발생 안함
				gcTime: 15 * 60 * 1000, // 15 mins - 사용하지 않는 쿼리가 캐시에 남아있는 시간
				retry: (failureCount, error) => {
					if (error instanceof AxiosError) {
						//NOTE - 401 (Unauthorized) 에러인 경우 한 번만 재시도 (토큰 갱신 등을 위한 기회)
						return error.response?.status == 401 && failureCount == 0;
					}
					return false;
				},
				refetchOnWindowFocus: false, // 윈도우 포커스시 자동 refetch 비활성화
				refetchOnMount: false, // 컴포넌트 마운트시 자동 refetch 비활성화
				throwOnError: false, // 에러 발생 시 throw하지 않고 컴포넌트에서 처리하도록 설정
			},
			mutations: {
				retry: (failureCount, error) => {
					if (error instanceof AxiosError) {
						//NOTE - 401 (Unauthorized)  에러인 경우 한 번만 재시도
						return error.response?.status == 401 && failureCount == 0;
					}
					return false;
				},
				throwOnError: false, // 에러 발생 시 throw하지 않고 내부적으로 처리
				onError: (error, variables) => {
					console.error("===========QueryClient Mutation Error===========");
					console.error(
						`Mutation 실행 중 오류 발생 [${new Date().toISOString()}]`,
					);
					if (error instanceof AxiosError) {
						console.error(`요청 URL: ${error.config?.url || "N/A"}`);
						console.error(`상태 코드: ${error.response?.status || "N/A"}`);
						console.error(`에러 메시지: ${error.message}`);
						// variables는 mutation에 전달된 데이터입니다 (민감 정보가 있을 수 있으므로 필요한 경우만 로깅)
						if (process.env.NODE_ENV !== "production") {
							console.error("Mutation 데이터:", variables);
						}
					} else {
						console.error("알 수 없는 에러:", error);
					}
					console.error("===========QueryClient Mutation Error===========");
				},
			},
		},
		queryCache: new QueryCache({
			onError: (error, query) => {
				console.error("===========QueryClient Cache Error===========");
				console.error(`Query 실행 중 오류 발생 [${new Date().toISOString()}]`);
				console.error(`Query 키: ${JSON.stringify(query.queryKey)}`);
				if (error instanceof AxiosError) {
					console.error(`요청 URL: ${error.config?.url || "N/A"}`);
					console.error(`상태 코드: ${error.response?.status || "N/A"}`);
					console.error(`에러 메시지: ${error.message}`);
				} else {
					console.error("알 수 없는 에러:", error);
				}
				console.error("===========QueryClient Cache Error===========");
			},
		}),
	});
}

// 중요! let 변수로 이 위치에서 선언하는 이유
// 브라우저 환경에서는 싱글톤 패턴으로 QueryClient 인스턴스를 관리하기 위함
// 모듈 레벨에서 변수를 선언하여 앱 생명주기 동안 하나의 인스턴스만 유지
// 이를 통해 전역 상태와 캐시를 일관되게 관리할 수 있습니다.
let browserQueryClient: QueryClient | undefined = undefined;

export function getQueryClient() {
	if (isServer) {
		// 서버 환경에서는 항상 새로운 QueryClient 인스턴스를 생성하는 이유
		// 1. 요청간 데이터 격리: 서버에서는 여러 사용자의 요청을 처리하므로 각 요청마다 독립적인 QueryClient 필요
		// 2. 메모리 누수 방지: 서버에서 QueryClient를 재사용하면 서로 다른 사용자 요청 간에 캐시가 공유되어 문제 발생
		// 3. 하이드레이션: SSR 이후 클라이언트에서 하이드레이션할 때 서버의 상태와 일치시키기 위함
		return makeQueryClient();
	} else {
		// 브라우저 환경에서는 싱글톤 패턴으로 QueryClient 인스턴스 재사용
		// 1. 전역 상태 일관성: 앱 전체에서 하나의 캐시 저장소 유지
		// 2. 메모리 효율성: 중복 인스턴스 생성 방지
		// 3. 컴포넌트 간 쿼리 결과 공유: 동일한 QueryClient 사용으로 캐싱 및 상태 공유 가능
		if (!browserQueryClient) browserQueryClient = makeQueryClient();
		return browserQueryClient;
	}
}
