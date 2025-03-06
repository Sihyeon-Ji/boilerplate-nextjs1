"use client";

import { useEffect } from "react";

// NOTE - react-scan 설정
// react-scan 라이브러리가 클라이언트 환경에서만 실행되기에
// nextjs에서 클라이언트 컴포넌트에서만 실행되도록 하는 설정
export function StartReactScan() {
	useEffect(() => {
		const initScan = async () => {
			if (process.env.NODE_ENV !== "production") {
				const { scan } = await import("react-scan");
				scan({
					enabled: true,
				});
			}
		};

		initScan();
	}, []);

	return null;
}
