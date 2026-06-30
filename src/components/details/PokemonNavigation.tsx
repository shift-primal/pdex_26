import { CaretLeftIcon, CaretRightIcon } from "@phosphor-icons/react"
import { Link } from "@tanstack/react-router"
import { SpriteWrapper } from "#/components/SpriteWrapper"
import { formatText } from "#/lib/format"
import type { Neighbor, Neighbors } from "#/queries/adjacent"
import { usePrefetchPokemon } from "#/queries/prefetch"

const NavLink = ({ neighbor, dir, prefetch }: { neighbor: Neighbor; dir: "prev" | "next"; prefetch: () => void }) => {
	const isPrev = dir === "prev"
	return (
		<Link
			to="/pokemon/$id"
			params={{ id: neighbor.name }}
			search={(prev) => ({ tab: prev.tab })}
			onMouseEnter={prefetch}
			onFocus={prefetch}
			className={`group flex flex-1 items-center gap-2 rounded-2xl px-3 py-2 transition hover:bg-[color-mix(in_oklab,var(--type)_10%,white)] ${
				isPrev ? "justify-start" : "flex-row-reverse justify-start"
			}`}
		>
			{isPrev ? (
				<CaretLeftIcon
					className="size-4 shrink-0 text-ink-faint transition group-hover:text-type"
					weight="bold"
				/>
			) : (
				<CaretRightIcon
					className="size-4 shrink-0 text-ink-faint transition group-hover:text-type"
					weight="bold"
				/>
			)}
			<div className="size-9 shrink-0">
				<SpriteWrapper spriteUrl={neighbor.sprite} alt={neighbor.name} size={36} />
			</div>
			<div className={`flex flex-col ${isPrev ? "items-start" : "items-end"}`}>
				<span className="font-mono text-[0.58rem] font-bold uppercase tracking-[0.18em] text-ink-faint">
					{isPrev ? "Prev" : "Next"}
				</span>
				<span className="text-sm font-semibold leading-tight text-ink">{formatText(neighbor.name)}</span>
			</div>
		</Link>
	)
}

export const PokemonNavigation = ({ neighbors }: { neighbors: Neighbors }) => {
	const prefetchPokemon = usePrefetchPokemon()
	return (
		<nav className="flex items-center justify-between gap-2">
			<NavLink neighbor={neighbors.prev} dir="prev" prefetch={() => prefetchPokemon(neighbors.prev.name)} />
			<span className="h-8 w-px shrink-0 bg-line" />
			<NavLink neighbor={neighbors.next} dir="next" prefetch={() => prefetchPokemon(neighbors.next.name)} />
		</nav>
	)
}
