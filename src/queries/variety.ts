import { queryOptions } from "@tanstack/react-query"
import { selectVariety } from "#/lib/parsers/pokemon.parser"
import { fetchPokemon } from "#/services/api"
import type { Variety } from "#/types/pokemon"
import type { RawPokemon } from "#/types/raw/pokemon"

export function varietyQueryOptions(nameOrId: string) {
	return queryOptions<RawPokemon, Error, Variety>({
		queryKey: ["pokemon", "variety", nameOrId],
		queryFn: () => fetchPokemon(nameOrId),
		select: selectVariety,
		staleTime: Infinity
	})
}
