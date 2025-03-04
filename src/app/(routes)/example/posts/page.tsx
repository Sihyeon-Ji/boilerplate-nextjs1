import { getPostList } from "@/app/api/post/post";
import { getQueryClient } from "@/lib/config/getQueryClient";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import Posts from "./Posts";

export default async function PostsPage() {
	const queryClient = getQueryClient();

	await queryClient.prefetchQuery({
		queryKey: ["posts"],
		queryFn: getPostList,
	});

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<Posts />
		</HydrationBoundary>
	);
}
