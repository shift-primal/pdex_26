import { useSuspenseQueries, useSuspenseQuery } from "@tanstack/react-query"
import { findAdjacentPokemon } from "#/lib/domain/pokemon.utils"
import { formQueryOptions } from "#/queries/form"
import { pokemonListQueryOptions } from "#/queries/list"
import { speciesQueryOptions } from "#/queries/species"
import { varietyQueryOptions } from "#/queries/variety"

export function usePokemonDetail(id: string, varietyName?: string, formName?: string) {
	const [{ data: species }, { data: dexList }] = useSuspenseQueries({
		queries: [speciesQueryOptions(id), pokemonListQueryOptions()]
	})

	const requestedVariety =
		varietyName && species.varieties.some((v) => v.name === varietyName) ? varietyName : undefined
	const activeVarietyName =
		requestedVariety ??
		species.varieties.find((v) => v.isDefault)?.name ??
		species.varieties[0]?.name ??
		species.name

	const { data: activeVariety } = useSuspenseQuery(varietyQueryOptions(activeVarietyName))

	const requestedForm = formName && activeVariety.forms.includes(formName) ? formName : undefined
	const activeFormName = requestedForm ?? activeVariety.forms[0] ?? activeVariety.name
	const { data: activeForm } = useSuspenseQuery(formQueryOptions(activeFormName))

	const adjacent = findAdjacentPokemon(species.id, dexList)

	return { species, activeVariety, activeForm, adjacent }
}
