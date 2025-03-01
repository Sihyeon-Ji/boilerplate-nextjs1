import { Quotes } from "@/components/example/quotes/Quotes";
import Link from "next/link";

export default function QuotesPage() {
	return (
		<>
			<Link href="/">Home</Link>
			<h1>인용구 페이지</h1>
			<p>이 페이지는 RTK Query의 활용을 보여주기 위한 것입니다.</p>
			<Quotes />
		</>
	);
}
