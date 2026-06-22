import { EvolutionChain } from "#/components/details/EvolutionChain"
import { usePokemonDetail } from "#/queries/detail"
import { getRouteApi } from "@tanstack/react-router"

const route = getRouteApi("/pokemon/$id")

export const Evolutions = () => {
	const { id } = route.useParams()
	const { variety, form } = route.useSearch()
	const { species } = usePokemonDetail(id, variety, form)

	return (
		<div>
			<EvolutionChain species={species} />
		</div>
	)
}
