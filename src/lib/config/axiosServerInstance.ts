import axios, { AxiosError } from "axios";

//NOTE - Next.js 서버에서 외부 백엔드 서비스로 요청하기 위한 Axios 인스턴스
const serverAPI = axios.create({
	baseURL: process.env.GATEWAY_URL || "",
	timeout: 2 * 60 * 1000, // 2분
	headers: {
		"Content-Type": "application/json",
	},
});

// axios 인터셉터
// 모든 API 요청에 인증 토큰을 함께 전달하기, 요청 인터셉터로 쿠키의 토큰을 헤더에 추가
serverAPI.interceptors.request.use(async (config) => {
	if (typeof window === "undefined") {
		const { cookies } = await import("next/headers");
		const cookieStore = await cookies();
		const token = cookieStore.get("auth-token");
		if (token) {
			config.headers["Authorization"] = `Bearer ${token.value}`;
		}
	}
	return config;
});

//TODO
// 1. 네트워크 레벨 에러 처리 (타임아웃, 연결 문제 등)
// 2. 토큰 갱신과 같은 API 인프라 관련 로직
serverAPI.interceptors.response.use(
	(response) => response,
	(error) => {
		// 오류 처리 및 변환
		console.error("===========axiosServerInstance level error===========");
		console.error("Next.js 서버에서 외부 백엔드로 요청 중 오류 발생");
		if (error instanceof AxiosError) {
			console.error(`http method: ${error.config?.method || "N/A"}`);
			console.error(`요청 URL: ${error.config?.url || "N/A"}`);
			console.error(`상태 코드: ${error.response?.status || "N/A"}`);
			console.error(`에러 메시지: ${error.message}`);
		} else {
			console.error("알 수 없는 에러:", error);
		}
		console.error("===========axiosServerInstance level error===========");
		return Promise.reject(error);
	},
);

export default serverAPI;
