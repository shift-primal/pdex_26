import { TemporaryWrapper } from "#/components/TemporaryWrapper"
import { usePokemonDetail } from "#/queries/detail"
import { getRouteApi } from "@tanstack/react-router"

const route = getRouteApi("/pokemon/$id")

export const Stats = () => {
	const { id } = route.useParams()
	const { variety, form } = route.useSearch()
	const { activeVariety } = usePokemonDetail(id, variety, form)

	return (
		<TemporaryWrapper title="Stats">
			<ul className="w-full">
				{activeVariety.stats.map((s) => (
					<li key={s.name} className="flex justify-between border-b py-1 text-sm">
						<span>{s.name}</span>
						<span className="font-medium">{s.value}</span>
					</li>
				))}
			</ul>
		</TemporaryWrapper>
	)
}
