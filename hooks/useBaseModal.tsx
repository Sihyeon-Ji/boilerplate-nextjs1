import BaseModal from "@/components/modal/BaseModal";
import { useState } from "react";

// 모달 상태 관리를 위한 훅
export function useModal() {
	const [showModal, setShowModal] = useState(false);

	// 모달 컴포넌트를 반환하는 함수
	const ModalComponent = () => {
		return <BaseModal showModal={showModal} setShowModal={setShowModal} />;
	};

	return {
		setShowModal,
		showModal,
		Modal: ModalComponent,
	};
}
