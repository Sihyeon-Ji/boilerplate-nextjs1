// React 환경에서 사용하기 위해 React 전용 진입점에서 createApi를 가져옵니다
// RTK Query는 Redux Toolkit의 확장 기능으로, 데이터 가져오기 및 캐싱을 효율적으로 관리합니다
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// 단일 인용구(Quote) 항목의 데이터 구조를 정의
interface Quote {
	id: number; // 인용구의 고유 식별자
	quote: string; // 인용구 내용
	author: string; // 인용구의 저자
}

// API 응답의 전체 구조를 정의합니다
// 인용구 배열과 페이지네이션 관련 정보를 포함합니다
interface QuotesApiResponse {
	quotes: Quote[]; // 인용구 배열
	total: number; // 총 인용구 수
	skip: number; // 건너뛴 인용구 수 (페이지네이션용)
	limit: number; // 한 번에 가져온 인용구 수 (페이지네이션용)
}

// baseURL과 예상되는 엔드포인트를 사용하여 API 서비스를 정의합니다
export const quotesApiSlice = createApi({
	// baseURL과 예상되는 엔드포인트를 사용하여 API 서비스를 정의합니다
	// baseQuery: fetchBaseQuery({ baseUrl: "https://dummyjson.com/quotes" }), // client side에서 직접 호출해버리는 예시
	// 아래는 Nextjs 서버를 이용한 프록시 아키텍처 예시
	// 이는 app/api/quotes/route.ts 라우트 핸들러로 전송됨
	//LINK - ../../../app/api/quotes/route.ts:3
	baseQuery: fetchBaseQuery({ baseUrl: "/api/quotes" }),
	// 리듀서 경로 - 이 API의 리듀서가 Redux 스토어에 저장될 위치를 지정합니다
	// 고유 이름이어야 하며, 다른 API 서비스와 충돌하지 않아야 합니다
	reducerPath: "quotesApi",
	// 태그 타입 - 캐싱 및 무효화에 사용됩니다
	// 이 태그들을 통해 관련 쿼리들의 캐시를 효율적으로 관리할 수 있습니다
	tagTypes: ["Quotes"],
	// 엔드포인트 정의 - 실제 API 요청 방법을 정의합니다
	endpoints: (build) => ({
		// 제네릭을 사용하여 반환 타입(QuotesApiResponse)과
		// 예상되는 쿼리 인자(number)를 지정합니다
		// 인자가 없는 경우 void 타입을 대신 사용합니다
		getQuotes: build.query<QuotesApiResponse, number>({
			// 쿼리 함수 - 인자를 받아 API 요청 경로를 생성합니다
			query: (limit = 10) => `?limit=${limit}`,
			// providesTags는 쿼리에서 반환된 캐시된 데이터에
			// 어떤 '태그'가 연결되는지 결정합니다
			// 이 태그를 사용하여 다른 액션 후에 캐시를 무효화할 수 있습니다
			// (예: 새 인용구를 추가한 후 목록 새로고침)
			providesTags: (result, error, id) => [{ type: "Quotes", id }],
		}),
	}),
});

// 훅은 RTK-Query에 의해 자동 생성됩니다
// 컴포넌트에서 이 훅을 사용하여 데이터를 가져오고 캐싱, 로딩 상태 등을 관리할 수 있습니다
export const { useGetQuotesQuery } = quotesApiSlice;
