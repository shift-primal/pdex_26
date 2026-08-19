import { selectVariety } from "#/lib/parsers/pokemon.parser"
import { makeQueryOptions } from "#/queries/factory"
import { fetchPokemon } from "#/services/api"

export const varietyQueryOptions = makeQueryOptions(
	["pokemon", "variety"],
	async (nameOrId, { client }) => {
		const pokemon = await fetchPokemon(nameOrId)
		if (pokemon.name !== nameOrId) {
			client.setQueryData(varietyQueryOptions(pokemon.name).queryKey, pokemon)
		}
		return pokemon
	},
	selectVariety
)
