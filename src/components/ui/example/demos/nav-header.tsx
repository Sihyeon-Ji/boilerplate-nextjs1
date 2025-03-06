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
						<Link href="/example/counter">Redux 예제</Link>
					</NavigationMenuLink>
				</NavigationMenuItem>
				<NavigationMenuItem>
					<NavigationMenuLink
						asChild
						data-active={pathname === "/example/verify"}
					>
						<Link href="/example/verify">Redux 예제 검증</Link>
					</NavigationMenuLink>
				</NavigationMenuItem>
				<NavigationMenuItem>
					<NavigationMenuLink
						asChild
						data-active={pathname === "/example/quotes"}
					>
						<Link href="/example/quotes">Redux 활용 예제</Link>
					</NavigationMenuLink>
				</NavigationMenuItem>
				<NavigationMenuItem>
					<NavigationMenuLink
						asChild
						data-active={pathname === "/example/modal"}
					>
						<Link href="/example/modal">Modal 예제</Link>
					</NavigationMenuLink>
				</NavigationMenuItem>
				<NavigationMenuItem>
					<NavigationMenuLink
						asChild
						data-active={pathname === "/example/posts"}
					>
						<Link href="/example/posts">Posts 예제 tanstack query</Link>
					</NavigationMenuLink>
				</NavigationMenuItem>
				<NavigationMenuItem>
					<NavigationMenuLink
						asChild
						data-active={pathname === "/example/users"}
					>
						<Link href="/example/users">Users 예제 tanstack query</Link>
					</NavigationMenuLink>
				</NavigationMenuItem>
			</NavigationMenuList>
		</NavigationMenu>
	);
}
