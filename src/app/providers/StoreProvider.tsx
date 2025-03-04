"use client";

import type { AppStore } from "@/lib/config/store";
import { makeStore } from "@/lib/config/store";
import { setupListeners } from "@reduxjs/toolkit/query";
import type { ReactNode } from "react";
import { useEffect, useRef } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

interface Props {
	readonly children: ReactNode;
}

export const StoreProvider = ({ children }: Props) => {
	const storeRef = useRef<AppStore | null>(null);

	if (!storeRef.current) {
		//NOTE - 이 컴포넌트가 처음 렌더링될 때 스토어 인스턴스를 생성합니다
		storeRef.current = makeStore();
	}

	useEffect(() => {
		if (storeRef.current != null) {
			//NOTE - 기본 설정으로 리스너를 구성합니다
			// 선택 사항이지만, refetchOnFocus/refetchOnReconnect 기능에 필요합니다
			// (브라우저 탭 포커스 변경이나 네트워크 재연결 시 데이터 자동 갱신 기능)
			const unsubscribe = setupListeners(storeRef.current.dispatch);
			return unsubscribe;
		}
	}, []);

	return (
		<Provider store={storeRef.current}>
			<PersistGate loading={null} persistor={storeRef.current.persistor}>
				{children}
			</PersistGate>
		</Provider>
	);
};
