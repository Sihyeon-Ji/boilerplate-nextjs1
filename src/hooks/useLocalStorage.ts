"use client";

import { encrypt, decrypt } from "@/lib/utils/utils";

/**
 * NOTE - 특정 로컬 스토리지 항목을 가져오는 함수
 * @param key 키 이름
 * @returns 복호화된 값 또는 undefined
 */
export function getLocalStorageItem(key: string): string | undefined {
	if (typeof window === "undefined") return undefined;

	const item = localStorage.getItem(key);
	if (!item) return undefined;

	try {
		return decrypt(item);
	} catch (error) {
		console.error(`로컬 스토리지 항목 "${key}" 복호화 중 오류:`, error);
		return undefined;
	}
}

/**
 * NOTE - 모든 로컬 스토리지 항목을 가져오는 함수
 * @returns 복호화된 모든 로컬 스토리지 객체 배열
 */
export function getLocalStorageAllItems(): { key: string; value: string }[] {
	if (typeof window === "undefined") return [];

	const items: { key: string; value: string }[] = [];

	// 제외할 키 목록 (라이브러리가 자동으로 생성한 항목들)
	const excludeKeys = [
		"persist:root",
		"next-auth",
		"next-router",
		"__paypal",
		"firebase:",
		"sentry-",
		"amplitude",
		"intercom",
		"hubspot",
		"_ga",
		"_gid",
		"_fbp",
		"__stripe",
		"react-scan-notifications-audio",
		"theme",
		"react-scan-tip-is-shown",
		"TanstackQueryDevtools.height",
		"react-scan-widget-settings-v2",
		"react-scan-options",
		"TanstackQueryDevtools.open",
	];

	for (let i = 0; i < localStorage.length; i++) {
		const key = localStorage.key(i);
		if (key) {
			// 제외 목록에 있는 키는 건너뛰기
			const shouldExclude = excludeKeys.some(
				(excludeKey) => key === excludeKey || key.startsWith(excludeKey),
			);

			if (shouldExclude) {
				continue;
			}
			const value = localStorage.getItem(key);
			if (value) {
				try {
					items.push({
						key,
						value: decrypt(value),
					});
				} catch (error) {
					// 복호화 오류가 발생한 항목은 '[암호화되지 않은 데이터]'로 표시
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
 * NOTE - 로컬 스토리지에 항목을 설정하는 함수
 * @param key 키 이름
 * @param value 저장할 값
 */
export function setLocalStorageItem(key: string, value: string): void {
	if (typeof window === "undefined") return;

	try {
		const encryptedValue = encrypt(value);
		localStorage.setItem(key, encryptedValue);
	} catch (error) {
		console.error(`로컬 스토리지 항목 "${key}" 암호화/저장 중 오류:`, error);
	}
}

/**
 * NOTE - 특정 로컬 스토리지 항목의 존재 여부를 확인하는 함수
 * @param key 확인할 키 이름
 * @returns 항목 존재 여부 (boolean)
 */
export function checkLocalStorageItem(key: string): boolean {
	if (typeof window === "undefined") return false;
	return localStorage.getItem(key) !== null;
}

/**
 * NOTE - 로컬 스토리지 항목을 삭제하는 함수
 * @param key 삭제할 키 이름
 */
export function deleteLocalStorageItem(key: string): void {
	if (typeof window === "undefined") return;
	localStorage.removeItem(key);
}
