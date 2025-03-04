import { Counter } from "@/components/example/counter/Counter";
import { Nav } from "@/components/example/navigation/Nav";
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

export default function SinkPage() {
	return (
		<div className="grid flex-1 gap-4 p-4">
			<Nav />
			<main>
				<Counter />
			</main>
			<ComponentWrapper name="chart" className="w-full">
				<ChartDemo />
			</ComponentWrapper>
			<ComponentWrapper name="accordion">
				<AccordionDemo />
			</ComponentWrapper>
			<ComponentWrapper name="alert">
				<AlertDemo />
			</ComponentWrapper>
			<ComponentWrapper name="alert-dialog">
				<AlertDialogDemo />
			</ComponentWrapper>
			<ComponentWrapper name="aspect-ratio">
				<AspectRatioDemo />
			</ComponentWrapper>
			<ComponentWrapper name="avatar">
				<AvatarDemo />
			</ComponentWrapper>
			<ComponentWrapper name="badge">
				<BadgeDemo />
			</ComponentWrapper>
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
		</div>
	);
}
