import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
	// URL 검색 파라미터 가져오기
	const { searchParams } = new URL(request.url);
	const limit = searchParams.get("limit") || "10";

	const response = await fetch(`https://dummyjson.com/quotes?limit=${limit}`);

	const data = await response.json();

	return NextResponse.json(data);
}
