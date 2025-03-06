"use client";

import axios, { AxiosError } from "axios";

//NOTE - 클라이언트 사이드에서 사용할 Axios 인스턴스
const clientAPI = axios.create({
	baseURL: "/api", // Next.js 서버의 API 라우트로 요청
	timeout: 10000,
	headers: {
		"Content-Type": "application/json",
	},
});

// axios 인터셉터
//TODO - 오류 처리 및 변환
clientAPI.interceptors.response.use(
	(response) => response,
	(error: AxiosError) => {
		console.log("===========axiosClientInstance level error===========");
		console.error("API 호출 중 오류 발생:", error);
		console.log("status : ", error.response?.status);
		console.log("message : ", error.message);
		console.log("===========axiosClientInstance level error===========");
		return Promise.reject(error);
	},
);

export default clientAPI;
