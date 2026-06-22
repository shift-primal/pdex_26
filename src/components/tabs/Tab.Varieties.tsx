import { VarietySwitcher } from "#/components/details/VarietySwitcher"
import { usePokemonDetail } from "#/queries/detail"
import { getRouteApi } from "@tanstack/react-router"

const route = getRouteApi("/pokemon/$id")

export const Varieties = () => {
	const { id } = route.useParams()
	const { variety, form } = route.useSearch()
	const { species, activeVariety } = usePokemonDetail(id, variety, form)

	return (
		<div>
			<VarietySwitcher species={species} activeVariety={activeVariety} />
		</div>
	)
}
