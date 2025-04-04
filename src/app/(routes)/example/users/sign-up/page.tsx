"use client";

import { useMutation } from "@tanstack/react-query";
import clientAPI from "@/lib/config/axiosClientInstance";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { getQueryClient } from "@/lib/config/getQueryClient";

export default function CreateUserPage() {
	console.log(
		`user sign up 페이지 렌더링 환경: ${typeof window === "undefined" ? "서버" : "클라이언트"}`,
	);
	const router = useRouter();
	const queryClient = getQueryClient();
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		phone: "",
	});

	const createUserMutation = useMutation({
		mutationFn: (userData: typeof formData) =>
			clientAPI.post("/example/users", userData),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["users"],
				refetchType: "all", // Next.js의 클라이언트 컴포넌트에서 페이지 이동 시 React Query의 캐시 상태가 제대로 전파되지 않는 거 같아서 refetchType을 "all"로 설정
			}); //                     querykey: ["users"] 만으로 캐시 무효화가 제대로 되지 않고 stale 상태로 남아있어서 refetchType all로 강제로 refetch 시켰음
			alert("사용자가 생성되었습니다.");
			router.push("/example/users");
		},
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		createUserMutation.mutate(formData);
	};

	return (
		<div className="container mx-auto p-4">
			<h1 className="mb-4 text-2xl font-bold">사용자 추가</h1>

			<form onSubmit={handleSubmit} className="rounded p-6 shadow">
				<div className="mb-4">
					<label className="mb-2 block">이름</label>
					<input
						type="text"
						name="name"
						value={formData.name}
						onChange={handleChange}
						required
						className="w-full rounded border p-2"
					/>
				</div>

				<div className="mb-4">
					<label className="mb-2 block">이메일</label>
					<input
						type="email"
						name="email"
						value={formData.email}
						onChange={handleChange}
						required
						className="w-full rounded border p-2"
					/>
				</div>

				<div className="mb-4">
					<label className="mb-2 block">전화번호</label>
					<input
						type="tel"
						name="phone"
						value={formData.phone}
						onChange={handleChange}
						className="w-full rounded border p-2"
					/>
				</div>

				<div className="mt-6 flex gap-2">
					<button type="button" onClick={() => router.back()} className="btn">
						취소
					</button>
					<button
						type="submit"
						disabled={createUserMutation.isPending}
						className="btn btn-primary"
					>
						{createUserMutation.isPending ? "처리 중..." : "저장"}
					</button>
				</div>
			</form>
		</div>
	);
}
