import { delay } from "@/lib/utils/utils";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

// 가상의 데이터 타입
interface Post {
	id: number;
	title: string;
	content: string;
	createdAt: string;
}

// 가상의 API에서 데이터를 가져오는 비동기 함수
async function fetchPosts(): Promise<Post[]> {
	// 실제로는 fetch 함수를 사용하여 API에서 데이터를 가져옵니다
	// 여기서는 데이터 가져오기를 시뮬레이션합니다
	await delay(2000);

	// 가상의 데이터를 반환합니다
	return [
		{
			id: 1,
			title: "Next.js 15의 새로운 기능",
			content:
				"Next.js 15에서는 React의 스트리밍과 서스펜스를 더욱 활용하기 쉬워졌습니다.",
			createdAt: "2024-05-10",
		},
		{
			id: 2,
			title: "스트리밍으로 사용자 경험 개선하기",
			content:
				"점진적 렌더링을 통해 사용자는 모든 콘텐츠가 로드될 때까지 기다릴 필요가 없습니다.",
			createdAt: "2024-05-15",
		},
		{
			id: 3,
			title: "병렬 라우팅의 활용",
			content:
				"병렬 라우팅을 사용하면 여러 경로의 콘텐츠를 독립적으로 스트리밍할 수 있습니다.",
			createdAt: "2024-05-20",
		},
	];
}

// 비동기 컴포넌트: 이 컴포넌트는 서버에서 렌더링되고 클라이언트로 스트리밍됩니다
export async function DataFetchingDemo() {
	console.log(
		`DataFetchingDemo 컴포넌트 렌더링 환경: ${typeof window === "undefined" ? "서버" : "클라이언트"}`,
	);
	console.log("DataFetchingDemo 데이터 가져오기 시작...");
	const posts = await fetchPosts();
	console.log("DataFetchingDemo 데이터 가져오기 완료!");

	return (
		<div className="grid gap-4 md:grid-cols-3">
			{posts.map((post) => (
				<Card key={post.id}>
					<CardHeader>
						<CardTitle>{post.title}</CardTitle>
						<CardDescription>{post.createdAt}</CardDescription>
					</CardHeader>
					<CardContent>
						<p>{post.content}</p>
					</CardContent>
				</Card>
			))}
		</div>
	);
}
