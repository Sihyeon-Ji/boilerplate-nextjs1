import { Counter } from "@/components/example/counter/Counter";
import Link from "next/link";

export default function VerifyPage() {
	return (
		<>
			<Link href="/">Home</Link>
			<h1>확인 페이지</h1>
			<p>
				이 페이지는 Redux 상태가 페이지 이동 사이에서도 유지되는지 확인하기 위한
				페이지입니다.
			</p>
			<Counter />
		</>
	);
}
