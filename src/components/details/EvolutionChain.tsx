import { CaretDownIcon, CaretRightIcon } from "@phosphor-icons/react"
import { useSuspenseQueries } from "@tanstack/react-query"
import { Chip } from "#/components/Chip"
import { flattenEvolutions } from "#/lib/domain/evolution.utils"
import { formatText } from "#/lib/format"
import { usePrefetchPokemon } from "#/queries/prefetch"
import { varietyQueryOptions } from "#/queries/variety"
import type { PokemonEvolutionChainLink, Species } from "#/types/pokemon"

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
	const prefetchPokemon = usePrefetchPokemon()

	return (
		<div className={dir === "row" ? "flex items-center gap-3" : "flex flex-col items-center gap-3"}>
			<Chip
				to="/pokemon/$id"
				params={{ id: node.name }}
				search={(prev) => ({ tab: prev.tab })}
				sprite={spriteMap.get(node.name)}
				label={formatText(node.name)}
				prefetch={() => prefetchPokemon(node.name)}
			/>

			{children.length > 0 && (
				<>
					{dir === "row" ? (
						<CaretRightIcon className="size-5 shrink-0 text-ink-faint" weight="bold" />
					) : (
						<CaretDownIcon className="size-5 shrink-0 text-ink-faint" weight="bold" />
					)}
					<div
						className={
							dir === "row" ? "flex flex-col flex-wrap gap-4" : "flex flex-wrap justify-center gap-4"
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

export const EvolutionChain = ({ species }: { species: Species }) => {
	const nodes = flattenEvolutions(species.evolution)
	const results = useSuspenseQueries({ queries: nodes.map((n) => varietyQueryOptions(n.name)) })
	const spriteMap: SpriteMap = new Map(
		nodes.map((n, i) => [n.name, results[i].data.sprites.front.default.normal ?? undefined])
	)

	const isLinear = nodes.every((n) => n.evolvesTo.length <= 1)
	const hasEvolutions = nodes.length > 1

	if (!hasEvolutions) {
		return (
			<div className="reveal flex h-32 items-center justify-center rounded-2xl border border-dashed border-line">
				<p className="font-mono text-xs uppercase tracking-widest text-ink-faint">Does not evolve</p>
			</div>
		)
	}

	return (
		<div className="reveal flex justify-center overflow-x-auto py-2">
			<EvolutionTree node={species.evolution} spriteMap={spriteMap} dir={isLinear ? "row" : "col"} />
		</div>
	)
}
