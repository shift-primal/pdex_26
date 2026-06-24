import { findAdjacentPokemon } from "#/lib/domain/pokemon.utils"
import { pokemonListQueryOptions } from "#/queries/list"
import { varietyQueryOptions } from "#/queries/variety"
import { useQueries, useSuspenseQuery } from "@tanstack/react-query"

export type Neighbor = { name: string; sprite: string | null }

export interface Neighbors {
	prev: Neighbor
	next: Neighbor
}

export function useAdjacentPokemon(speciesId: number): Neighbors {
	const { data: dexList } = useSuspenseQuery(pokemonListQueryOptions())
	const { prev, next } = findAdjacentPokemon(speciesId, dexList)

	const [prevQ, nextQ] = useQueries({
		queries: [prev, next].map((n) => varietyQueryOptions(n.name))
	})

	return {
		prev: { name: prev.name, sprite: prevQ.data?.sprites.front.default ?? null },
		next: { name: next.name, sprite: nextQ.data?.sprites.front.default ?? null }
	}
}
