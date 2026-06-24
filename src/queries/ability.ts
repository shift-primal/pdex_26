import { selectAbility } from "#/lib/parsers/pokemon.parser"
import { fetchAbility } from "#/services/api"
import { queryOptions } from "@tanstack/react-query"

export function abilityQueryOptions(url: string) {
	return queryOptions({
		queryKey: ["ability", url],
		queryFn: () => fetchAbility(url),
		select: selectAbility,
		staleTime: Infinity
	})
}
