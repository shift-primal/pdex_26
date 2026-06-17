import { useQueries } from "@tanstack/react-query"
import { createFileRoute } from "@tanstack/react-router"
import { searchPokemonSchema } from "#/lib/schemas/searchPokemon"
import { usePokemonList } from "#/queries/list"
import { varietyQueryOptions } from "#/queries/variety"

const Pokedex = () => {
	const search = Route.useSearch()
	const { data: pokemonList } = usePokemonList(search)

	const pokemonQueries = useQueries({
		queries: pokemonList.results.map((p) => varietyQueryOptions(p.name))
	})

	const data = {
		total: pokemonList.total,
		results: pokemonQueries.map((q) => q.data).filter(Boolean)
	}

	return <pre>{JSON.stringify(data, null, 2)}</pre>
}

export const Route = createFileRoute("/pokemon/")({
	component: Pokedex,
	validateSearch: searchPokemonSchema
})
