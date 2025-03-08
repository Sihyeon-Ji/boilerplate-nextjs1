import { handleApiError } from "@/lib/utils/errorHandler";
import { NextRequest, NextResponse } from "next/server";

//NOTE - GET /api/example/quotes - redux rtk query 인용구 조회 예시
export async function GET(request: NextRequest) {
	console.log(
		`GET /api/example/quotes 가 어디서 실행되었을까요? : ${typeof window === "undefined" ? "서버" : "클라이언트"}`,
	);
	try {
		// URL 검색 파라미터 가져오기
		const { searchParams } = new URL(request.url);
		const limit = searchParams.get("limit") || "10";

		// NOTE - fetch
		const response = await fetch(`https://dummyjson.com/quotes?limit=${limit}`);
		const data = await response.json();

		// NOTE - axios 사용
		// const response = await serverAPI.get(
		// 	`https://dummyjson.com/quotes?limit=${limit}`,
		// );
		// const data = response.data;

		return NextResponse.json(data);
	} catch (error) {
		return handleApiError(error, {
			errorMessage: "데이터 조회 중 오류가 발생했습니다.",
		});
	}
}
