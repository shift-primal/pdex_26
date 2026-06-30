import { useQueryClient } from "@tanstack/react-query"
import { formQueryOptions } from "#/queries/form"
import { speciesQueryOptions } from "#/queries/species"
import { varietyQueryOptions } from "#/queries/variety"

export function usePrefetchPokemon() {
	const queryClient = useQueryClient()
	return (name: string) => {
		queryClient.prefetchQuery(speciesQueryOptions(name))
		queryClient.prefetchQuery(formQueryOptions(name))
	}
}

export function usePrefetchVariety() {
	const queryClient = useQueryClient()
	return (name: string) => {
		queryClient.prefetchQuery(varietyQueryOptions(name))
	}
}
