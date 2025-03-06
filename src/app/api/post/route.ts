import serverAPI from "@/lib/config/axiosServerInstance";

type Post = {
	userId: number;
	id: number;
	title: string;
	body: string;
};

export async function GET() {
	console.log(
		`post 요청이 어디에서 일어났을까용? : ${typeof window === "undefined" ? "서버" : "클라이언트"}`,
	);

	// NOTE - nextjs fetch 사용
	// const response = await fetch("https://jsonplaceholder.typicode.com/posts");
	// return response.json();

	// NOTE - axios 사용
	const response = await serverAPI.get<Post[]>(
		"https://jsonplaceholder.typicode.com/posts",
	);
	return response.data;
}
