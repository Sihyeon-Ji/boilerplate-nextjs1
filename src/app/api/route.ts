import { NextRequest, NextResponse } from "next/server";
import { handleApiError } from "@/lib/utils/errorHandler";

//ANCHOR - BaseUrl API 라우트 핸들러
// client에서 BaseUrl로 요청하면 이 라우트 핸들러로 전송됩니다.

//NOTE - GET /api - BaseUrl 테스트
export async function GET(
	request: NextRequest,
	{ params }: { params: Promise<{ [key: string]: unknown }> },
) {
	console.log(
		`GET /api 가 어디서 실행되었을까요? : ${typeof window === "undefined" ? "서버" : "클라이언트"}`,
	);
	console.log("request : ", request);
	console.log("params : ", await params);

	try {
		// const response = await serverAPI.get<unknown>(`/health-check`);
		return NextResponse.json("GET /api 임시응답 값");
	} catch (error) {
		return handleApiError(error);
	}
}

//NOTE - POST /api - BaseUrl 테스트
export async function POST(request: NextRequest) {
	console.log(
		`POST /api 가 어디서 실행되었을까요? : ${typeof window === "undefined" ? "서버" : "클라이언트"}`,
	);
	console.log("request : ", request);
	console.log("body : ", await request.json());

	try {
		// const response = await serverAPI.post<unknown>(`/post-test`);
		return NextResponse.json("POST /api 임시응답 값");
	} catch (error) {
		return handleApiError(error);
	}
}

// PUT, PATCH, DELETE 등 다른 메서드도 유사하게 구현
