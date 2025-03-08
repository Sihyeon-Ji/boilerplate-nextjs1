"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

interface FormModalProps {
	closeModal: () => void;
}

export default function FormModal({ closeModal }: FormModalProps) {
	console.log(
		`form modal 렌더링 환경 : ${typeof window === "undefined" ? "서버" : "클라이언트"}`,
	);
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");

	const handleSubmit = () => {
		alert(`이름: ${name}, 이메일: ${email}`);
		closeModal();
	};

	return (
		<div className="mt-4">
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
			<div className="flex justify-end space-x-2">
				<Button variant="outline" onClick={closeModal}>
					취소
				</Button>
				<Button onClick={handleSubmit}>저장</Button>
			</div>
		</div>
	);
}
