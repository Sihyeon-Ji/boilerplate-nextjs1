import { QueryClient, isServer } from "@tanstack/react-query";

function makeQueryClient() {
	return new QueryClient({
		defaultOptions: {
			queries: {
				staleTime: 60 * 1000,
			},
		},
	});
}

// 중요! 지역변수로 선언하는 이유
let browserQueryClient: QueryClient | undefined = undefined;

export function getQueryClient() {
	if (isServer) {
		return makeQueryClient();
	} else {
		if (!browserQueryClient) browserQueryClient = makeQueryClient();
		return browserQueryClient;
	}
}
