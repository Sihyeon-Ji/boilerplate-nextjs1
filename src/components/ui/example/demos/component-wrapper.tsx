"use client";

import * as React from "react";
import { cn } from "@/lib/utils/utils";

//ANCHOR - 컴포넌트 래퍼 컴포넌트
// 이 컴포넌트는 UI 컴포넌트 라이브러리나 디자인 시스템에서 컴포넌트 데모나 예제를 일관된 형식으로 보여주기 위한 목적으로 사용됩니다.
// 각 컴포넌트를 동일한 스타일의 컨테이너에 배치하여 시각적 일관성을 제공하고, 오류 처리 기능을 통해 안정성을 높입니다.

/**
 * UI 컴포넌트를 감싸는 스타일링된 컨테이너를 제공합니다
 * 테두리가 있는 카드 형태로 컴포넌트를 표시합니다
 * 상단에 컴포넌트 이름을 제목으로 표시하고, 아래에 실제 컴포넌트 내용을 렌더링합니다
 * 각 컴포넌트에 고유 ID와 data-name 속성을 부여합니다
 */
export function ComponentWrapper({
	className,
	name,
	children,
	...props
}: React.ComponentPropsWithoutRef<"div"> & { name: string }) {
	return (
		<ComponentErrorBoundary name={name}>
			<div
				id={name}
				data-name={name.toLowerCase()}
				className={cn(
					"flex w-full scroll-mt-16 flex-col rounded-lg border",
					className,
				)}
				{...props}
			>
				<div className="border-b px-4 py-3">
					<div className="text-sm font-medium">{getComponentName(name)}</div>
				</div>
				<div className="flex flex-1 items-center gap-2 p-4">{children}</div>
			</div>
		</ComponentErrorBoundary>
	);
}

/**
 * React의 Error Boundary 패턴을 구현한 오류 처리 컴포넌트입니다
 * 자식 컴포넌트에서 발생하는 오류를 캐치하여 처리합니다
 * 오류 발생 시 전체 UI가 깨지지 않고 오류 메시지만 표시합니다
 */
class ComponentErrorBoundary extends React.Component<
	{ children: React.ReactNode; name: string },
	{ hasError: boolean }
> {
	constructor(props: { children: React.ReactNode; name: string }) {
		super(props);
		this.state = { hasError: false };
	}

	static getDerivedStateFromError() {
		return { hasError: true };
	}

	componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
		console.error(`Error in component ${this.props.name}:`, error, errorInfo);
	}

	render() {
		if (this.state.hasError) {
			return (
				<div className="p-4 text-red-500">
					Something went wrong in component: {this.props.name}
				</div>
			);
		}

		return this.props.children;
	}
}

/**
 * getComponentName 유틸리티 함수
 * 케밥 케이스(kebab-case)로 된 컴포넌트 이름을 타이틀 케이스(Title Case)로 변환합니다
 * 예: "button-primary" → "Button Primary"
 */
function getComponentName(name: string) {
	// convert kebab-case to title case
	return name.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
}
