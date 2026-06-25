import { findAdjacentPokemon } from "#/lib/domain/pokemon.utils"
import { pokemonListQueryOptions } from "#/queries/list"
import { varietyQueryOptions } from "#/queries/variety"
import { useQueries, useSuspenseQuery } from "@tanstack/react-query"
import { useHydrated } from "@tanstack/react-router"

export type Neighbor = { name: string; sprite: string | null }

export interface Neighbors {
	prev: Neighbor
	next: Neighbor
}

export function useAdjacentPokemon(speciesId: number): Neighbors {
	const hydrated = useHydrated()
	const { data: dexList } = useSuspenseQuery(pokemonListQueryOptions())
	const { prev, next } = findAdjacentPokemon(speciesId, dexList)

	const [prevQ, nextQ] = useQueries({
		queries: [prev, next].map((n) => varietyQueryOptions(n.name))
	})

	return {
		prev: { name: prev.name, sprite: hydrated ? (prevQ.data?.sprites.front.default.normal ?? null) : null },
		next: { name: next.name, sprite: hydrated ? (nextQ.data?.sprites.front.default.normal ?? null) : null }
	}
}
