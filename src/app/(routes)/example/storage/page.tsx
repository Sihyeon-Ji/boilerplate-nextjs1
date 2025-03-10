"use client";

import { useState, useEffect } from "react";
import {
	getCookie,
	setCookie,
	deleteCookie,
	checkCookie,
	getAllCookies,
} from "@/hooks/useCookie";
import {
	getLocalStorageItem,
	setLocalStorageItem,
	deleteLocalStorageItem,
	checkLocalStorageItem,
	getLocalStorageAllItems,
} from "@/hooks/useLocalStorage";
import {
	getSessionStorageItem,
	setSessionStorageItem,
	deleteSessionStorageItem,
	checkSessionStorageItem,
	getSessionStorageAllItems,
} from "@/hooks/useSessionStorage";

export default function StorageExamplePage() {
	// 입력 상태 및 결과 상태
	const [key, setKey] = useState("testKey");
	const [value, setValue] = useState("testValue");
	const [cookieResult, setCookieResult] = useState<string>("");
	const [localResult, setLocalResult] = useState<string>("");
	const [sessionResult, setSessionResult] = useState<string>("");

	// 현재 저장된 데이터 조회를 위한 상태
	const [cookieItems, setCookieItems] = useState<
		{ name: string; value: string }[]
	>([]);
	const [localItems, setLocalItems] = useState<
		{ key: string; value: string }[]
	>([]);
	const [sessionItems, setSessionItems] = useState<
		{ key: string; value: string }[]
	>([]);

	// 초기 데이터 로드
	useEffect(() => {
		loadAllData();
	}, []);

	// 모든 스토리지 데이터 로드
	const loadAllData = async () => {
		// 쿠키 로드
		const cookies = await getAllCookies();
		setCookieItems(cookies);

		// 클라이언트 측에서만 실행
		if (typeof window !== "undefined") {
			// 로컬 스토리지 로드
			const locals = getLocalStorageAllItems();
			setLocalItems(locals);

			// 세션 스토리지 로드
			const sessions = getSessionStorageAllItems();
			setSessionItems(sessions);
		}
	};

	// 쿠키 관련 핸들러
	const handleSetCookie = async () => {
		await setCookie(key, value, { maxAge: 3600 });
		setCookieResult(`쿠키 저장됨: ${key}=${value}`);
		loadAllData();
	};

	const handleGetCookie = async () => {
		const result = await getCookie(key);
		setCookieResult(result ? `쿠키 값: ${result}` : `쿠키 없음: ${key}`);
	};

	const handleCheckCookie = async () => {
		const exists = await checkCookie(key);
		setCookieResult(
			exists ? `쿠키 존재함: ${key}` : `쿠키 존재하지 않음: ${key}`,
		);
	};

	const handleDeleteCookie = async () => {
		await deleteCookie(key);
		setCookieResult(`쿠키 삭제됨: ${key}`);
		loadAllData();
	};

	// 로컬 스토리지 관련 핸들러
	const handleSetLocalStorage = () => {
		setLocalStorageItem(key, value);
		setLocalResult(`로컬 스토리지 저장됨: ${key}=${value}`);
		loadAllData();
	};

	const handleGetLocalStorage = () => {
		const result = getLocalStorageItem(key);
		setLocalResult(
			result ? `로컬 스토리지 값: ${result}` : `로컬 스토리지 없음: ${key}`,
		);
	};

	const handleCheckLocalStorage = () => {
		const exists = checkLocalStorageItem(key);
		setLocalResult(
			exists
				? `로컬 스토리지 존재함: ${key}`
				: `로컬 스토리지 존재하지 않음: ${key}`,
		);
	};

	const handleDeleteLocalStorage = () => {
		deleteLocalStorageItem(key);
		setLocalResult(`로컬 스토리지 삭제됨: ${key}`);
		loadAllData();
	};

	// 세션 스토리지 관련 핸들러
	const handleSetSessionStorage = () => {
		setSessionStorageItem(key, value);
		setSessionResult(`세션 스토리지 저장됨: ${key}=${value}`);
		loadAllData();
	};

	const handleGetSessionStorage = () => {
		const result = getSessionStorageItem(key);
		setSessionResult(
			result ? `세션 스토리지 값: ${result}` : `세션 스토리지 없음: ${key}`,
		);
	};

	const handleCheckSessionStorage = () => {
		const exists = checkSessionStorageItem(key);
		setSessionResult(
			exists
				? `세션 스토리지 존재함: ${key}`
				: `세션 스토리지 존재하지 않음: ${key}`,
		);
	};

	const handleDeleteSessionStorage = () => {
		deleteSessionStorageItem(key);
		setSessionResult(`세션 스토리지 삭제됨: ${key}`);
		loadAllData();
	};

	return (
		<div className="mx-auto max-w-4xl p-6">
			<h1 className="mb-6 text-3xl font-bold">스토리지 예제</h1>

			{/* 입력 필드 */}
			<div className="mb-8 rounded-lg bg-slate-100 p-4">
				<h2 className="mb-3 text-xl font-semibold">테스트 데이터</h2>
				<div className="mb-2 flex gap-4">
					<div className="flex-1">
						<label className="mb-1 block text-sm font-medium">키</label>
						<input
							type="text"
							value={key}
							onChange={(e) => setKey(e.target.value)}
							className="w-full rounded border p-2"
						/>
					</div>
					<div className="flex-1">
						<label className="mb-1 block text-sm font-medium">값</label>
						<input
							type="text"
							value={value}
							onChange={(e) => setValue(e.target.value)}
							className="w-full rounded border p-2"
						/>
					</div>
				</div>
				<button
					onClick={loadAllData}
					className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
				>
					모든 데이터 새로고침
				</button>
			</div>

			{/* 쿠키 섹션 */}
			<div className="mb-8 rounded-lg border p-6 shadow-sm">
				<h2 className="mb-4 text-2xl font-semibold">쿠키 (Cookie)</h2>

				<div className="mb-4 grid grid-cols-2 gap-2">
					<button
						onClick={handleSetCookie}
						className="rounded bg-green-500 p-2 text-white"
					>
						저장
					</button>
					<button
						onClick={handleGetCookie}
						className="rounded bg-blue-500 p-2 text-white"
					>
						조회
					</button>
					<button
						onClick={handleCheckCookie}
						className="rounded bg-yellow-500 p-2 text-white"
					>
						확인
					</button>
					<button
						onClick={handleDeleteCookie}
						className="rounded bg-red-500 p-2 text-white"
					>
						삭제
					</button>
				</div>

				<div className="mb-4 min-h-[40px] rounded bg-gray-100 p-3">
					<p>{cookieResult}</p>
				</div>

				<div>
					<h3 className="mb-2 font-medium">저장된 쿠키 목록</h3>
					<div className="max-h-[200px] overflow-auto rounded border p-2">
						{cookieItems.length > 0 ? (
							<ul>
								{cookieItems.map((item, idx) => (
									<li key={idx} className="mb-1 border-b pb-1">
										<strong>{item.name}:</strong> {item.value}
									</li>
								))}
							</ul>
						) : (
							<p className="text-gray-500">저장된 쿠키가 없습니다.</p>
						)}
					</div>
				</div>
			</div>

			{/* 로컬 스토리지 섹션 */}
			<div className="mb-8 rounded-lg border p-6 shadow-sm">
				<h2 className="mb-4 text-2xl font-semibold">
					로컬 스토리지 (Local Storage)
				</h2>

				<div className="mb-4 grid grid-cols-2 gap-2">
					<button
						onClick={handleSetLocalStorage}
						className="rounded bg-green-500 p-2 text-white"
					>
						저장
					</button>
					<button
						onClick={handleGetLocalStorage}
						className="rounded bg-blue-500 p-2 text-white"
					>
						조회
					</button>
					<button
						onClick={handleCheckLocalStorage}
						className="rounded bg-yellow-500 p-2 text-white"
					>
						확인
					</button>
					<button
						onClick={handleDeleteLocalStorage}
						className="rounded bg-red-500 p-2 text-white"
					>
						삭제
					</button>
				</div>

				<div className="mb-4 min-h-[40px] rounded bg-gray-100 p-3">
					<p>{localResult}</p>
				</div>

				<div>
					<h3 className="mb-2 font-medium">저장된 로컬 스토리지 목록</h3>
					<div className="max-h-[200px] overflow-auto rounded border p-2">
						{localItems.length > 0 ? (
							<ul>
								{localItems.map((item, idx) => (
									<li key={idx} className="mb-1 border-b pb-1">
										<strong>{item.key}:</strong> {item.value}
									</li>
								))}
							</ul>
						) : (
							<p className="text-gray-500">
								저장된 로컬 스토리지 항목이 없습니다.
							</p>
						)}
					</div>
				</div>
			</div>

			{/* 세션 스토리지 섹션 */}
			<div className="mb-8 rounded-lg border p-6 shadow-sm">
				<h2 className="mb-4 text-2xl font-semibold">
					세션 스토리지 (Session Storage)
				</h2>

				<div className="mb-4 grid grid-cols-2 gap-2">
					<button
						onClick={handleSetSessionStorage}
						className="rounded bg-green-500 p-2 text-white"
					>
						저장
					</button>
					<button
						onClick={handleGetSessionStorage}
						className="rounded bg-blue-500 p-2 text-white"
					>
						조회
					</button>
					<button
						onClick={handleCheckSessionStorage}
						className="rounded bg-yellow-500 p-2 text-white"
					>
						확인
					</button>
					<button
						onClick={handleDeleteSessionStorage}
						className="rounded bg-red-500 p-2 text-white"
					>
						삭제
					</button>
				</div>

				<div className="mb-4 min-h-[40px] rounded bg-gray-100 p-3">
					<p>{sessionResult}</p>
				</div>

				<div>
					<h3 className="mb-2 font-medium">저장된 세션 스토리지 목록</h3>
					<div className="max-h-[200px] overflow-auto rounded border p-2">
						{sessionItems.length > 0 ? (
							<ul>
								{sessionItems.map((item, idx) => (
									<li key={idx} className="mb-1 border-b pb-1">
										<strong>{item.key}:</strong> {item.value}
									</li>
								))}
							</ul>
						) : (
							<p className="text-gray-500">
								저장된 세션 스토리지 항목이 없습니다.
							</p>
						)}
					</div>
				</div>
			</div>

			{/* 각 스토리지 타입 차이점 설명 */}
			<div className="rounded-lg bg-blue-50 p-4">
				<h3 className="mb-2 font-semibold">스토리지 타입 비교</h3>
				<ul className="list-disc space-y-1 pl-5">
					<li>
						<strong>쿠키</strong>: 서버로 전송됨, 용량 제한 (4KB), 만료 설정
						가능
					</li>
					<li>
						<strong>로컬 스토리지</strong>: 브라우저를 닫아도 유지 (영구 저장),
						서버로 전송되지 않음, 더 큰 용량 (5MB)
					</li>
					<li>
						<strong>세션 스토리지</strong>: 브라우저/탭을 닫으면 삭제됨, 서버로
						전송되지 않음, 더 큰 용량 (5MB)
					</li>
				</ul>
			</div>
		</div>
	);
}
