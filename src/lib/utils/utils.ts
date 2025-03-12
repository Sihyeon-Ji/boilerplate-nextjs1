import { clsx, type ClassValue } from "clsx";
import { NextRequest } from "next/server";
import { twMerge } from "tailwind-merge";
// crypto-js 개별 모듈 직접 import
import AES from "crypto-js/aes";
import Utf8 from "crypto-js/enc-utf8";

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

	// 암호화 키 확인
	const cryptoKey = process.env.NEXT_PUBLIC_CRYPTO_KEY;
	if (!cryptoKey) {
		console.error(
			"암호화 키가 설정되지 않았습니다. NEXT_PUBLIC_CRYPTO_KEY 환경변수를 확인하세요.",
		);
		return value; // 키 없을 때는 원본 반환
	}

	try {
		// 직접 AES 모듈 사용
		const encrypted = AES.encrypt(value, cryptoKey).toString();
		// Base64를 Base64url로 변환 (특수문자 제거)
		return encrypted.replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
	} catch (error) {
		console.error("암호화 중 오류 발생:", error);
		return value; // 암호화 실패 시 원본 반환
	}
};

/**
 * NOTE - 암호화된 데이터를 복호화하는 함수
 * @param encrypted 복호화할 암호화된 문자열
 * @returns 원본 문자열
 */
export const decrypt = (encrypted: string): string => {
	if (!encrypted) return "";

	// 암호화 키 확인
	const cryptoKey = process.env.NEXT_PUBLIC_CRYPTO_KEY;
	if (!cryptoKey) {
		console.error(
			"암호화 키가 설정되지 않았습니다. NEXT_PUBLIC_CRYPTO_KEY 환경변수를 확인하세요.",
		);
		return encrypted; // 키 없을 때는 원본 반환
	}

	try {
		// Base64url을 표준 Base64로 복원
		let base64 = encrypted.replace(/-/g, "+").replace(/_/g, "/");
		// 패딩 추가
		const pad = base64.length % 4;
		if (pad) {
			base64 += "=".repeat(4 - pad);
		}
		// 직접 AES 모듈 사용
		const bytes = AES.decrypt(base64, cryptoKey);
		return bytes.toString(Utf8);
	} catch (error) {
		console.error("복호화 중 오류 발생:", error);
		return encrypted; // 복호화 실패 시 원본 반환
	}
};

/**
 * NOTE - 지정된 시간(ms) 동안 지연시키는 프로미스를 반환합니다.
 * @param ms 지연시킬 시간(ms)
 * @returns 지연시킨 프로미스
 */
export function delay(ms: number): Promise<void> {
	return new Promise((resolve) => setTimeout(resolve, ms));
}
