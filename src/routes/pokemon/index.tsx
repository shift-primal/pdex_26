import { createFileRoute } from "@tanstack/react-router"
import { ErrorState } from "#/components/feedback/ErrorState"
import { Pokedex } from "#/components/list/Pokedex"
import { searchPokemonSchema } from "#/lib/schemas/searchPokemon"

export const Route = createFileRoute("/pokemon/")({
	component: Pokedex,
	validateSearch: searchPokemonSchema,
	errorComponent: ({ error, reset }) => (
		<ErrorState error={error} reset={reset} eyebrow="Error" title="Couldn’t load the dex" />
	)
})
