"use client";
import { useModal, ModalType, ModalData } from "@/hooks/useModal";
import { createContext } from "react";

// 모달 컨텍스트 생성
export const ModalContext = createContext<{
	openModal: (type: ModalType, data?: ModalData) => void;
	closeModal: () => void;
}>({
	openModal: () => {},
	closeModal: () => {},
});

// ModalProvider 컴포넌트
export default function ModalProvider({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	const { openModal, closeModal, Modal, showModal } = useModal();

	return (
		<ModalContext.Provider
			value={{
				openModal,
				closeModal,
			}}
		>
			{showModal && <Modal />}
			{children}
		</ModalContext.Provider>
	);
}
