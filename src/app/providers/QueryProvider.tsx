"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { getQueryClient } from "@/lib/config/getQueryClient";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export default function QueryProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const queryClient = getQueryClient();

	return (
		<QueryClientProvider client={queryClient}>
			{children}
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	);
}
