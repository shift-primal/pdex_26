import { useSuspenseQueries } from "@tanstack/react-query"
import { flattenEvolutions } from "#/lib/domain/evolution.utils"
import { varietyQueryOptions } from "#/queries/variety"
import type { PokemonEvolutionChainLink, Species } from "#/types/pokemon"
import { ArrowDownIcon, ArrowRightIcon } from "@phosphor-icons/react"
import { TemporaryWrapper } from "#/components/TemporaryWrapper"
import { Chip } from "#/components/Chip"
import { formatText } from "#/lib/format"

type SpriteMap = Map<string, string | undefined>
type Direction = "row" | "col"

const EvolutionTree = ({
	node,
	spriteMap,
	dir
}: {
	node: PokemonEvolutionChainLink
	spriteMap: SpriteMap
	dir: Direction
}) => {
	const children = node.evolvesTo

	return (
		<div className={dir === "row" ? "flex items-center gap-2" : "flex flex-col items-center gap-2"}>
			<Chip
				to="/pokemon/$id"
				params={{ id: node.name }}
				search={{ tab: "about" }}
				sprite={spriteMap.get(node.name)}
				label={formatText(node.name)}
			/>

			{children.length > 0 && (
				<>
					{dir === "row" ? <ArrowRightIcon /> : <ArrowDownIcon />}

					{/* children branch out based on dir; a vertical in row mode, a horizontal in col mode */}
					<div
						className={
							dir === "row" ? "flex flex-wrap flex-col gap-6" : "flex flex-wrap justify-center gap-6"
						}
					>
						{children.map((child) => (
							<EvolutionTree key={child.name} node={child} spriteMap={spriteMap} dir={dir} />
						))}
					</div>
				</>
			)}
		</div>
	)
}

export function EvolutionChain({ species }: { species: Species }) {
	const nodes = flattenEvolutions(species.evolution)
	const results = useSuspenseQueries({
		queries: nodes.map((n) => varietyQueryOptions(n.name))
	})
	const spriteMap: SpriteMap = new Map(
		nodes.map((n, i) => [n.name, results[i].data.sprites.front.default ?? undefined])
	)

	const isLinear = nodes.every((n) => n.evolvesTo.length <= 1)

	const hasEvolutions = nodes.length > 1

	return (
		<TemporaryWrapper title="Evolutions">
			{hasEvolutions && (
				<EvolutionTree node={species.evolution} spriteMap={spriteMap} dir={isLinear ? "row" : "col"} />
			)}
			{!hasEvolutions && <p>No evolutions</p>}
		</TemporaryWrapper>
	)
}
