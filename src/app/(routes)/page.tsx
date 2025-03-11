import { Suspense } from "react";
import { AsyncComponent } from "@/components/features/example-async-component-simulator/async-component";
import { Skeleton } from "@/components/ui/skeleton";
import { DataFetchingDemo } from "@/components/ui/example/demos/data-fetching-demo";
import { AccordionDemo } from "@/components/ui/example/demos/accordion-demo";
import { AlertDemo } from "@/components/ui/example/demos/alert-demo";
import { AlertDialogDemo } from "@/components/ui/example/demos/alert-dialog-demo";
import { AspectRatioDemo } from "@/components/ui/example/demos/aspect-ratio-demo";
import { AvatarDemo } from "@/components/ui/example/demos/avatar-demo";
import { BadgeDemo } from "@/components/ui/example/demos/badge-demo";
import { BreadcrumbDemo } from "@/components/ui/example/demos/breadcrumb-demo";
import { ButtonDemo } from "@/components/ui/example/demos/button-demo";
import { CalendarDemo } from "@/components/ui/example/demos/calendar-demo";
import { CardDemo } from "@/components/ui/example/demos/card-demo";
import { CarouselDemo } from "@/components/ui/example/demos/carousel-demo";
import { ChartDemo } from "@/components/ui/example/demos/chart-demo";
import { CheckboxDemo } from "@/components/ui/example/demos/checkbox-demo";
import { CollapsibleDemo } from "@/components/ui/example/demos/collapsible-demo";
import { ComboboxDemo } from "@/components/ui/example/demos/combobox-demo";
import { CommandDemo } from "@/components/ui/example/demos/command-demo";
import { ComponentWrapper } from "@/components/ui/example/demos/component-wrapper";
import { ContextMenuDemo } from "@/components/ui/example/demos/context-menu-demo";
import { DatePickerDemo } from "@/components/ui/example/demos/date-picker-demo";
import { DialogDemo } from "@/components/ui/example/demos/dialog-demo";
import { DrawerDemo } from "@/components/ui/example/demos/drawer-demo";
import { DropdownMenuDemo } from "@/components/ui/example/demos/dropdown-menu-demo";
import { FormDemo } from "@/components/ui/example/demos/form-demo";
import { HoverCardDemo } from "@/components/ui/example/demos/hover-card-demo";
import { InputDemo } from "@/components/ui/example/demos/input-demo";
import { InputOTPDemo } from "@/components/ui/example/demos/input-otp-demo";
import { LabelDemo } from "@/components/ui/example/demos/label-demo";
import { MenubarDemo } from "@/components/ui/example/demos/menubar-demo";
import { NavigationMenuDemo } from "@/components/ui/example/demos/navigation-menu-demo";
import { PaginationDemo } from "@/components/ui/example/demos/pagination-demo";
import { PopoverDemo } from "@/components/ui/example/demos/popover-demo";
import { ProgressDemo } from "@/components/ui/example/demos/progress-demo";
import { RadioGroupDemo } from "@/components/ui/example/demos/radio-group-demo";
import { ResizableDemo } from "@/components/ui/example/demos/resizable-demo";
import { ScrollAreaDemo } from "@/components/ui/example/demos/scroll-area-demo";
import { SelectDemo } from "@/components/ui/example/demos/select-demo";
import { SeparatorDemo } from "@/components/ui/example/demos/separator-demo";
import { SheetDemo } from "@/components/ui/example/demos/sheet-demo";
import { SkeletonDemo } from "@/components/ui/example/demos/skeleton-demo";
import { SliderDemo } from "@/components/ui/example/demos/slider-demo";
import { SonnerDemo } from "@/components/ui/example/demos/sonner-demo";
import { SwitchDemo } from "@/components/ui/example/demos/switch-demo";
import { TableDemo } from "@/components/ui/example/demos/table-demo";
import { TabsDemo } from "@/components/ui/example/demos/tabs-demo";
import { TextareaDemo } from "@/components/ui/example/demos/textarea-demo";
import { ToggleDemo } from "@/components/ui/example/demos/toggle-demo";
import { ToggleGroupDemo } from "@/components/ui/example/demos/toggle-group-demo";
import { TooltipDemo } from "@/components/ui/example/demos/tooltip-demo";

// 주요 컴포넌트의 로딩 상태를 표시하는 Fallback 컴포넌트
function ComponentFallback() {
	return (
		<div className="w-full space-y-3">
			<Skeleton className="h-6 w-40" />
			<Skeleton className="h-20 w-full rounded-md" />
		</div>
	);
}

// 포스트 목록의 로딩 상태를 표시하는 Fallback 컴포넌트
// 이와 같이 컴포넌트 모양에 맞춰서 Fallback 컴포넌트를 구성하는 것이 사용자 경험을 높이는 데 도움이 될 수 있습니다.
function PostsFallback() {
	return (
		<div className="grid gap-4 md:grid-cols-3">
			{Array(3)
				.fill(null)
				.map((_, i) => (
					<div key={i} className="space-y-3 rounded-lg border p-4">
						<Skeleton className="h-6 w-3/4" />
						<Skeleton className="h-4 w-1/3" />
						<Skeleton className="h-16 w-full" />
					</div>
				))}
		</div>
	);
}

export default function MainPage() {
	console.log(
		`main 페이지 렌더링 환경: ${typeof window === "undefined" ? "서버" : "클라이언트"}`,
	);
	return (
		<div className="grid flex-1 gap-4 p-4">
			{/* 서버에서 데이터 페칭을 완료 후 클라이언트에 전달하는 예시 - 비동기 데이터 로딩 및 스트리밍 */}
			<div className="space-y-4">
				<h2 className="text-2xl font-bold">
					Next.js Loading UI & Streaming 예제
				</h2>
				<Suspense fallback={<PostsFallback />}>
					<DataFetchingDemo />
				</Suspense>
			</div>
			{/* 데이터 페칭 없이도 컴포넌트 자체가 무거워서 렌더링이 오래 걸리는 예시 
			    상단에서부터 순서대로 로드가 되었다고 가정하고 구성해보았음. */}
			<Suspense fallback={<ComponentFallback />}>
				<AsyncComponent name="chart" delayMs={500}>
					<ComponentWrapper name="chart" className="w-full">
						<ChartDemo />
					</ComponentWrapper>
				</AsyncComponent>
			</Suspense>
			<Suspense fallback={<ComponentFallback />}>
				<AsyncComponent name="chart" delayMs={1000}>
					<ComponentWrapper name="chart" className="w-full">
						<AccordionDemo />
					</ComponentWrapper>
				</AsyncComponent>
			</Suspense>
			<Suspense fallback={<ComponentFallback />}>
				<AsyncComponent name="chart" delayMs={1500}>
					<ComponentWrapper name="chart" className="w-full">
						<AlertDemo />
					</ComponentWrapper>
				</AsyncComponent>
			</Suspense>
			<Suspense fallback={<ComponentFallback />}>
				<AsyncComponent name="chart" delayMs={2000}>
					<ComponentWrapper name="chart" className="w-full">
						<AlertDialogDemo />
					</ComponentWrapper>
				</AsyncComponent>
			</Suspense>

			{/* 컴포넌트들을 그룹화하여 로드할 수도 있음 */}
			<Suspense fallback={<ComponentFallback />}>
				<AsyncComponent name="forms group" delayMs={2500}>
					<ComponentWrapper name="aspect-ratio">
						<AspectRatioDemo />
					</ComponentWrapper>
					<ComponentWrapper name="avatar">
						<AvatarDemo />
					</ComponentWrapper>
					<ComponentWrapper name="badge">
						<BadgeDemo />
					</ComponentWrapper>
				</AsyncComponent>
			</Suspense>

			{/* 나머지 컴포넌트들은 로드하는 데에 시간이 오래걸린다고 가정하고 의도적으로 위치를 하단에 둠 */}
			<Suspense
				fallback={
					<div className="space-y-4">
						{Array(20)
							.fill(null)
							.map((_, i) => (
								<ComponentFallback key={i} />
							))}
					</div>
				}
			>
				<AsyncComponent name="remaining components" delayMs={3000}>
					<ComponentWrapper name="breadcrumb">
						<BreadcrumbDemo />
					</ComponentWrapper>
					<ComponentWrapper name="button">
						<ButtonDemo />
					</ComponentWrapper>
					<ComponentWrapper name="calendar">
						<CalendarDemo />
					</ComponentWrapper>
					<ComponentWrapper name="card">
						<CardDemo />
					</ComponentWrapper>
					<ComponentWrapper name="carousel" className="hidden md:flex">
						<CarouselDemo />
					</ComponentWrapper>
					<ComponentWrapper name="checkbox">
						<CheckboxDemo />
					</ComponentWrapper>
					<ComponentWrapper name="collapsible">
						<CollapsibleDemo />
					</ComponentWrapper>
					<ComponentWrapper name="combobox">
						<ComboboxDemo />
					</ComponentWrapper>
					<ComponentWrapper name="command">
						<CommandDemo />
					</ComponentWrapper>
					<ComponentWrapper name="context-menu">
						<ContextMenuDemo />
					</ComponentWrapper>
					<ComponentWrapper name="date-picker">
						<DatePickerDemo />
					</ComponentWrapper>
					<ComponentWrapper name="dialog">
						<DialogDemo />
					</ComponentWrapper>
					<ComponentWrapper name="drawer">
						<DrawerDemo />
					</ComponentWrapper>
					<ComponentWrapper name="dropdown-menu">
						<DropdownMenuDemo />
					</ComponentWrapper>
					<ComponentWrapper name="form">
						<FormDemo />
					</ComponentWrapper>
					<ComponentWrapper name="hover-card">
						<HoverCardDemo />
					</ComponentWrapper>
					<ComponentWrapper name="input">
						<InputDemo />
					</ComponentWrapper>
					<ComponentWrapper name="input-otp">
						<InputOTPDemo />
					</ComponentWrapper>
					<ComponentWrapper name="label">
						<LabelDemo />
					</ComponentWrapper>
					<ComponentWrapper name="menubar">
						<MenubarDemo />
					</ComponentWrapper>
					<ComponentWrapper name="navigation-menu">
						<NavigationMenuDemo />
					</ComponentWrapper>
					<ComponentWrapper name="pagination">
						<PaginationDemo />
					</ComponentWrapper>
					<ComponentWrapper name="popover">
						<PopoverDemo />
					</ComponentWrapper>
					<ComponentWrapper name="progress">
						<ProgressDemo />
					</ComponentWrapper>
					<ComponentWrapper name="radio-group">
						<RadioGroupDemo />
					</ComponentWrapper>
					<ComponentWrapper name="resizable">
						<ResizableDemo />
					</ComponentWrapper>
					<ComponentWrapper name="scroll-area">
						<ScrollAreaDemo />
					</ComponentWrapper>
					<ComponentWrapper name="select">
						<SelectDemo />
					</ComponentWrapper>
					<ComponentWrapper name="separator">
						<SeparatorDemo />
					</ComponentWrapper>
					<ComponentWrapper name="sheet">
						<SheetDemo />
					</ComponentWrapper>
					<ComponentWrapper name="skeleton">
						<SkeletonDemo />
					</ComponentWrapper>
					<ComponentWrapper name="slider">
						<SliderDemo />
					</ComponentWrapper>
					<ComponentWrapper name="sonner">
						<SonnerDemo />
					</ComponentWrapper>
					<ComponentWrapper name="switch">
						<SwitchDemo />
					</ComponentWrapper>
					<ComponentWrapper name="table">
						<TableDemo />
					</ComponentWrapper>
					<ComponentWrapper name="tabs">
						<TabsDemo />
					</ComponentWrapper>
					<ComponentWrapper name="textarea">
						<TextareaDemo />
					</ComponentWrapper>
					<ComponentWrapper name="toggle">
						<ToggleDemo />
					</ComponentWrapper>
					<ComponentWrapper name="toggle-group">
						<ToggleGroupDemo />
					</ComponentWrapper>
					<ComponentWrapper name="tooltip">
						<TooltipDemo />
					</ComponentWrapper>
				</AsyncComponent>
			</Suspense>
		</div>
	);
}
