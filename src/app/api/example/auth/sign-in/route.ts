import { NextRequest, NextResponse } from "next/server";
import serverAPI from "@/lib/config/axiosServerInstance";
import { cookies } from "next/headers";
import { AxiosError } from "axios";

export async function POST(request: NextRequest) {
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
		console.error("===========인증 Route Handler level error===========");
		console.error("로그인 오류:", error);
		console.error("===========인증 Route Handler level error===========");

		if (error instanceof AxiosError && error.response) {
			return NextResponse.json(
				{ error: error.response.data?.message || "인증 실패" },
				{ status: error.response.status },
			);
		}
		return NextResponse.json(
			{ error: "서버 연결 오류가 발생했습니다." },
			{ status: 500 },
		);
	}
}
