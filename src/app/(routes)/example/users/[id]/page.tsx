"use client";

import { useQuery } from "@tanstack/react-query";
import clientAPI from "@/lib/config/axiosClientInstance";
import { useParams } from "next/navigation";
import Link from "next/link";

export default function UserDetailPage() {
	const params = useParams();
	const userId = params.id as string | number;

	type User = {
		name: string;
		email: string;
		phone: string;
	};

	const {
		data: user,
		isLoading,
		error,
	} = useQuery<User>({
		queryKey: ["users", userId],
		// queryFn: () => clientAPI.get(`/example/users/${userId}`).then((res) => res.data),
		// 위처럼 사용하면 되는데 아래는 단지 이 쿼리가 client에서 잘 요청되는지 확인해보기 위함
		queryFn: async () => {
			console.log(
				"쿼리 함수 실행 환경:",
				typeof window === "undefined" ? "서버" : "클라이언트",
			);
			const { data } = await clientAPI.get(`/example/users/${userId}`);
			return data;
		},
	});

	if (isLoading) return <div>사용자 정보를 불러오는 중...</div>;
	if (error) return <div>오류: {(error as Error).message}</div>;
	if (!user) return <div>사용자를 찾을 수 없습니다.</div>;

	return (
		<div className="container mx-auto p-4">
			<h1 className="mb-4 text-2xl font-bold">사용자 상세 정보</h1>

			<div className="rounded p-6 shadow">
				<div className="mb-4">
					<label className="font-bold">이름:</label>
					<p>{user.name}</p>
				</div>

				<div className="mb-4">
					<label className="font-bold">이메일:</label>
					<p>{user.email}</p>
				</div>

				<div className="mb-4">
					<label className="font-bold">전화번호:</label>
					<p>{user.phone || "-"}</p>
				</div>

				<div className="mt-6 flex gap-2">
					<Link href="/example/users" className="btn">
						목록으로
					</Link>
				</div>
			</div>
		</div>
	);
}
