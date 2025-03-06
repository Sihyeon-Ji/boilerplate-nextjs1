"use client";

import { useQuery } from "@tanstack/react-query";
import { GET as getPosts } from "@/app/api/post/route";

type Post = {
	id: number;
	title: string;
	body: string;
};

//NOTE - Axios, Tanstack Query, route handler를 이용하여 prefetch 구현한 예제
export default function Posts() {
	const { data, error, isLoading, isError } = useQuery<Post[]>({
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
						<h4> Title: {post.title}</h4> <p> Body: {post.body}</p>
					</div>
				))}
			</ul>
		</div>
	);
}
