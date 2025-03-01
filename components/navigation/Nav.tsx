"use client";

import Link from "next/link";

export const Nav = () => {
	return (
		<nav className="flex items-center gap-4">
			<Link className="text-lg font-bold" href="/">
				메인페이지
			</Link>
			<Link className="text-lg font-bold" href="/example/verify">
				Redux 전역상태 확인하기
			</Link>
			<Link className="text-lg font-bold" href="/example/quotes">
				Redux 활용 Quotes 예제 보러가기
			</Link>
			<Link className="text-lg font-bold" href="/example/modal">
				모달 예제 보러가기
			</Link>
		</nav>
	);
};
