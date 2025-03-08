import { Counter } from "@/components/features/example-counter/Counter";

export default function VerifyPage() {
	console.log(
		`verify 페이지 렌더링 환경: ${typeof window === "undefined" ? "서버" : "클라이언트"}`,
	);
	return (
		<>
			<h1>확인 페이지</h1>
			<p>
				이 페이지는 Redux 상태가 페이지 이동 사이에서도 유지되는지 확인하기 위한
				페이지입니다.
			</p>
			<Counter />
		</>
	);
}
