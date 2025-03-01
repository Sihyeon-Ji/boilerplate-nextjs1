import { useState } from "react";
import BaseModal from "@/components/modal/BaseModal";
import FormModal from "@/components/modal/FormModal";

// 모달 타입 정의
export type ModalType = "base" | "form";

// 모달 데이터 타입 정의
export interface ModalData {
	title?: string;
	description?: string;
	onSubmit?: (data: any) => void;
	[key: string]: any; // 기타 필요한 데이터
}

// 모달 상태 관리를 위한 훅
export function useModal() {
	// 모달 상태 관리
	const [showModal, setShowModal] = useState(false);
	const [modalType, setModalType] = useState<ModalType>("base");
	const [modalData, setModalData] = useState<ModalData>({
		title: "",
		description: "",
	});

	// 모달 열기 함수
	const openModal = (type: ModalType, data?: ModalData) => {
		setModalType(type);
		if (data) {
			setModalData(data);
		}
		setShowModal(true);
	};

	// 모달 닫기 함수
	const closeModal = () => {
		setShowModal(false);
	};

	// 모달 컴포넌트를 반환하는 함수
	const ModalComponent = () => {
		if (!showModal) return null;

		switch (modalType) {
			case "base":
				return (
					<BaseModal
						showModal={showModal}
						setShowModal={setShowModal}
						title={modalData.title}
						description={modalData.description}
					/>
				);
			case "form":
				return (
					<FormModal
						showModal={showModal}
						setShowModal={setShowModal}
						title={modalData.title}
						description={modalData.description}
						onSubmit={modalData.onSubmit}
					/>
				);
			default:
				return null;
		}
	};

	return {
		showModal,
		modalType,
		modalData,
		openModal,
		closeModal,
		Modal: ModalComponent,
	};
}
