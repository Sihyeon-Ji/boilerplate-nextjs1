"use client";

import { useModal } from "@/hooks/useModal";
import { Button } from "@/components/ui/button";
import BasicModal from "./BasicModal";
import FormModal from "./FormModal";
import CustomModal from "./CustomModal";

export default function ModalPage() {
	// useModal 훅 사용
	const { openModal, closeModal } = useModal();

	// 기본 모달 열기
	const handleOpenBasicModal = () => {
		openModal({
			title: "알림",
			description: "이것은 기본 모달입니다.",
			content: <BasicModal closeModal={closeModal} />,
		});
	};

	// 폼 모달 열기
	const handleOpenFormModal = () => {
		openModal({
			title: "사용자 정보",
			description: "아래 양식을 작성해주세요.",
			content: <FormModal closeModal={closeModal} />,
		});
	};

	// 커스텀 폼 모달 열기
	const handleOpenCustomFormModal = () => {
		openModal({
			title: "고객 정보 입력",
			description: "다음 정보를 입력해주세요.",
			content: <CustomModal closeModal={closeModal} />,
		});
	};

	return (
		<div className="container mx-auto py-10">
			<h1 className="mb-8 text-3xl font-bold">통합 모달 시스템 예제</h1>

			<div className="grid gap-6">
				<div className="rounded-lg border p-6">
					<h2 className="mb-4 text-xl font-semibold">기본 모달</h2>
					<p className="mb-4">간단한 정보 표시에 적합한 기본 모달입니다.</p>
					<Button onClick={handleOpenBasicModal}>기본 모달 열기</Button>
				</div>

				<div className="rounded-lg border p-6">
					<h2 className="mb-4 text-xl font-semibold">양식 모달</h2>
					<p className="mb-4">
						더 복잡한 기능을 가진 모달입니다. 폼 제출 기능이 포함되어 있습니다.
					</p>
					<div className="flex gap-4">
						<Button onClick={handleOpenFormModal}>양식 모달 열기</Button>

						<Button onClick={handleOpenCustomFormModal} variant="secondary">
							커스텀 양식 모달
						</Button>
					</div>
				</div>

				<div className="rounded-lg border p-6">
					<h2 className="mb-4 text-xl font-semibold">모달 닫기</h2>
					<p className="mb-4">프로그래밍 방식으로 모달을 닫을 수도 있습니다.</p>
					<Button onClick={closeModal} variant="destructive">
						열린 모달 닫기
					</Button>
				</div>
			</div>
		</div>
	);
}
