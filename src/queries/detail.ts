import { useSuspenseQueries } from "@tanstack/react-query"
import { findAdjacentPokemon } from "#/lib/domain/pokemon.utils"
import { formQueryOptions } from "#/queries/form"
import { pokemonListQueryOptions } from "#/queries/list"
import { speciesQueryOptions } from "#/queries/species"
import { varietyQueryOptions } from "#/queries/variety"

export function usePokemonDetail(id: string, varietyName?: string, formName?: string) {
	const [{ data: species }, { data: dexList }] = useSuspenseQueries({
		queries: [speciesQueryOptions(id), pokemonListQueryOptions()]
	})

	const activeVarietyName =
		varietyName ?? species.varieties.find((v) => v.isDefault)?.name ?? species.varieties[0]?.name ?? species.name

	// A variety's default form shares its name, so the form name is resolvable from the variety
	// name alone — no need to wait on the variety payload. This lets variety + form fetch in
	// parallel instead of as a species → variety → form waterfall.
	const activeFormName = formName ?? activeVarietyName

	const [{ data: activeVariety }, { data: activeForm }] = useSuspenseQueries({
		queries: [varietyQueryOptions(activeVarietyName), formQueryOptions(activeFormName)]
	})

	const adjacent = findAdjacentPokemon(species.id, dexList)

	return { species, activeVariety, activeForm, adjacent }
}
