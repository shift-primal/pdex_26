import { useSuspenseQuery } from "@tanstack/react-query"
import { defaultVarietyName } from "#/lib/domain/pokemon.utils"
import { formQueryOptions } from "#/queries/form"
import { speciesQueryOptions } from "#/queries/species"
import { varietyQueryOptions } from "#/queries/variety"
import { getRouteApi } from "@tanstack/react-router"

const route = getRouteApi("/pokemon/$id")

export function usePokemonDetail(id: string, varietyName?: string, formName?: string) {
	const { data: species } = useSuspenseQuery(speciesQueryOptions(id))

	const requestedVariety =
		varietyName && species.varieties.some((v) => v.name === varietyName) ? varietyName : undefined
	const activeVarietyName =
		requestedVariety ?? defaultVarietyName(species) ?? species.varieties[0]?.name ?? species.name

	const { data: activeVariety } = useSuspenseQuery(varietyQueryOptions(activeVarietyName))

	const requestedForm = formName && activeVariety.forms.includes(formName) ? formName : undefined
	const activeFormName = requestedForm ?? activeVariety.forms[0] ?? activeVariety.name
	const { data: activeForm } = useSuspenseQuery(formQueryOptions(activeFormName))

	return { species, activeVariety, activeForm }
}

export const usePokemonDetailFromRoute = () => {
	const { id } = route.useParams()
	const { variety, form } = route.useSearch()
	return usePokemonDetail(id, variety, form)
}
