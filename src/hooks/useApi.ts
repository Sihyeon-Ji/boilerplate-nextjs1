"use client";

import { useQuery, useMutation } from "@tanstack/react-query";
import { getQueryClient } from "@/lib/config/getQueryClient";
import clientAPI from "@/lib/config/axiosClientInstance";

// 데이터 조회 훅
export function useApiGet<TResponse = any>(
	endpoint: string,
	params?: object,
	options?: any,
) {
	const queryKey = params ? [endpoint, params] : [endpoint];

	return useQuery<TResponse>({
		queryKey,
		queryFn: async () => {
			const response = await clientAPI.get(endpoint, { params });
			return response.data;
		},
		...options,
	});
}

// 단일 항목 조회 훅
export function useApiGetById<TResponse = any>(
	endpoint: string,
	id: string | number | null,
	options?: any,
) {
	return useQuery<TResponse>({
		queryKey: [endpoint, id],
		queryFn: async () => {
			if (!id) return null as any;
			const response = await clientAPI.get(`${endpoint}/${id}`);
			return response.data;
		},
		enabled: !!id,
		...options,
	});
}

// 데이터 생성 훅
export function useApiPost<TResponse = any, TRequest = any>(
	endpoint: string,
	options?: any,
) {
	const queryClient = getQueryClient();

	return useMutation<TResponse, Error, TRequest>({
		mutationFn: async (data: TRequest) => {
			const response = await clientAPI.post(endpoint, data);
			return response.data;
		},
		onSuccess: () => {
			// 성공 시 해당 엔드포인트 쿼리 무효화
			queryClient.invalidateQueries({ queryKey: [endpoint] });
		},
		...options,
	});
}

// 데이터 수정 훅
export function useApiPut<TResponse = any, TRequest = any>(
	endpoint: string,
	options?: any,
) {
	const queryClient = getQueryClient();

	return useMutation<TResponse, Error, { id: string | number; data: TRequest }>(
		{
			mutationFn: async ({
				id,
				data,
			}: {
				id: string | number;
				data: TRequest;
			}) => {
				const response = await clientAPI.put(`${endpoint}/${id}`, data);
				return response.data;
			},
			onSuccess: (
				_: TResponse,
				variables: { id: string | number; data: TRequest },
			) => {
				// 성공 시 해당 항목과 목록 쿼리 무효화
				queryClient.invalidateQueries({ queryKey: [endpoint, variables.id] });
				queryClient.invalidateQueries({ queryKey: [endpoint] });
			},
			...options,
		},
	);
}

// 데이터 부분 수정 훅
export function useApiPatch<TResponse = any, TRequest = any>(
	endpoint: string,
	options?: any,
) {
	const queryClient = getQueryClient();

	return useMutation<TResponse, Error, { id: string | number; data: TRequest }>(
		{
			mutationFn: async ({
				id,
				data,
			}: {
				id: string | number;
				data: TRequest;
			}) => {
				const response = await clientAPI.patch(`${endpoint}/${id}`, data);
				return response.data;
			},
			onSuccess: (
				_: TResponse,
				variables: { id: string | number; data: TRequest },
			) => {
				// 성공 시 해당 항목과 목록 쿼리 무효화
				queryClient.invalidateQueries({ queryKey: [endpoint, variables.id] });
				queryClient.invalidateQueries({ queryKey: [endpoint] });
			},
			...options,
		},
	);
}

// 데이터 삭제 훅
export function useApiDelete<TResponse = any>(endpoint: string, options?: any) {
	const queryClient = getQueryClient();

	return useMutation<TResponse, Error, string | number>({
		mutationFn: async (id: string | number) => {
			const response = await clientAPI.delete(`${endpoint}/${id}`);
			return response.data;
		},
		onSuccess: (_: TResponse, id: string | number) => {
			// 성공 시 해당 항목과 목록 쿼리 무효화
			queryClient.invalidateQueries({ queryKey: [endpoint, id] });
			queryClient.invalidateQueries({ queryKey: [endpoint] });
		},
		...options,
	});
}
