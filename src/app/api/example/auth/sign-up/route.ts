import { handleApiError } from "@/lib/utils/errorHandler";
import { NextRequest, NextResponse } from "next/server";

//NOTE - POST /api/example/auth/sign-up - 회원가입 예시 처리
export async function POST(request: NextRequest) {
	console.log(
		`POST /api/example/auth/sign-up 이 어디서 실행되었을까요? : ${typeof window === "undefined" ? "서버" : "클라이언트"}`,
	);
	try {
		const body = await request.json();
		console.log(body);
		return NextResponse.json({ message: "회원가입 성공" }, { status: 201 });
	} catch (error) {
		return handleApiError(error, {
			errorMessage: "회원가입 오류",
		});
	}
}
