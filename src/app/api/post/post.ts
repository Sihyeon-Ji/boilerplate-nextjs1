// export async function getPosts() {
// 	await new Promise((resolve) => setTimeout(resolve, 1000));
// 	return [
// 		{ id: 1, title: "Post 1" },
// 		{ id: 2, title: "Post 2" },
// 	];
// }

type Post = {
	userId: number;
	id: number;
	title: string;
	body: string;
};
export async function getPosts(): Promise<Post[]> {
	const response = await fetch("https://jsonplaceholder.typicode.com/posts");
	return response.json();
}
