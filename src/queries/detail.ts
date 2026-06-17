import { useSuspenseQueries, useSuspenseQuery } from "@tanstack/react-query"
import { findAdjacentPokemon } from "#/lib/domain/pokemon.utils"
import { formQueryOptions } from "#/queries/form"
import { pokemonListQueryOptions } from "#/queries/list"
import { speciesQueryOptions } from "#/queries/species"
import { varietyQueryOptions } from "#/queries/variety"

/**
 * Fetches + assembles everything the detail page needs for ONE pokemon.
 *
 * Only the active variety/form are fetched — full variety/form lists (switchers) and
 * evolution sprites are separate concerns, fetched lazily by the components that need them.
 * The evolution *names* are already on `species.evolution`, so no fetch is needed for them here.
 *
 * Fetch graph: [species, dexList] in parallel → variety (a cache hit for the default,
 * seeded by speciesQueryOptions) → form.
 */
export function usePokemonDetail(id: string, varietyName?: string, formName?: string) {
	const [{ data: species }, { data: dexList }] = useSuspenseQueries({
		queries: [speciesQueryOptions(id), pokemonListQueryOptions()]
	})

	const activeVarietyName =
		varietyName ?? species.varieties.find((v) => v.isDefault)?.name ?? species.varieties[0].name

	const { data: activeVariety } = useSuspenseQuery(varietyQueryOptions(activeVarietyName))

	// The default form is the first entry in the variety's forms list.
	const { data: activeForm } = useSuspenseQuery(formQueryOptions(formName ?? activeVariety.forms[0]))

	const adjacent = findAdjacentPokemon(species.id, dexList)

	return { species, activeVariety, activeForm, adjacent }
}
