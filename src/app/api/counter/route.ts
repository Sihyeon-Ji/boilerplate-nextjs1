import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

// interface Context {
//   params: undefined;
// }

// export async function POST(request: NextRequest, context: Context) {
export async function POST(request: NextRequest) {
	const body: { amount: number } = await request.json();
	const { amount = 1 } = body;

	//NOTE - 지연시간 시뮬레이팅...
	await new Promise((resolve) => setTimeout(resolve, 500));

	return NextResponse.json({ data: amount });
}
