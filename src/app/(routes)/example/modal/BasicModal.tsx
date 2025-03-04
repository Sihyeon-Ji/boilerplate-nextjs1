"use client";

import { Button } from "@/components/ui/button";

interface BasicModalProps {
	closeModal: () => void;
}

export default function BasicModal({ closeModal }: BasicModalProps) {
	return (
		<div className="mt-4 flex justify-end">
			<Button onClick={closeModal}>확인</Button>
		</div>
	);
}
