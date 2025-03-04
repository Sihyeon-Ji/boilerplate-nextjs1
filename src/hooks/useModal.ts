"use client";

import { useContext } from "react";
import { ModalContext } from "@/providers/ModalProvider";

// 모달 상태 관리를 위한 훅
export function useModal() {
	const context = useContext(ModalContext);

	if (!context) {
		throw new Error("useModal must be used within a ModalProvider");
	}

	return context;
}
