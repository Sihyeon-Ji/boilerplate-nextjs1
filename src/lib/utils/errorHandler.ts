import { AxiosError } from "axios";
import { NextResponse } from "next/server";

interface ErrorHandlerOptions {
	errorMessage?: string;
	statusCode?: number;
}

export function handleApiError(
	error: unknown,
	options: ErrorHandlerOptions = {},
) {
	const { errorMessage = "서버 연결 오류가 발생했습니다.", statusCode = 500 } =
		options;

	if (error instanceof AxiosError) {
		return NextResponse.json(
			{ error: error.message || errorMessage },
			{ status: error.response?.status },
		);
	} else {
		return NextResponse.json({ error: errorMessage }, { status: statusCode });
	}
}
