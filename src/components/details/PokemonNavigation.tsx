import { Chip } from "#/components/Chip"
import { formatText } from "#/lib/format"
import type { Neighbors } from "#/queries/adjacent"

export const PokemonNavigation = ({ neighbors }: { neighbors: Neighbors }) => {
	return (
		<div className="flex justify-between w-full absolute top-1/2 -translate-y-1/2 px-64">
			<Chip
				to="/pokemon/$id"
				params={{ id: neighbors.prev.name }}
				search={(prev) => ({
					tab: prev.tab
				})}
				sprite={neighbors.prev.sprite}
				label={formatText(neighbors.prev.name)}
			/>
			<Chip
				to="/pokemon/$id"
				params={{ id: neighbors.next.name }}
				search={(prev) => ({
					tab: prev.tab
				})}
				sprite={neighbors.next.sprite}
				label={formatText(neighbors.next.name)}
			/>
		</div>
	)
}
