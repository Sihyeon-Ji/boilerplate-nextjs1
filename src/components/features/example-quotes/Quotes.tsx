"use client";
import { useGetQuotesQuery } from "@/lib/features/quotes/quotesApiSlice";
import { useState } from "react";
import styles from "./Quotes.module.css";

const options = [5, 10, 20, 30];

export const Quotes = () => {
	console.log(
		`quotes 컴포넌트 렌더링 환경: ${typeof window === "undefined" ? "서버" : "클라이언트"}`,
	);
	const [numberOfQuotes, setNumberOfQuotes] = useState(10);
	//NOTE - tanstack query처럼 RTK의 쿼리 훅을 사용하면 자동으로 데이터를 가져오고 쿼리 값을 반환합니다
	const { data, isError, isLoading, isSuccess } =
		useGetQuotesQuery(numberOfQuotes);

	//NOTE - 오류 발생 시 오류 메시지 반환
	if (isError) {
		return (
			<div>
				<h1>비상!!! 오류 발생!</h1>
			</div>
		);
	}

	if (isLoading) {
		return (
			<div>
				<h1>로딩 중...</h1>
			</div>
		);
	}

	if (isSuccess) {
		return (
			<div className={styles.container}>
				<h3>Fetch할 인용구 수량을 선택하세요:</h3>
				<select
					className={styles.select}
					value={numberOfQuotes}
					onChange={(e) => {
						setNumberOfQuotes(Number(e.target.value));
					}}
				>
					{options.map((option) => (
						<option key={option} value={option}>
							{option}
						</option>
					))}
				</select>
				{data.quotes.map(({ author, quote, id }) => (
					<blockquote key={id}>
						&ldquo;{quote}&rdquo;
						<footer>
							<cite>{author}</cite>
						</footer>
					</blockquote>
				))}
			</div>
		);
	}

	return null;
};
