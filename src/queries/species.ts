import { queryOptions } from "@tanstack/react-query"
import { selectSpecies } from "#/lib/parsers/pokemon.parser"
import { varietyQueryOptions } from "#/queries/variety"
import { fetchEvolutionChain, fetchGeneration, fetchPokemon, fetchSpecies } from "#/services/api"
import type { Species } from "#/types/pokemon"
import type { RawEvolutionChain } from "#/types/raw/evolution"
import type { RawGeneration } from "#/types/raw/generation"
import type { RawPokemon } from "#/types/raw/pokemon"
import type { RawSpecies } from "#/types/raw/species"

export function speciesQueryOptions(nameOrId: string) {
	return queryOptions<[RawPokemon, RawSpecies, RawEvolutionChain, RawGeneration], Error, Species>({
		queryKey: ["pokemon", "species", nameOrId],
		queryFn: async ({ client }) => {
			const pokemon = await fetchPokemon(nameOrId)
			client.setQueryData(varietyQueryOptions(pokemon.name).queryKey, pokemon)
			const species = await fetchSpecies(pokemon.species.url)
			const [evolution, generation] = await Promise.all([
				fetchEvolutionChain(species.evolution_chain.url),
				fetchGeneration(species.generation.url)
			])

			return [pokemon, species, evolution, generation]
		},
		select: selectSpecies,
		staleTime: Infinity
	})
}
