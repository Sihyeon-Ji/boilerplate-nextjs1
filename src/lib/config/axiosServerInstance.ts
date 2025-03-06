import axios, { AxiosError } from "axios";
//NOTE - 서버 환경에서만 next/headers를 로드하도록 조건부 import
const getServerHeaders = async () => {
	// 서버 환경에서만 실행
	if (typeof window === "undefined") {
		const { cookies } = await import("next/headers");
		return cookies();
	}
	return null;
};

//NOTE - 서버 사이드에서만 사용되는 Axios 인스턴스
const serverAPI = axios.create({
	// baseURL: process.env.GATEWAY_URL || "http://localhost:8080/api",
	baseURL: process.env.API_BASE_URL || "",
	timeout: 2 * 60 * 1000, // 2분
	headers: {
		"Content-Type": "application/json",
	},
});

// axios 인터셉터
// 모든 API 요청에 인증 토큰을 함께 전달하기, 요청 인터셉터로 쿠키의 토큰을 헤더에 추가
serverAPI.interceptors.request.use(async (config) => {
	const cookieStore = await getServerHeaders();
	if (cookieStore) {
		const token = cookieStore.get("auth-token");
		if (token) {
			config.headers["Authorization"] = `Bearer ${token.value}`;
		}
	}

	return config;
});

//TODO - 네트워크 레벨 에러 처리 (타임아웃, 연결 문제 등)
//TODO - 토큰 갱신과 같은 API 인프라 관련 로직
serverAPI.interceptors.response.use(
	(response) => response,
	(error: AxiosError) => {
		// 오류 처리 및 변환
		console.log("===========axiosServerInstance level error===========");
		console.log("status : ", error.response?.status);
		console.log("message : ", error.message);
		console.log("===========axiosServerInstance level error===========");
		return Promise.reject(error);
	},
);

export default serverAPI;
