"use client";

import { useApiGetById } from "@/hooks/useApi";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

export default function UserDetailPage() {
	const params = useParams();
	const router = useRouter();
	const userId = params.id as string | number;

	type User = {
		name: string;
		email: string;
		phone: string;
	};

	const { data: user, isLoading, error } = useApiGetById<User>("users", userId);

	if (isLoading) return <div>사용자 정보를 불러오는 중...</div>;
	if (error) return <div>오류: {error.message}</div>;
	if (!user) return <div>사용자를 찾을 수 없습니다.</div>;

	return (
		<div className="container mx-auto p-4">
			<h1 className="mb-4 text-2xl font-bold">사용자 상세 정보</h1>

			<div className="rounded bg-white p-6 shadow">
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
					<Link href="/users" className="btn">
						목록으로
					</Link>
					<Link href={`/users/${userId}/edit`} className="btn btn-secondary">
						수정하기
					</Link>
				</div>
			</div>
		</div>
	);
}
