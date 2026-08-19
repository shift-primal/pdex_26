import { useQuery } from "@tanstack/react-query"
import { Link } from "@tanstack/react-router"
import { SpriteWrapper } from "#/components/SpriteWrapper"
import { TypeBadge } from "#/components/TypeBadge"
import { formatId, formatText } from "#/lib/format"
import { showdownSpriteFromId } from "#/lib/sprites"
import { cn } from "#/lib/utils"
import { usePrefetchPokemon, usePrefetchVariety } from "#/queries/prefetch"
import { varietyQueryOptions } from "#/queries/variety"
import { TYPE_THEME } from "#/theme/pokemon-types.theme"
import type { TypeName } from "#/types/pokemon"

export const PokemonCard = ({ id, name, types: typesProp }: { id: number; name: string; types?: TypeName[] }) => {
	const hasTypes = typesProp !== undefined
	const { data: variety } = useQuery({ ...varietyQueryOptions(name), enabled: !hasTypes })
	const prefetchPokemon = usePrefetchPokemon()
	const prefetchVariety = usePrefetchVariety()

	const types =
		typesProp ??
		variety?.types
			.slice()
			.sort((a, b) => a.slot - b.slot)
			.map((t) => t.name)
	const color = types?.[0] ? TYPE_THEME[types[0]].color : undefined
	const label = formatText(name)

	return (
		<Link
			to="/pokemon/$id"
			params={{ id: name }}
			search={{ tab: "about" }}
			onMouseEnter={() => {
				prefetchPokemon(name)
				prefetchVariety(name)
			}}
			style={
				color
					? ({
							"--type": color,
							background: `linear-gradient(158deg, color-mix(in oklab, ${color} 30%, white), color-mix(in oklab, ${color} 11%, white))`
						} as React.CSSProperties)
					: undefined
			}
			className={cn(
				"group relative flex flex-col items-center overflow-hidden rounded-3xl border p-4 transition duration-200",
				"hover:-translate-y-1 focus-visible:-translate-y-1 focus-visible:outline-none",
				color
					? "border-[color-mix(in_oklab,var(--type)_28%,white)] hover:shadow-[0_22px_40px_-22px_var(--type)]"
					: "border-line bg-sheet hover:shadow-[0_22px_40px_-26px_oklch(0_0_0)]"
			)}
		>
			<span className="z-10 self-start font-mono text-[0.7rem] font-bold tracking-wider text-ink">
				{formatId(id)}
			</span>

			<div className="relative z-10 flex h-24 w-full items-end justify-center">
				<SpriteWrapper spriteUrl={showdownSpriteFromId(id)} size={96} alt={label} />
			</div>

			<span className="z-10 mt-1 line-clamp-1 text-center font-display text-sm font-bold text-ink">{label}</span>

			<div className="z-10 mt-2 flex min-h-5 flex-col items-center gap-1 sm:flex-row sm:justify-center">
				{types?.map((t) => (
					<TypeBadge key={t} type={t} size="sm" />
				))}
			</div>
		</Link>
	)
}

/* placeholder skeleton */
export const PokemonCardSkeleton = () => (
	<div className="flex animate-pulse flex-col items-center gap-3 rounded-3xl border border-line bg-sheet p-4">
		<div className="h-3 w-8 self-start rounded-full bg-line" />
		<div className="size-20 rounded-full bg-line" />
		<div className="h-3 w-16 rounded-full bg-line" />
		<div className="h-4 w-12 rounded-full bg-line" />
	</div>
)
