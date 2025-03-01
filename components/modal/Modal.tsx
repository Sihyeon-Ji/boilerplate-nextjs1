"use client";

import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
} from "@/components/ui/dialog";
import { ReactNode } from "react";

// 기본 모달 컴포넌트
export default function Modal({
	showModal,
	setShowModal,
	title,
	description,
	children,
}: {
	showModal: boolean;
	setShowModal: (show: boolean) => void;
	title?: string;
	description?: string;
	children?: ReactNode;
}) {
	return (
		<Dialog open={showModal} onOpenChange={setShowModal}>
			<DialogContent>
				{(title || description) && (
					<DialogHeader>
						{title && <DialogTitle>{title}</DialogTitle>}
						{description && (
							<DialogDescription>{description}</DialogDescription>
						)}
					</DialogHeader>
				)}
				{children}
			</DialogContent>
		</Dialog>
	);
}
