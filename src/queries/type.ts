import { queryOptions } from "@tanstack/react-query"
import { selectType } from "#/lib/parsers/pokemon.parser"
import { fetchType } from "#/services/api"

export function typeQueryOptions(url: string) {
	return queryOptions({
		queryKey: ["type", url],
		queryFn: () => fetchType(url),
		select: selectType,
		staleTime: Infinity
	})
}
