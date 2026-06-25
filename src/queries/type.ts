import { selectType } from "#/lib/parsers/pokemon.parser"
import { fetchType } from "#/services/api"
import { queryOptions } from "@tanstack/react-query"

export function typeQueryOptions(url: string) {
	return queryOptions({
		queryKey: ["type", url],
		queryFn: () => fetchType(url),
		select: selectType,
		staleTime: Infinity
	})
}
