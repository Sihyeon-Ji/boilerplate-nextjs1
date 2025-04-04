import { AppSidebar } from "@/components/ui/example/demos/app-sidebar";
import { ModeSwitcher } from "@/components/ui/example/demos/mode-switcher";
import { NavHeader } from "@/components/ui/example/demos/nav-header";
import { Separator } from "@/components/ui/separator";
import {
	SidebarInset,
	SidebarProvider,
	SidebarTrigger,
} from "@/components/ui/sidebar";
import { getCookie } from "@/hooks/useCookie";

export default async function AppLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	console.log(
		`app layout 렌더링 환경: ${typeof window === "undefined" ? "서버" : "클라이언트"}`,
	);
	const defaultOpen = (await getCookie("sidebar_state")) === "true";

	return (
		<SidebarProvider defaultOpen={defaultOpen}>
			<AppSidebar />
			<SidebarInset>
				<header className="bg-background sticky inset-x-0 top-0 isolate z-10 flex shrink-0 items-center gap-2 border-b">
					<div className="flex h-14 w-full items-center gap-2 px-4">
						<SidebarTrigger className="-ml-1.5" />
						<Separator
							orientation="vertical"
							className="mr-2 data-[orientation=vertical]:h-4"
						/>
						<NavHeader />
						<div className="ml-auto flex items-center gap-2">
							<ModeSwitcher />
						</div>
					</div>
				</header>
				{children}
			</SidebarInset>
		</SidebarProvider>
	);
}
