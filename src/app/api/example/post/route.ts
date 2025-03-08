import serverAPI from "@/lib/config/axiosServerInstance";
import { handleApiError } from "@/lib/utils/errorHandler";
import { NextResponse } from "next/server";

//NOTE - GET /api/example/post - post 조회 예시
export async function GET() {
	console.log(
		`GET /api/example/post 가 어디서 실행되었을까요? : ${typeof window === "undefined" ? "서버" : "클라이언트"}`,
	);
	try {
		// NOTE - fetch
		// const response = await fetch("https://jsonplaceholder.typicode.com/posts");
		// const data = await response.json();

		// NOTE - axios 사용
		const response = await serverAPI.get(
			"https://jsonplaceholder.typicode.com/posts",
		);
		const data = response.data;

		return NextResponse.json(data);
	} catch (error) {
		return handleApiError(error, {
			errorMessage: "데이터 조회 중 오류가 발생했습니다.",
		});
	}
}
