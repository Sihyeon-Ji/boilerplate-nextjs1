"use client";

import { Button } from "@/components/ui/button";

interface BasicModalProps {
	closeModal: () => void;
}

export default function BasicModal({ closeModal }: BasicModalProps) {
	console.log(
		`basic modal이 어디서 렌더링 되었을까요? : ${typeof window === "undefined" ? "서버" : "클라이언트"}`,
	);
	return (
		<div className="mt-4 flex justify-end">
			<Button onClick={closeModal}>확인</Button>
		</div>
	);
}
