import { Counter } from "@/components/features/example-counter/Counter";

export default function CounterPage() {
	console.log(
		`counter 페이지 렌더링 환경: ${typeof window === "undefined" ? "서버" : "클라이언트"}`,
	);
	return (
		<>
			<h1>Redux 예제 페이지</h1>
			<Counter />
		</>
	);
}
