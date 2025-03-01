"use client";

import { Dispatch, SetStateAction } from "react";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

// 기본 모달 컴포넌트
export default function BaseModal({
	showModal,
	setShowModal,
	title = "안내",
	description = "모달 내용을 표시합니다.",
}: {
	showModal: boolean;
	setShowModal: Dispatch<SetStateAction<boolean>>;
	title?: string;
	description?: string;
}) {
	return (
		<Dialog open={showModal} onOpenChange={setShowModal}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle className="text-center">{title}</DialogTitle>
					<DialogDescription className="text-center">
						{description}
					</DialogDescription>
				</DialogHeader>
				<div className="flex flex-col space-y-4">
					<div className="flex justify-end space-x-2">
						<Button onClick={() => setShowModal(false)}>닫기</Button>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}
