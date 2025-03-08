import { Quotes } from "@/components/features/example-quotes/Quotes";
import Link from "next/link";

export default function QuotesPage() {
	console.log(
		`quotes 페이지 렌더링 환경: ${typeof window === "undefined" ? "서버" : "클라이언트"}`,
	);
	return (
		<>
			<Link href="/">Home</Link>
			<h1>인용구 페이지</h1>
			<p>이 페이지는 RTK Query의 활용을 보여주기 위한 것입니다.</p>
			<Quotes />
		</>
	);
}
