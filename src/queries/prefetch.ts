import { formQueryOptions } from "#/queries/form"
import { speciesQueryOptions } from "#/queries/species"
import { varietyQueryOptions } from "#/queries/variety"
import { useQueryClient } from "@tanstack/react-query"

export function usePrefetchPokemon() {
	const queryClient = useQueryClient()
	return (name: string) => {
		// console.log("Prefetching Pokemon:", name)
		queryClient.prefetchQuery(speciesQueryOptions(name))
		queryClient.prefetchQuery(formQueryOptions(name))
	}
}

export function usePrefetchVariety() {
	const queryClient = useQueryClient()
	return (name: string) => {
		// console.log("Prefetching Variety:", name)
		queryClient.prefetchQuery(varietyQueryOptions(name))
	}
}
