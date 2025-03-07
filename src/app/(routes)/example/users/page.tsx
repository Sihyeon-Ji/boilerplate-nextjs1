"use client";

import { useQuery, useMutation } from "@tanstack/react-query";
import clientAPI from "@/lib/config/axiosClientInstance";
import Link from "next/link";
import { useState } from "react";
import { getQueryClient } from "@/lib/config/getQueryClient";

export default function UsersPage() {
	console.log(
		`users 페이지 렌더링 환경: ${typeof window === "undefined" ? "서버" : "클라이언트"}`,
	);
	const [isDeleting, setIsDeleting] = useState(false);
	const queryClient = getQueryClient();

	type User = {
		id: number;
		name: string;
		email: string;
	};

	const {
		data: users,
		isLoading,
		error,
	} = useQuery<User[]>({
		queryKey: ["users"],
		// queryFn: () => clientAPI.get("/example/users").then((res) => res.data),
		// 위처럼 사용하면 되는데 아래는 단지 이 쿼리가 client에서 잘 요청되는지 확인해보기 위함
		queryFn: async () => {
			console.log(
				"쿼리 함수 실행 환경:",
				typeof window === "undefined" ? "서버" : "클라이언트",
			);
			const { data } = await clientAPI.get("/example/users");
			return data;
		},
	});

	const deleteUserMutation = useMutation({
		mutationFn: (id: number) =>
			clientAPI.delete(`/example/users/${id}`).then((res) => res.data),
		onMutate: () => setIsDeleting(true),
		onSettled: () => setIsDeleting(false),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["users"] });
		},
	});

	const handleDelete = (id: number) => {
		if (window.confirm("정말 삭제하시겠습니까?")) {
			deleteUserMutation.mutate(id);
		}
	};

	if (isLoading) return <div>사용자 목록을 불러오는 중...</div>;
	if (error) return <div>오류: {(error as Error).message}</div>;
	if (!users) return <div>사용자를 찾을 수 없습니다.</div>;

	return (
		<div className="container mx-auto p-4">
			<h1 className="mb-4 text-2xl font-bold">사용자 목록</h1>

			<Link href="/example/users/sign-up" className="btn btn-primary mb-4">
				사용자 추가
			</Link>

			<div className="grid gap-4">
				{users?.map((user) => (
					<div
						key={user.id}
						className="flex justify-between rounded border p-4"
					>
						<div>
							<h2 className="font-bold">{user.name}</h2>
							<p>{user.email}</p>
						</div>
						<div className="flex gap-2">
							<Link href={`/example/users/${user.id}`} className="btn btn-sm">
								상세보기
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
