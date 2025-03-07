"use client";

import createWebStorage from "redux-persist/lib/storage/createWebStorage";

// NOTE - SSR 안전 스토리지 유틸리티
// 이 파일은 Next.js와 같은 SSR(Server-Side Rendering) 환경에서
// localStorage 접근으로 인한 오류를 방지하기 위한 유틸리티입니다.
// - 서버 환경: 실제로 아무 동작도 하지 않는 Noop 스토리지를 제공
// - 클라이언트 환경: 실제 localStorage에 접근하는 기능 제공
// 주로 redux-persist나 기타 상태 지속성 라이브러리와 함께 사용됩니다.
// 실제로 이 유틸 없이 실행하면 정상동작은 하지만
// 서버 환경에서 에러 로그가 잔뜩 발생합니다.....

// 서버 환경에서 사용할 더미 스토리지 인터페이스
// localStorage와 동일한 API를 가지지만 실제로는 아무 작업도 수행하지 않음
interface NoopStorageReturnType {
	getItem: (_key: any) => Promise<null>;
	setItem: (_key: any, value: any) => Promise<any>;
	removeItem: (_key: any) => Promise<void>;
}

// 서버 환경에서 사용되는 더미 스토리지 구현
// localStorage API와 동일한 메서드를 제공하지만 실제 저장소 작업은 수행하지 않음
const createNoopStorage = (): NoopStorageReturnType => {
	return {
		getItem(_key: any): Promise<null> {
			return Promise.resolve(null);
		},
		setItem(_key: any, value: any): Promise<any> {
			return Promise.resolve(value);
		},
		removeItem(_key: any): Promise<void> {
			return Promise.resolve();
		},
	};
};

// 환경에 따라 적절한 스토리지 객체 생성
// - 브라우저 환경: 실제 localStorage 사용
// - 서버 환경: 더미 스토리지 사용(에러 방지)
const storage =
	typeof window !== "undefined"
		? createWebStorage("local")
		: createNoopStorage();

export default storage;
