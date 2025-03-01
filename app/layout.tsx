import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { cn } from "@/lib/utils";
import { Analytics } from "@/components/ui/analytics";
import { ThemeProvider } from "@/app/providers";
import { Toaster } from "@/components/ui/sonner";
import { StoreProvider } from "@/app/providers";
import ModalProvider from "@/app/providers/ModalProvider";
import "@/app/styles/globals.css";

const META_THEME_COLORS = {
	light: "#ffffff",
	dark: "#09090b",
};

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

const siteConfig = {
	name: "Nextjs boilerplate",
	author: "sean",
	url: "https://ui.shadcn.com",
	ogImage: "https://ui.shadcn.com/og.jpg",
	description:
		"Next.js와 Redux Toolkit, Tailwind CSS, Shadcn/UI를 사용한 예제 애플리케이션",
	links: {
		twitter: "https://twitter.com/shadcn",
		github: "https://github.com/shadcn-ui/ui",
	},
};
export const metadata: Metadata = {
	title: {
		default: siteConfig.name,
		template: `%s - ${siteConfig.name}`,
	},
	metadataBase: new URL(siteConfig.url),
	description: siteConfig.description,
	keywords: [
		"Next.js",
		"React",
		"Redux",
		"Tailwind CSS",
		"Server Components",
		"Shadcn",
	],
	authors: [
		{
			name: siteConfig.author,
		},
	],
	creator: siteConfig.author,
	openGraph: {
		type: "website",
		locale: "ko_KR",
		url: siteConfig.url,
		title: siteConfig.name,
		description: siteConfig.description,
		siteName: siteConfig.name,
		images: [
			{
				url: siteConfig.ogImage,
				width: 1200,
				height: 630,
				alt: siteConfig.name,
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: siteConfig.name,
		description: siteConfig.description,
		images: [siteConfig.ogImage],
		creator: `@${siteConfig.author}`,
	},
	icons: {
		icon: "/favicon.ico",
		shortcut: "/favicon-16x16.png",
		apple: "/apple-touch-icon.png",
	},
	manifest: `${siteConfig.url}/site.webmanifest`,
};

export const viewport: Viewport = {
	themeColor: META_THEME_COLORS.light,
};

interface Props {
	readonly children: React.ReactNode;
}

export default function RootLayout({ children }: Props) {
	return (
		<html lang="ko" suppressHydrationWarning>
			<head>
				<script
					dangerouslySetInnerHTML={{
						__html: `
              try {
                if (localStorage.theme === 'dark' || ((!('theme' in localStorage) || localStorage.theme === 'system') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.querySelector('meta[name="theme-color"]').setAttribute('content', '${META_THEME_COLORS.dark}')
                }
              } catch (_) {}
            `,
					}}
				/>
			</head>
			<body
				className={cn(
					"bg-background overscroll-none font-sans antialiased",
					geistSans.variable,
					geistMono.variable,
				)}
			>
				<StoreProvider>
					<ThemeProvider
						attribute="class"
						defaultTheme="system"
						enableSystem
						disableTransitionOnChange
					>
						<ModalProvider>
							{children}
							<Toaster />
							<Analytics />
						</ModalProvider>
					</ThemeProvider>
				</StoreProvider>
			</body>
		</html>
	);
}
