"use client";

import { useQuery } from "@tanstack/react-query";
import { GET as getPostsHandler } from "@/app/api/example/post/route";

type Post = {
	id: number;
	title: string;
	body: string;
};

//NOTE - Axios, Tanstack Query, route handler를 이용하여 prefetch 구현한 예제
export default function Posts() {
	// 1. 먼저 route.ts에서 prefetch할 함수 자체를 import 합니다.
	// 2. 해당 함수의 return 타입이 Promise<Something[]> 이런 식이면 queryFn에 바로 넣을 수 있는데
	//    현재는 NextResponse.json(data);로 통일하고 있어서 -> Promise<NextResponse<any>> 요런 타입이 넘어오게 됩니다.
	// 3. 그래서 useQuery의 queryFn에 Promise<Something[]> 타입의 값을 전달해주기 위해 아래처럼 래퍼 함수를 활용합니다.
	const getPosts = async () => {
		const response = await getPostsHandler();
		const data = await response.json();
		return data; // Post[] 배열 반환
	};
	// 4. 기존에 사용하던 대로 useQuery를 사용합니다.
	// 5. 주의할 점은 queryKey와 queryFn에 들어가는 내용이 상단 prefetch 설정을 한 부분과 동일해야 하는 것입니다.
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
