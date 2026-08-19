import { useSuspenseQuery } from "@tanstack/react-query"
import { getRouteApi, Link } from "@tanstack/react-router"
import { useWindowVirtualizer } from "@tanstack/react-virtual"
import { Suspense, useMemo, useRef } from "react"
import PokeballIcon from "#/assets/pokeball.svg?react"
import { Footer } from "#/components/Footer"
import { FilterBar } from "#/components/list/FilterBar"
import { PokemonCard, PokemonCardSkeleton } from "#/components/list/PokemonCard"
import { SearchBar } from "#/components/list/SearchBar"
import { MAX_DEX_ID } from "#/config/general.config"
import { useColumns } from "#/hooks/useColumns"
import { useScrollRestoration } from "#/hooks/useScrollRestoration"
import { matchesQuery } from "#/lib/dexSearch"
import { idFromUrl } from "#/lib/sprites"
import { pokemonListQueryOptions } from "#/queries/list"
import { useTypeIndex } from "#/queries/typeIndex"

const route = getRouteApi("/pokemon/")

// keep in sync with COLUMN_BREAKPOINTS/BASE_COLUMNS in hooks/useColumns.ts
export const GRID = "grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6"
export const ROW =
	"grid grid-cols-2 gap-x-3 pb-3 sm:grid-cols-3 sm:gap-x-4 sm:pb-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6"

const GridSkeleton = () => (
	<div className={GRID}>
		{Array.from({ length: 12 }, (_, i) => (
			// biome-ignore lint/suspicious/noArrayIndexKey: fixed-length placeholder list
			<PokemonCardSkeleton key={i} />
		))}
	</div>
)

const Results = () => {
	const search = route.useSearch()
	const { data: list } = useSuspenseQuery(pokemonListQueryOptions())
	const index = useTypeIndex()

	const query = search.search ?? ""

	const items = useMemo(() => {
		let filtered = list
			.map((p) => ({ id: idFromUrl(p.url), name: p.name }))
			.filter((it) => it.id <= MAX_DEX_ID && matchesQuery(it, query))
			.map((it) => ({ ...it, types: index.get(it.name) ?? [] }))

		if (search.types.length > 0) {
			filtered = filtered.filter((it) => search.types.every((t) => it.types.includes(t)))
		}

		filtered.sort((a, b) => (search.sort === "name" ? a.name.localeCompare(b.name) : a.id - b.id))
		if (search.dir === "desc") filtered.reverse()

		return filtered
	}, [list, query, index, search.types, search.sort, search.dir])

	const total = items.length
	const columns = useColumns()
	const listRef = useRef<HTMLDivElement>(null)
	const rowCount = Math.ceil(total / columns)

	const virt = useWindowVirtualizer({
		count: rowCount,
		estimateSize: () => 240,
		overscan: 4,
		scrollMargin: listRef.current?.offsetTop ?? 0
	})

	// restore scroll
	useScrollRestoration(`${query}|${search.types.join(",")}|${search.sort}|${search.dir}`)

	return (
		<>
			<p className="mb-5 font-mono text-[0.7rem] font-bold uppercase tracking-[0.18em] text-ink-faint">
				{total.toLocaleString()} {total === 1 ? "result" : "results"}
			</p>

			{total === 0 ? (
				<div className="flex flex-col items-center gap-3 rounded-3xl border border-dashed border-line py-24">
					<PokeballIcon className="size-10 text-ink-faint opacity-40 [&_path]:fill-current" />
					<p className="font-display text-lg font-bold text-ink">No Pokémon found</p>
					<p className="text-sm text-ink-soft">Try a different name or fewer type filters.</p>
				</div>
			) : (
				<div ref={listRef} style={{ height: virt.getTotalSize(), position: "relative" }}>
					{virt.getVirtualItems().map((row) => {
						const cells = items.slice(row.index * columns, row.index * columns + columns)
						return (
							<div
								key={row.key}
								data-index={row.index}
								ref={virt.measureElement}
								className={ROW}
								style={{
									position: "absolute",
									top: 0,
									left: 0,
									width: "100%",
									transform: `translateY(${row.start - virt.options.scrollMargin}px)`
								}}
							>
								{cells.map((it) => (
									<PokemonCard key={it.name} id={it.id} name={it.name} types={it.types} />
								))}
							</div>
						)
					})}
				</div>
			)}
		</>
	)
}

export const Pokedex = () => {
	const search = route.useSearch()
	const navigate = route.useNavigate()

	const patch = (next: Partial<typeof search>) => navigate({ search: (s) => ({ ...s, ...next }) })

	return (
		<div className="flex min-h-dvh flex-col bg-paper">
			<div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-10 lg:py-16">
				{/* header */}
				<header className="relative mb-8">
					<div className="relative flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
						<div>
							<p className="font-mono text-[0.72rem] font-bold uppercase tracking-[0.3em] text-ink-faint">
								National Dex
							</p>
							<Link
								to="/"
								aria-label="Home"
								className="mt-2 inline-block font-display text-5xl font-extrabold leading-none tracking-tight text-ink transition hover:opacity-70 sm:text-6xl lg:text-7xl"
							>
								Pokédex
							</Link>
						</div>

						<div className="w-full lg:max-w-md">
							<SearchBar
								defaultValue={search.search ?? ""}
								onSearch={(value) => patch({ search: value || undefined })}
							/>
						</div>
					</div>
				</header>

				<FilterBar
					types={search.types}
					sort={search.sort}
					dir={search.dir}
					onTypesChange={(types) => patch({ types })}
					onSortChange={(sort) => patch({ sort })}
					onDirChange={(dir) => patch({ dir })}
				/>

				<Suspense fallback={<GridSkeleton />}>
					<Results />
				</Suspense>
			</div>

			<Footer className="mt-auto" />
		</div>
	)
}
