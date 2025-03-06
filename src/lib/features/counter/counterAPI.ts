// NOTE - 데이터를 비동기적으로 요청하는 것을 시뮬레이션하는 함수입니다

import { useApiPost } from "@/hooks/useApi";

// 실제 백엔드 API를 호출하는 것과 같은 패턴으로 구현되었습니다
export const fetchCount = async (amount = 1) => {
	const response = await fetch("http://localhost:4010/api/counter", {
		// port 주의
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ amount }),
	});
	const result: { data: number } = await response.json();

	return result;
};

// NOTE - counter 과정 설명
// 컴포넌트/Redux 액션 → fetchCount 호출 → API 라우트(route.ts)로 요청 전송 →
// API 라우트에서 요청 처리 → 응답 반환 → fetchCount가 응답 받음 → 결과 반환
