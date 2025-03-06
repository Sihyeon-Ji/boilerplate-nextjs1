import { QueryCache, QueryClient, isServer } from "@tanstack/react-query";
import { AxiosError } from "axios";

// QueryClient:
// 비즈니스 로직 에러 처리
// UI에 표시할 에러 메시지 가공
// 캐시/상태 관리 관련 처리

// NOTE - QueryClient 설정
// 앱 전반에서 QueryClient를 직접 사용하지 않고 이 함수를 통해 생성하는 것을 권장함
function makeQueryClient() {
	return new QueryClient({
		defaultOptions: {
			queries: {
				staleTime: 1 * 60 * 1000, // 1 min
				gcTime: 15 * 60 * 1000, // 15 mins
				retry: (failureCount, error) => {
					if (error instanceof AxiosError) {
						//NOTE - 401 (Unauthorized)
						return error.response?.status == 401 && failureCount == 0;
					}
					return false;
				},
				refetchOnWindowFocus: false,
				refetchOnMount: false,
				throwOnError: false,
			},
			mutations: {
				retry: (failureCount, error) => {
					if (error instanceof AxiosError) {
						//NOTE - 401 (Unauthorized)
						return error.response?.status == 401 && failureCount == 0;
					}
					return false;
				},
				throwOnError: false,
				onError: (error) => {
					if (error instanceof AxiosError) {
						console.log("===========queryClient level error===========");
						console.log("error : ", error);
						console.log("===========queryClient level error===========");
					}
				},
			},
		},
		queryCache: new QueryCache({
			onError: (error) => {
				if (error instanceof AxiosError) {
					console.log("===========queryClient level error===========");
					console.log("error : ", error);
					console.log("===========queryClient level error===========");
				}
			},
		}),
	});
}

// 중요! 지역변수로 선언하는 이유
let browserQueryClient: QueryClient | undefined = undefined;

export function getQueryClient() {
	if (isServer) {
		return makeQueryClient();
	} else {
		if (!browserQueryClient) browserQueryClient = makeQueryClient();
		return browserQueryClient;
	}
}
