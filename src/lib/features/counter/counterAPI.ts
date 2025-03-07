// NOTE - 데이터를 비동기적으로 요청하는 것을 시뮬레이션하는 함수입니다

import clientAPI from "@/lib/config/axiosClientInstance";

// 실제 백엔드 API를 호출하는 것과 같은 패턴으로 구현되었습니다
export const fetchCount = async (amount = 1) => {
	//NOTE - 기본 fetch 호출 방식
	// 이 방식은 서버 주소를 직접 입력해야 하고 -> ENV 변수로 설정하는 것이 좋겠지요
	// 포트 번호도 입력해야 함
	// const response = await fetch("http://localhost:4010/api/counter", {
	// 	// port 주의
	// 	method: "POST",
	// 	headers: { "Content-Type": "application/json" },
	// 	body: JSON.stringify({ amount }),
	// });
	// const result: { data: number } = await response.json();
	// return result;

	//NOTE - client side axios 호출 방식
	// client side axios instance의 baseURL은 "/api"이기 때문에
	// 아래처럼 호출 시 /api/example/counter가 되고 => 이는 /app/api/example/counter/route.ts 라우트 핸들러로 전송됨
	//LINK - ../../../app/api/example/counter/route.ts:9
	const response = await clientAPI.post("/example/counter", { amount });
	return response.data;
};

// NOTE - counter 과정 설명
// 컴포넌트/Redux 액션 → fetchCount 호출 → API 라우트(route.ts)로 요청 전송 →
// API 라우트에서 요청 처리 → 응답 반환 → fetchCount가 응답 받음 → 결과 반환
