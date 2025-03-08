import { getQueryClient } from "@/lib/config/getQueryClient";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import Posts from "./Posts";
import { GET as getPostsHandler } from "@/app/api/example/post/route";

//NOTE - Axios, Tanstack Query, route handler를 이용하여 prefetch 구현한 예제
export default async function PostsPage() {
	console.log(
		`post 페이지 렌더링 환경: ${typeof window === "undefined" ? "서버" : "클라이언트"}`,
	);

	// 1. @tanstack/react-query의 useQueryClient()를 사용하지 않고 아래처럼 custom하게 만든 QueryClient를 사용합니다.
	const queryClient = getQueryClient();

	// 2. 그 다음, route.ts에서 prefetch할 함수 자체를 import 합니다.
	// 3. 해당 함수의 return 타입이 Promise<Something[]> 이런 식이면 queryFn에 바로 넣을 수 있는데
	//    현재는 NextResponse.json(data);로 통일하고 있어서 -> Promise<NextResponse<any>> 요런 타입이 넘어오게 됩니다.
	// 4. 그래서 useQuery의 queryFn에 Promise<Something[]> 타입의 값을 전달해주기 위해 아래처럼 래퍼 함수를 활용합니다.
	const getPosts = async () => {
		const response = await getPostsHandler();
		const data = await response.json();
		return data; // Post[] 배열 반환
	};
	// 5. prefetch 할 쿼리를 useQuery와 유사하게 prefetchQuery를 사용하여 아래처럼 작성합니다.
	await queryClient.prefetchQuery({
		queryKey: ["posts"],
		queryFn: getPosts,
	});

	// 6. @tanstack/react-query의 HydrationBoundary를 사용하여 아래와 같이 구성합니다.
	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<Posts />
		</HydrationBoundary>
	);
}
