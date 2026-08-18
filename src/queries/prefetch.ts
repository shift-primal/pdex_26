import { useQueryClient } from "@tanstack/react-query"
import { speciesQueryOptions } from "#/queries/species"
import { varietyQueryOptions } from "#/queries/variety"

export function usePrefetchPokemon() {
	const queryClient = useQueryClient()
	return (name: string) => {
		queryClient.prefetchQuery(speciesQueryOptions(name))
		queryClient.prefetchQuery(varietyQueryOptions(name))
	}
}

export function usePrefetchVariety() {
	const queryClient = useQueryClient()
	return (name: string) => {
		queryClient.prefetchQuery(varietyQueryOptions(name))
	}
}
