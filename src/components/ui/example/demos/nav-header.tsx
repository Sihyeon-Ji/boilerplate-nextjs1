"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
} from "@/components/ui/navigation-menu";

export function NavHeader() {
	const pathname = usePathname();

	return (
		<NavigationMenu>
			<NavigationMenuList className="gap-2 *:data-[slot=navigation-menu-item]:h-7 **:data-[slot=navigation-menu-link]:py-1 **:data-[slot=navigation-menu-link]:font-medium">
				<NavigationMenuItem>
					<NavigationMenuLink asChild data-active={pathname === "/"}>
						<Link href="/">Home</Link>
					</NavigationMenuLink>
				</NavigationMenuItem>
				<NavigationMenuItem>
					<NavigationMenuLink
						asChild
						data-active={pathname === "/example/counter"}
					>
						<Link href="/example/counter">Redux 예제 (counter)</Link>
					</NavigationMenuLink>
				</NavigationMenuItem>
				<NavigationMenuItem>
					<NavigationMenuLink
						asChild
						data-active={pathname === "/example/verify"}
					>
						<Link href="/example/verify">Redux 예제 검증 (verify)</Link>
					</NavigationMenuLink>
				</NavigationMenuItem>
				<NavigationMenuItem>
					<NavigationMenuLink
						asChild
						data-active={pathname === "/example/quotes"}
					>
						<Link href="/example/quotes">Redux rtk query 예제 (quotes)</Link>
					</NavigationMenuLink>
				</NavigationMenuItem>
				<NavigationMenuItem>
					<NavigationMenuLink
						asChild
						data-active={pathname === "/example/modal"}
					>
						<Link href="/example/modal">Modal 예제 (modal)</Link>
					</NavigationMenuLink>
				</NavigationMenuItem>
				<NavigationMenuItem>
					<NavigationMenuLink
						asChild
						data-active={pathname === "/example/users"}
					>
						<Link href="/example/users">
							axios + tanstack query + route handler 예제 (users)
						</Link>
					</NavigationMenuLink>
				</NavigationMenuItem>
				<NavigationMenuItem>
					<NavigationMenuLink
						asChild
						data-active={pathname === "/example/posts"}
					>
						<Link href="/example/posts">prefetch 예제 (post)</Link>
					</NavigationMenuLink>
				</NavigationMenuItem>
				<NavigationMenuItem>
					<NavigationMenuLink
						asChild
						data-active={pathname === "/example/storage"}
					>
						<Link href="/example/storage">browser storage 예제 (storage)</Link>
					</NavigationMenuLink>
				</NavigationMenuItem>
			</NavigationMenuList>
		</NavigationMenu>
	);
}
