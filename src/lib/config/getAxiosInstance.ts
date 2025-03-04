import axios, { AxiosError, AxiosResponse } from "axios";

export const axiosInstance = axios.create({
	timeout: 2 * 60 * 1000, // 2분
	withCredentials: true,
});

// axios 인터셉터:
// 네트워크 레벨 에러 처리 (타임아웃, 연결 문제 등)
// 토큰 갱신과 같은 API 인프라 관련 로직

axiosInstance.interceptors.response.use(
	(res: AxiosResponse<unknown>) => {
		return res;
	},
	async (err: AxiosError) => {
		console.log("===========axiosInstance level error===========");
		console.log("status : ", err.response?.status);
		console.log("message : ", err.message);
		console.log("===========axiosInstance level error===========");
		return Promise.reject(err);
	},
);

// axiosInstance.defaults.baseURL = process.env.GATEWAY_URL ?? "/";
