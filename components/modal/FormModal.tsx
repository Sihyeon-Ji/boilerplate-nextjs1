"use client";

import { Dispatch, SetStateAction, useState } from "react";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// 예제 모달 컴포넌트 (더 복잡한 상황을 위한 예시)
export default function FormModal({
	showModal,
	setShowModal,
	title = "사용자 정보 입력",
	description = "아래 양식을 작성해주세요.",
	onSubmit = () => {},
}: {
	showModal: boolean;
	setShowModal: Dispatch<SetStateAction<boolean>>;
	title?: string;
	description?: string;
	onSubmit?: (data: { name: string; email: string }) => void;
}) {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");

	const handleSubmit = () => {
		onSubmit({ name, email });
		setShowModal(false);
	};

	return (
		<Dialog open={showModal} onOpenChange={setShowModal}>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>{title}</DialogTitle>
					<DialogDescription>{description}</DialogDescription>
				</DialogHeader>
				<div className="grid gap-4 py-4">
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="name" className="text-right">
							이름
						</Label>
						<Input
							id="name"
							value={name}
							onChange={(e) => setName(e.target.value)}
							className="col-span-3"
						/>
					</div>
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="email" className="text-right">
							이메일
						</Label>
						<Input
							id="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							className="col-span-3"
						/>
					</div>
				</div>
				<DialogFooter>
					<Button type="submit" onClick={handleSubmit}>
						저장
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
