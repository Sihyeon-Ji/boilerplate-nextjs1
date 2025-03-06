import serverAPI from "@/lib/config/axiosServerInstance";

type Post = {
	userId: number;
	id: number;
	title: string;
	body: string;
};

// NOTE - nextjs fetch 사용
export async function getPosts(): Promise<Post[]> {
	console.log(
		`getPosts 요청 환경: ${typeof window === "undefined" ? "서버" : "클라이언트"}`,
	);
	const response = await fetch("https://jsonplaceholder.typicode.com/posts");
	return response.json();
}

// NOTE - axios 사용
export const getPostList = async () => {
	console.log(
		`getPostList 요청 환경: ${typeof window === "undefined" ? "서버" : "클라이언트"}`,
	);
	const response = await serverAPI.get<Post[]>(
		"https://jsonplaceholder.typicode.com/posts",
	);
	return response.data;
};
