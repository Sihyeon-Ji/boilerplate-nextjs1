import FormModal from "@/components/modal/FormModal";
import { useState } from "react";

// 예제 모달 상태 관리를 위한 훅
export function useFormModal() {
	const [showModal, setShowModal] = useState(false);
	const [modalData, setModalData] = useState({
		title: "사용자 정보 입력",
		description: "아래 양식을 작성해주세요.",
	});
	const [onSubmitCallback, setOnSubmitCallback] = useState<
		((data: { name: string; email: string }) => void) | undefined
	>(undefined);

	// 모달 열기 함수 (옵션 제공 가능)
	const openModal = (options?: {
		title?: string;
		description?: string;
		onSubmit?: (data: { name: string; email: string }) => void;
	}) => {
		if (options?.title)
			setModalData((prev) => ({ ...prev, title: options.title ?? "" }));
		if (options?.description)
			setModalData((prev) => ({
				...prev,
				description: options.description ?? "",
			}));
		if (options?.onSubmit) setOnSubmitCallback(() => options.onSubmit);
		setShowModal(true);
	};

	// 모달 컴포넌트를 반환하는 함수
	const ModalComponent = () => {
		return (
			<FormModal
				showModal={showModal}
				setShowModal={setShowModal}
				title={modalData.title}
				description={modalData.description}
				onSubmit={onSubmitCallback}
			/>
		);
	};

	return {
		setShowModal,
		showModal,
		openModal,
		Modal: ModalComponent,
	};
}
