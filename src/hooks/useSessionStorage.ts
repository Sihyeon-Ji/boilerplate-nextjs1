"use client";

import { encrypt, decrypt } from "@/lib/utils/utils";

/**
 * NOTE - 특정 세션 스토리지 항목을 가져오는 함수
 * @param key 키 이름
 * @returns 복호화된 값 또는 undefined
 */
export function getSessionStorageItem(key: string): string | undefined {
	if (typeof window === "undefined") return undefined;

	const item = sessionStorage.getItem(key);
	if (!item) return undefined;

	try {
		return decrypt(item);
	} catch (error) {
		console.error(`세션 스토리지 항목 "${key}" 복호화 중 오류:`, error);
		return undefined;
	}
}

/**
 * NOTE - 모든 세션 스토리지 항목을 가져오는 함수
 * @returns 복호화된 모든 세션 스토리지 객체 배열
 */
export function getSessionStorageAllItems(): { key: string; value: string }[] {
	if (typeof window === "undefined") return [];

	const items: { key: string; value: string }[] = [];

	// 제외할 키 목록
	const excludeKeys = [
		"persist:root",
		"next-",
		"__paypal",
		"firebase:",
		"amplitude",
	];

	for (let i = 0; i < sessionStorage.length; i++) {
		const key = sessionStorage.key(i);
		if (key) {
			// 제외 목록에 있는 키는 건너뛰기
			const shouldExclude = excludeKeys.some(
				(excludeKey) => key === excludeKey || key.startsWith(excludeKey),
			);

			if (shouldExclude) {
				continue;
			}

			const value = sessionStorage.getItem(key);
			if (value) {
				try {
					items.push({
						key,
						value: decrypt(value),
					});
				} catch (error) {
					items.push({
						key,
						value: "[암호화되지 않은 데이터]",
					});
				}
			}
		}
	}

	return items;
}

/**
 * NOTE - 세션 스토리지에 항목을 설정하는 함수
 * @param key 키 이름
 * @param value 저장할 값
 */
export function setSessionStorageItem(key: string, value: string): void {
	if (typeof window === "undefined") return;

	try {
		const encryptedValue = encrypt(value);
		sessionStorage.setItem(key, encryptedValue);
	} catch (error) {
		console.error(`세션 스토리지 항목 "${key}" 암호화/저장 중 오류:`, error);
	}
}

/**
 * NOTE - 특정 세션 스토리지 항목의 존재 여부를 확인하는 함수
 * @param key 확인할 키 이름
 * @returns 항목 존재 여부 (boolean)
 */
export function checkSessionStorageItem(key: string): boolean {
	if (typeof window === "undefined") return false;
	return sessionStorage.getItem(key) !== null;
}

/**
 * NOTE - 세션 스토리지 항목을 삭제하는 함수
 * @param key 삭제할 키 이름
 */
export function deleteSessionStorageItem(key: string): void {
	if (typeof window === "undefined") return;
	sessionStorage.removeItem(key);
}
