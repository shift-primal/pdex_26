import { queryOptions } from "@tanstack/react-query"
import { selectVariety } from "#/lib/parsers/pokemon.parser"
import { fetchPokemon } from "#/services/api"
import type { Variety } from "#/types/pokemon"
import type { RawPokemon } from "#/types/raw/pokemon"

export function varietyQueryOptions(nameOrId: string) {
	return queryOptions<RawPokemon, Error, Variety>({
		queryKey: ["pokemon", "variety", nameOrId],
		queryFn: async ({ client }) => {
			const pokemon = await fetchPokemon(nameOrId)
			if (pokemon.name !== nameOrId) {
				client.setQueryData(varietyQueryOptions(pokemon.name).queryKey, pokemon)
			}
			return pokemon
		},
		select: selectVariety,
		staleTime: Infinity
	})
}
