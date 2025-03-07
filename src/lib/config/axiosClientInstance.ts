"use client";

import axios from "axios";

//NOTE - 클라이언트 사이드에서 Next.js 서버의 API 라우트로 요청하기 위한 Axios 인스턴스
const clientAPI = axios.create({
	baseURL: "/api", // Next.js 서버의 API 라우트로 요청
	timeout: 10000,
	headers: {
		"Content-Type": "application/json",
	},
});

// axios 인터셉터
// 브라우저 쿠키는 자동으로 Next.js API 요청에 포함됨
// clientAPI.interceptors.request.use((config) => {
// 	return config;
// });

//TODO
// 1. 네트워크 연결 실패 (인터넷 연결 문제, 서버 다운 등)
// 2. HTTP 상태 코드 기반 오류 처리
// 3. 예상치 못한 응답 형식 처리
// 4. 보안 관련 오류 처리
clientAPI.interceptors.response.use(
	(response) => response,
	(error) => {
		console.error("===========axiosClientInstance level error===========");
		console.error("client에서 Next.js 서버의 API 라우트로 요청 중 오류 발생");
		console.error(error);
		console.error("===========axiosClientInstance level error===========");
		return Promise.reject(error);
	},
);

export default clientAPI;
