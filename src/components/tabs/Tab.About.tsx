import { TemporaryWrapper } from "#/components/TemporaryWrapper"
import { usePokemonDetail } from "#/queries/detail"
import { getRouteApi } from "@tanstack/react-router"

const route = getRouteApi("/pokemon/$id")

export const About = () => {
	const { id } = route.useParams()
	const { variety, form } = route.useSearch()
	const { species, activeVariety } = usePokemonDetail(id, variety, form)

	return (
		<TemporaryWrapper title="About">
			<p>{activeVariety.weight}</p>
			<p>{activeVariety.height}</p>
			<p>{species.habitat}</p>
		</TemporaryWrapper>
	)
}
