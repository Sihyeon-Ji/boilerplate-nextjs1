"use client";

import { useQuery } from "@tanstack/react-query";
import { getPosts } from "@/app/api/post/post";

export default function Posts() {
	const { data, error, isLoading, isError } = useQuery({
		queryKey: ["posts"],
		queryFn: getPosts,
	});

	if (isLoading) return <p> Loading...</p>;

	if (isError) return <p> Error: {(error as Error).message}</p>;

	return (
		<div className="grid min-h-screen grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 p-8 pb-20 sm:p-20">
			<h1>Posts</h1>
			<ul>
				{data?.map((post) => (
					<div key={post.id}>
						<h4> Title: {post.title}</h4> <p> Body: {post.body}</p>{" "}
					</div>
				))}
			</ul>
		</div>
	);
}
