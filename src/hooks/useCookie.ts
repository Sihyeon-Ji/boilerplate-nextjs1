import { encrypt, decrypt } from "@/lib/utils/utils";

//NOTE - 서버 컴포넌트에서만 cookie를 handling하는 것이 맞지만, 아래처럼 client 측도 고려하는 이유..
// prefetch를 하는 경우 client component에서 serverAPI의 요청 함수를 직접 import 해야 하는데
// "next/headers" 라이브러리는 server 컴포넌트에서만 import 가능하므로 에러가 발생하게 됩니다.
// 따라서 아래처럼 서버일 때만 "next/headers"를 import하는 처리를 해주어야 합니다.
// 이 동적 import 처리를 하는 김에 아싸리 클라이언트에서 어쩔 수 없이 쿠키를 다루어야 하는 경우
// document.cookie = "..." 를 사용하게 될텐데, 아래처럼 그 상황도 대비를 하여
// useCookie 훅 하나만으로 서버/클라이언트 모두 대응하는 것으로 하였습니다.

// 서버 측일 때, cookies API를 동적으로 import하는 함수
async function getServerCookieStore() {
	// 서버일 때만 import 실행
	if (typeof window === "undefined") {
		const { cookies } = await import("next/headers");
		return cookies();
	}
	return null;
}

/**
 * NOTE - 특정 쿠키를 가져오는 함수
 * @param name 쿠키 이름
 * @returns 복호화된 쿠키 값 또는 undefined
 */
export async function getCookie(name: string): Promise<string | undefined> {
	// 클라이언트 측
	if (typeof window !== "undefined") {
		const cookieValue = document.cookie
			.split("; ")
			.find((row) => row.startsWith(`${name}=`))
			?.split("=")[1];

		if (!cookieValue) return undefined;
		return decrypt(cookieValue);
	}
	// 서버 측
	const cookieStore = await getServerCookieStore();
	const cookie = cookieStore?.get(name);

	if (!cookie) return undefined;
	return decrypt(cookie.value);
}

/**
 * NOTE - 모든 쿠키를 가져오는 함수
 * @returns 복호화된 모든 쿠키 객체 배열
 */
export async function getAllCookies() {
	// 제외할 쿠키 이름 목록
	const excludeCookies = [
		"_ga",
		"_gid",
		"_gat",
		"_fbp",
		"_uetsid",
		"_uetvid",
		"XSRF-TOKEN",
		"csrf-token",
		"connect.sid",
		"session",
		"next-auth.session-token",
		"next-auth.callback-url",
		"next-auth.csrf-token",
		"__next_hmr_refresh_hash__",
		"__next_hmr_refresh_hash__",
		"_hackle_hid",
		"_hackle_did_",
		"_hackle_mkt_",
		"_hackle_session_id_",
		"_hackle_last_event_ts_",
	];

	// 클라이언트 측
	if (typeof window !== "undefined") {
		const allCookies: { name: string; value: string }[] = [];

		if (document.cookie) {
			document.cookie.split("; ").forEach((cookie) => {
				const [name, value] = cookie.split("=");

				// 제외 목록에 있는 쿠키는 건너뛰기
				const shouldExclude = excludeCookies.some(
					(excludeName) => name === excludeName || name.startsWith(excludeName),
				);

				if (name && value && !shouldExclude) {
					try {
						allCookies.push({
							name,
							value: decrypt(value),
						});
					} catch (error) {
						// 복호화 오류가 발생한 쿠키는 '[암호화되지 않은 데이터]'로 표시
						allCookies.push({
							name,
							value: "[암호화되지 않은 데이터]",
						});
					}
				}
			});
		}

		return allCookies;
	}

	// 서버 측
	const cookieStore = await getServerCookieStore();
	if (!cookieStore) return [];

	const allCookies = cookieStore
		.getAll()
		.filter(
			(cookie) =>
				!excludeCookies.some(
					(excludeName) =>
						cookie.name === excludeName || cookie.name.startsWith(excludeName),
				),
		);

	return allCookies.map((cookie) => {
		try {
			return {
				name: cookie.name,
				value: decrypt(cookie.value),
			};
		} catch (error) {
			return {
				name: cookie.name,
				value: "[암호화되지 않은 데이터]",
			};
		}
	});
}

/**
 * NOTE - 특정 쿠키의 존재 여부를 확인하는 함수
 * @param name 확인할 쿠키 이름
 * @returns 쿠키 존재 여부 (boolean)
 */
export async function checkCookie(name: string): Promise<boolean> {
	// 클라이언트 측
	if (typeof window !== "undefined") {
		return document.cookie
			.split("; ")
			.some((cookie) => cookie.startsWith(`${name}=`));
	}
	// 서버 측
	const cookieStore = await getServerCookieStore();
	return cookieStore ? cookieStore.has(name) : false;
}

/**
 * NOTE - 쿠키를 설정하는 함수
 * @param name 쿠키 이름
 * @param value 쿠키 값 (암호화됨)
 * @param options 쿠키 옵션
 */
export async function setCookie(
	name: string,
	value: string,
	options?: {
		expires?: Date;
		maxAge?: number;
		domain?: string;
		path?: string;
		secure?: boolean;
		httpOnly?: boolean;
		sameSite?: boolean | "lax" | "strict" | "none";
		priority?: "low" | "medium" | "high";
		partitioned?: boolean;
	},
) {
	// 클라이언트 측
	if (typeof window !== "undefined") {
		const encryptedValue = encrypt(value);
		let cookieString = `${name}=${encryptedValue}`;

		if (options) {
			if (options.expires) {
				cookieString += `; expires=${options.expires.toUTCString()}`;
			}
			if (options.maxAge !== undefined) {
				cookieString += `; max-age=${options.maxAge}`;
			}
			if (options.domain) {
				cookieString += `; domain=${options.domain}`;
			}
			if (options.path) {
				cookieString += `; path=${options.path}`;
			} else {
				cookieString += "; path=/"; // 기본 경로 설정
			}
			if (options.secure) {
				cookieString += "; secure";
			}
			if (options.httpOnly) {
				cookieString += "; httpOnly";
			}
			if (options.sameSite) {
				if (typeof options.sameSite === "boolean") {
					cookieString += "; sameSite=strict";
				} else {
					cookieString += `; sameSite=${options.sameSite}`;
				}
			}
			if (options.priority) {
				cookieString += `; priority=${options.priority}`;
			}
			if (options.partitioned) {
				cookieString += "; partitioned";
			}
		} else {
			cookieString += "; path=/"; // 기본 경로 설정
		}

		document.cookie = cookieString;
		return;
	}
	// 서버 측
	const cookieStore = await getServerCookieStore();
	if (!cookieStore) return;

	const encryptedValue = encrypt(value);
	cookieStore.set(name, encryptedValue, options);
}

/**
 * NOTE - 쿠키를 삭제하는 함수
 * @param name 삭제할 쿠키 이름
 */
export async function deleteCookie(name: string) {
	// 클라이언트 측
	if (typeof window !== "undefined") {
		// 만료일을 과거로 설정하여 삭제 비스무리하게 처리
		document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
		return;
	}
	// 서버 측
	const cookieStore = await getServerCookieStore();
	if (cookieStore) {
		cookieStore.delete(name);
	}
}
