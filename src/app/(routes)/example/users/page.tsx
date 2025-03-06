"use client";

import { useApiGet, useApiDelete } from "@/hooks/useApi";
import Link from "next/link";
import { useState } from "react";

export default function UsersPage() {
	const [isDeleting, setIsDeleting] = useState(false);

	type User = {
		id: number;
		name: string;
		email: string;
	};

	const { data: users, isLoading, error } = useApiGet<User[]>("users");

	const deleteUserMutation = useApiDelete("users", {
		onMutate: () => setIsDeleting(true),
		onSettled: () => setIsDeleting(false),
	});

	const handleDelete = (id: number) => {
		if (window.confirm("정말 삭제하시겠습니까?")) {
			deleteUserMutation.mutate(id);
		}
	};

	if (isLoading) return <div>사용자 목록을 불러오는 중...</div>;
	if (error) return <div>오류: {error.message}</div>;

	return (
		<div className="container mx-auto p-4">
			<h1 className="mb-4 text-2xl font-bold">사용자 목록</h1>

			<Link href="/users/new" className="btn btn-primary mb-4">
				사용자 추가
			</Link>

			<div className="grid gap-4">
				{users.map((user) => (
					<div
						key={user.id}
						className="flex justify-between rounded border p-4"
					>
						<div>
							<h2 className="font-bold">{user.name}</h2>
							<p>{user.email}</p>
						</div>
						<div className="flex gap-2">
							<Link href={`/users/${user.id}`} className="btn btn-sm">
								상세보기
							</Link>
							<Link
								href={`/users/${user.id}/edit`}
								className="btn btn-sm btn-secondary"
							>
								수정
							</Link>
							<button
								onClick={() => handleDelete(user.id)}
								disabled={isDeleting}
								className="btn btn-sm btn-danger"
							>
								삭제
							</button>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
