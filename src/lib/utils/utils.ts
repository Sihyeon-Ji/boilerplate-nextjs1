import { clsx, type ClassValue } from "clsx";
import { NextRequest } from "next/server";
import { twMerge } from "tailwind-merge";

//NOTE - tailwindcss & shadcn/ui 에서 사용하는 클래스 이름을 병합하는 헬퍼 함수
export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

//NOTE - 요청에서 인증 정보를 추출하는 헬퍼 함수
export function getAuthHeaders(request: NextRequest) {
	const authHeader = request.headers.get("authorization");
	return authHeader ? { Authorization: authHeader } : {};
}
