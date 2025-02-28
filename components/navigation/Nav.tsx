"use client";

import Link from "next/link";

export const Nav = () => {
	return (
		<nav className="flex items-center gap-4">
			<Link className="text-lg font-bold" href="/">
				Home
			</Link>
			<Link className="text-lg font-bold" href="/verify">
				Verify
			</Link>
			<Link className="text-lg font-bold" href="/quotes">
				Quotes
			</Link>
		</nav>
	);
};
