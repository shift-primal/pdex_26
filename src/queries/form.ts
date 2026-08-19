import { selectForm } from "#/lib/parsers/pokemon.parser"
import { makeQueryOptions } from "#/queries/factory"
import { fetchPokemonForm } from "#/services/api"

export const formQueryOptions = makeQueryOptions(
	["pokemon", "form"],
	(nameOrId) => fetchPokemonForm(nameOrId),
	selectForm
)
