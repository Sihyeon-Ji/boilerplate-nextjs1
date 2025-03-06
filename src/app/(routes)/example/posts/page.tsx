import { GET as getPosts } from "@/app/api/post/route";
import { getQueryClient } from "@/lib/config/getQueryClient";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import Posts from "./Posts";

//NOTE - Axios, Tanstack Query, route handler를 이용하여 prefetch 구현한 예제
export default async function PostsPage() {
	const queryClient = getQueryClient();

	await queryClient.prefetchQuery({
		queryKey: ["posts"],
		queryFn: getPosts,
	});

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<Posts />
		</HydrationBoundary>
	);
}
