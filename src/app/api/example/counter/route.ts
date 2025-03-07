import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

//NOTE - POST /api/example/counter - redux asyncAdd 예시
export async function POST(request: NextRequest) {
	console.log(
		`POST /api/example/counter 가 어디서 실행되었을까요? : ${typeof window === "undefined" ? "서버" : "클라이언트"}`,
	);
	try {
		const body: { amount: number } = await request.json();
		const { amount = 1 } = body;

		//NOTE - 지연시간 시뮬레이팅...
		await new Promise((resolve) => setTimeout(resolve, 500));

		return NextResponse.json({ data: amount });
	} catch (error) {
		return NextResponse.json(
			{ error: "ADD 하다가 에러 발생함." },
			{ status: 500 },
		);
	}
}
