import { NextRequest, NextResponse } from "next/server";
import { deleteUser, getUserById } from "../data";

// GET /api/users/:id - 특정 사용자 상세 정보 조회
export async function GET(
	request: NextRequest,
	{ params }: { params: { id: string } },
) {
	console.log(
		`GET /api/users/:id 가 어디서 실행되었을까요? : ${typeof window === "undefined" ? "서버" : "클라이언트"}`,
	);
	try {
		const id = parseInt(params.id);

		// ID로 사용자 찾기
		const user = getUserById(id);

		if (!user) {
			return NextResponse.json(
				{ error: "사용자를 찾을 수 없습니다." },
				{ status: 404 },
			);
		}

		return NextResponse.json(user);
	} catch (error) {
		return NextResponse.json(
			{ error: "사용자 조회 중 오류가 발생했습니다." },
			{ status: 500 },
		);
	}
}

// DELETE /api/users/:id - 특정 사용자 삭제
export async function DELETE(
	request: NextRequest,
	{ params }: { params: { id: string } },
) {
	console.log(
		`DELETE /api/users/:id 가 어디서 실행되었을까요? : ${typeof window === "undefined" ? "서버" : "클라이언트"}`,
	);
	try {
		const id = parseInt(params.id);
		const deletedUser = deleteUser(id);

		if (!deletedUser) {
			return NextResponse.json(
				{ error: "사용자를 찾을 수 없습니다." },
				{ status: 404 },
			);
		}

		return NextResponse.json({ message: "사용자가 삭제되었습니다." });
	} catch (error) {
		return NextResponse.json(
			{ error: "사용자 삭제 중 오류가 발생했습니다." },
			{ status: 500 },
		);
	}
}
