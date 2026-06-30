import { queryOptions } from "@tanstack/react-query"
import { fetchPokemonList } from "#/services/api"

export function pokemonListQueryOptions() {
	return queryOptions({
		queryKey: ["pokemon", "list"],
		queryFn: () => fetchPokemonList(),
		staleTime: Number.POSITIVE_INFINITY
	})
}
