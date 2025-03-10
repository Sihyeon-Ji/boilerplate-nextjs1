import { clsx, type ClassValue } from "clsx";
import { NextRequest } from "next/server";
import { twMerge } from "tailwind-merge";
import CryptoJS from "crypto-js";

//NOTE - tailwindcss & shadcn/ui 에서 사용하는 클래스 이름을 병합하는 헬퍼 함수
export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

//NOTE - 요청에서 인증 정보를 추출하는 헬퍼 함수
export function getAuthHeaders(request: NextRequest) {
	const authHeader = request.headers.get("authorization");
	return authHeader ? { Authorization: authHeader } : {};
}

/**
 * NOTE - 데이터를 암호화하는 함수
 * @param value 암호화할 값
 * @returns 암호화된 문자열
 */
export const encrypt = (value: string): string => {
	if (!value) return "";
	const encrypted = CryptoJS.AES.encrypt(
		value,
		process.env.NEXT_PUBLIC_CRYPTO_KEY || "",
	).toString();
	// Base64를 Base64url로 변환 (특수문자 제거)
	return encrypted.replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
};

/**
 * NOTE - 암호화된 데이터를 복호화하는 함수
 * @param encrypted 복호화할 암호화된 문자열
 * @returns 원본 문자열
 */
export const decrypt = (encrypted: string): string => {
	if (!encrypted) return "";
	try {
		// Base64url을 표준 Base64로 복원
		let base64 = encrypted.replace(/-/g, "+").replace(/_/g, "/");
		// 패딩 추가
		const pad = base64.length % 4;
		if (pad) {
			base64 += "=".repeat(4 - pad);
		}
		const bytes = CryptoJS.AES.decrypt(
			base64,
			process.env.NEXT_PUBLIC_CRYPTO_KEY || "",
		);
		return bytes.toString(CryptoJS.enc.Utf8);
	} catch (error) {
		console.error("복호화 중 오류 발생:", error);
		return "";
	}
};
