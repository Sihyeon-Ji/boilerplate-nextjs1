import { NextRequest, NextResponse } from "next/server";
import serverAPI from "@/lib/config/axiosServerInstance";
import { AxiosError } from "axios";

//ANCHOR - BaseUrl API 라우트 핸들러
// client에서 BaseUrl로 요청하면 이 라우트 핸들러로 전송됩니다.

//NOTE - GET /api - BaseUrl 테스트
export async function GET(
	request: NextRequest,
	{ params }: { params: Promise<{ [key: string]: unknown }> },
) {
	console.log("GET /api");
	console.log("request : ", request);
	console.log("params : ", await params);
	console.log("GET /api");

	try {
		// const response = await serverAPI.get<unknown>(`/health-check`);
		return NextResponse.json("GET /api 임시응답 값");
	} catch (error) {
		if (error instanceof AxiosError) {
			return NextResponse.json(
				{ error: error.message || "서버 오류" },
				{ status: error.response?.status },
			);
		} else {
			return NextResponse.json(
				{ error: "서버 연결 오류가 발생했습니다." },
				{ status: 500 },
			);
		}
	}
}

//NOTE - POST /api - BaseUrl 테스트
export async function POST(request: NextRequest) {
	console.log("POST /api");
	console.log("request : ", request);
	console.log("body : ", await request.json());
	console.log("POST /api");

	try {
		// const response = await serverAPI.post<unknown>(`/post-test`);
		return NextResponse.json("POST /api 임시응답 값");
	} catch (error) {
		if (error instanceof AxiosError) {
			return NextResponse.json(
				{ error: error.message || "서버 오류" },
				{ status: error.response?.status },
			);
		} else {
			return NextResponse.json(
				{ error: "서버 연결 오류가 발생했습니다." },
				{ status: 500 },
			);
		}
	}
}

// PUT, PATCH, DELETE 등 다른 메서드도 유사하게 구현
