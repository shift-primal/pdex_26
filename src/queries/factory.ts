import { type QueryFunctionContext, queryOptions } from "@tanstack/react-query"

export function makeQueryOptions<TRaw, TSelected>(
	keyPrefix: readonly string[],
	queryFn: (id: string, context: QueryFunctionContext<readonly string[]>) => Promise<TRaw>,
	select: (raw: TRaw) => TSelected
) {
	return (id: string) =>
		queryOptions<TRaw, Error, TSelected, readonly string[]>({
			queryKey: [...keyPrefix, id],
			queryFn: (context) => queryFn(id, context),
			select,
			staleTime: Infinity
		})
}
