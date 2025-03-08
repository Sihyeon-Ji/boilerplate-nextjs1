"use client";

import { Button } from "@/components/ui/button";

interface BasicModalProps {
	closeModal: () => void;
}

export default function BasicModal({ closeModal }: BasicModalProps) {
	console.log(
		`basic modal 렌더링 환경 : ${typeof window === "undefined" ? "서버" : "클라이언트"}`,
	);
	return (
		<div className="mt-4 flex justify-end">
			<Button onClick={closeModal}>확인</Button>
		</div>
	);
}
