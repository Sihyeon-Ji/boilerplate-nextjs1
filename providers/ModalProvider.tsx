"use client";
import { createContext, useState, ReactNode } from "react";
import Modal from "@/components/modal/Modal";

// 모달 컨텍스트 타입
type ModalContextType = {
	openModal: (props: {
		title?: string;
		description?: string;
		content?: ReactNode;
	}) => void;
	closeModal: () => void;
};

// 모달 컨텍스트 생성
export const ModalContext = createContext<ModalContextType>({
	openModal: () => {},
	closeModal: () => {},
});

// ModalProvider 컴포넌트
export default function ModalProvider({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	const [showModal, setShowModal] = useState(false);
	const [modalContent, setModalContent] = useState<ReactNode | null>(null);
	const [modalProps, setModalProps] = useState({
		title: "",
		description: "",
	});

	// 모달 열기 함수
	const openModal = ({
		title = "",
		description = "",
		content = null,
	}: {
		title?: string;
		description?: string;
		content?: ReactNode;
	}) => {
		setModalProps({ title, description });
		setModalContent(content);
		setShowModal(true);
	};

	// 모달 닫기 함수
	const closeModal = () => {
		setShowModal(false);
		// 애니메이션이 끝나면 컨텐츠를 비움
		setTimeout(() => {
			setModalContent(null);
			setModalProps({ title: "", description: "" });
		}, 300);
	};

	return (
		<ModalContext.Provider
			value={{
				openModal,
				closeModal,
			}}
		>
			<Modal
				showModal={showModal}
				setShowModal={setShowModal}
				title={modalProps.title}
				description={modalProps.description}
			>
				{modalContent}
			</Modal>
			{children}
		</ModalContext.Provider>
	);
}
