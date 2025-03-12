import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	basePath: "/next",
	reactStrictMode: true,
	experimental: {
		// RSC (React Server Components) 스트리밍을 최적화
		optimizeServerReact: true,
	},
	// 보안상의 이유로 Next.js의 next/image 컴포넌트는 기본적으로 외부 도메인에서 이미지를 로드하는 것을 제한한다.
	// 이는 무작위 외부 사이트에서 이미지를 로드하여 발생할 수 있는 보안 위험을 방지하기 위함임.
	// 따라서 외부 도메인의 이미지를 로드하려면 다음과 같이 설정해야 한다.
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "ui.shadcn.com",
				port: "",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "images.unsplash.com",
				port: "",
				pathname: "/**",
			},
		],
	},
};

export default nextConfig;
