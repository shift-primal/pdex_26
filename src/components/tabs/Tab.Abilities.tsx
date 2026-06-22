import { AbilityList } from "#/components/details/AbilitiesList"
import { TemporaryWrapper } from "#/components/TemporaryWrapper"
import { usePokemonDetail } from "#/queries/detail"
import { getRouteApi } from "@tanstack/react-router"

const route = getRouteApi("/pokemon/$id")

export const Abilities = () => {
	const { id } = route.useParams()
	const { variety, form } = route.useSearch()
	const { activeVariety } = usePokemonDetail(id, variety, form)

	return (
		<TemporaryWrapper title="Abilities">
			<AbilityList abilities={activeVariety.abilities} />
		</TemporaryWrapper>
	)
}
