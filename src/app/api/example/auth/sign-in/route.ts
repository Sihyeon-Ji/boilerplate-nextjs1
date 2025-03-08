import { NextRequest, NextResponse } from "next/server";
import serverAPI from "@/lib/config/axiosServerInstance";
import { cookies } from "next/headers";
import { handleApiError } from "@/lib/utils/errorHandler";

//NOTE - POST /api/example/auth/sign-in - 로그인 예시 처리
export async function POST(request: NextRequest) {
	console.log(
		`POST /api/example/auth/sign-in 가 어디서 실행되었을까요? : ${typeof window === "undefined" ? "서버" : "클라이언트"}`,
	);
	try {
		const body = await request.json();
		const response = await serverAPI.post("/auth/login", body);

		// 토큰을 쿠키에 저장
		const cookieStore = await cookies();
		cookieStore.set("auth-token", response.data.token, {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			maxAge: 60 * 60 * 24 * 7, // 1주일
			path: "/",
		});

		// 민감한 정보를 제외한 사용자 정보만 반환
		const { password, ...userWithoutPassword } = response.data.user;

		return NextResponse.json({
			user: userWithoutPassword,
			message: "로그인 성공",
		});
	} catch (error) {
		return handleApiError(error, {
			errorMessage: "로그인 오류",
		});
	}
}
