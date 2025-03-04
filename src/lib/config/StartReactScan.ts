"use client";

import { useEffect } from "react";

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
