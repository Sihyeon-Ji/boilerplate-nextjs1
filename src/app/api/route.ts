import { NextRequest, NextResponse } from "next/server";
import serverAPI from "@/lib/config/axiosServerInstance";
import { AxiosError } from "axios";

//ANCHOR - 공통 API 라우트 핸들러
// useApi custom hook -> axiosClientInstance에 의해 client 사이드에서 보내는 요청은
// 이 라우트를 통해 처리됩니다.

export async function GET(
	request: NextRequest,
	{ params }: { params: { path: string[] } },
) {
	const path = params.path.join("/");
	const searchParams = request.nextUrl.searchParams.toString();
	const queryString = searchParams ? `?${searchParams}` : "";

	try {
		const response = await serverAPI.get(`/${path}${queryString}`);
		return NextResponse.json(response.data);
	} catch (error) {
		console.error("===========공통 Route Handler level error===========");
		console.error(`GET /${path} 요청 오류:`, error);
		console.error("===========공통 Route Handler level error===========");

		if (error instanceof AxiosError && error.response) {
			return NextResponse.json(
				{ error: error.response.data?.message || "서버 오류" },
				{ status: error.response.status },
			);
		}
		return NextResponse.json(
			{ error: "서버 연결 오류가 발생했습니다." },
			{ status: 500 },
		);
	}
}

export async function POST(
	request: NextRequest,
	{ params }: { params: { path: string[] } },
) {
	const path = params.path.join("/");
	console.log("===========POST route===========");
	console.log("request : ", request);
	console.log("===========POST route===========");

	try {
		const body = await request.json();
		const response = await serverAPI.post(`/${path}`, body);
		return NextResponse.json(response.data);
	} catch (error) {
		console.error("===========공통 Route Handler level error===========");
		console.error(`POST /${path} 요청 오류:`, error);
		console.error("===========공통 Route Handler level error===========");

		if (error instanceof AxiosError && error.response) {
			return NextResponse.json(
				{ error: error.response.data?.message || "서버 오류" },
				{ status: error.response.status },
			);
		}
		return NextResponse.json(
			{ error: "서버 연결 오류가 발생했습니다." },
			{ status: 500 },
		);
	}
}

// PUT, PATCH, DELETE 등 다른 메서드도 유사하게 구현
