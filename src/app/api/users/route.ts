import { NextResponse } from "next/server";
import { User, createUser, getUsers } from "./data";

// GET /api/users - 모든 사용자 목록 조회
export async function GET() {
	console.log(
		`GET /api/users 가 어디서 실행되었을까요? : ${typeof window === "undefined" ? "서버" : "클라이언트"}`,
	);
	const users = getUsers();
	return NextResponse.json(users);
}

// POST /api/users - 새 사용자 생성
export async function POST(request: Request) {
	console.log(
		`POST /api/users 가 어디서 실행되었을까요? : ${typeof window === "undefined" ? "서버" : "클라이언트"}`,
	);
	try {
		const userData = await request.json();

		// 필수 필드 검증
		if (!userData.name || !userData.email) {
			return NextResponse.json(
				{ error: "이름과 이메일은 필수 항목입니다." },
				{ status: 400 },
			);
		}
		const newUser = createUser(userData);
		return NextResponse.json(newUser, { status: 201 });
	} catch (error) {
		return NextResponse.json(
			{ error: "사용자 생성 중 오류가 발생했습니다." },
			{ status: 500 },
		);
	}
}
