import { ArrowRightIcon, MagnifyingGlassIcon } from "@phosphor-icons/react"
import { Link, useNavigate } from "@tanstack/react-router"
import { useState } from "react"
import { Footer } from "#/components/Footer"
import { PokemonCard } from "#/components/list/PokemonCard"
import { TYPE_THEME } from "#/theme/pokemon-types.theme"

const FEATURED = [
	{ id: 1, name: "bulbasaur" },
	{ id: 4, name: "charmander" },
	{ id: 7, name: "squirtle" },
	{ id: 25, name: "pikachu" },
	{ id: 94, name: "gengar" },
	{ id: 133, name: "eevee" },
	{ id: 149, name: "dragonite" },
	{ id: 150, name: "mewtwo" }
] as const

const t = TYPE_THEME
const HERO_BG = [
	`radial-gradient(38% 34% at 14% 18%, color-mix(in oklab, ${t.fire.color} 26%, transparent), transparent 70%)`,
	`radial-gradient(38% 34% at 86% 14%, color-mix(in oklab, ${t.water.color} 24%, transparent), transparent 70%)`,
	`radial-gradient(42% 42% at 82% 82%, color-mix(in oklab, ${t.grass.color} 22%, transparent), transparent 72%)`,
	`radial-gradient(42% 42% at 16% 88%, color-mix(in oklab, ${t.electric.color} 24%, transparent), transparent 72%)`,
	"var(--paper)"
].join(", ")

const HomeSearch = () => {
	const [q, setQ] = useState("")
	const navigate = useNavigate()

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault()
				navigate({ to: "/pokemon", search: { search: q.trim() || undefined } })
			}}
			className="group relative w-full max-w-xl"
		>
			<MagnifyingGlassIcon
				className="pointer-events-none absolute left-5 top-1/2 size-5 -translate-y-1/2 text-ink-faint transition group-focus-within:text-ink"
				weight="bold"
			/>
			<input
				value={q}
				onChange={(e) => setQ(e.target.value)}
				placeholder="Search for a Pokémon…"
				aria-label="Search for a Pokémon"
				className="w-full rounded-full border border-line bg-sheet py-4 pl-13 pr-32 text-base text-ink shadow-sm outline-none transition placeholder:text-ink-faint focus:border-ink/30 focus:shadow-md"
			/>
			<button
				type="submit"
				className="absolute right-2 top-1/2 inline-flex -translate-y-1/2 items-center gap-1.5 rounded-full bg-ink px-5 py-2.5 font-mono text-[0.7rem] font-bold uppercase tracking-widest text-paper transition hover:opacity-90"
			>
				Search
				<ArrowRightIcon className="size-3.5" weight="bold" />
			</button>
		</form>
	)
}

export const Home = () => {
	return (
		<div className="min-h-dvh bg-paper">
			{/* ───────────────── hero ───────────────── */}
			<section className="grain relative overflow-hidden" style={{ background: HERO_BG }}>
				<div className="relative mx-auto flex max-w-6xl flex-col items-center px-4 py-24 text-center sm:px-6 lg:py-36">
					<p className="font-mono text-[0.72rem] font-bold uppercase tracking-[0.35em] text-ink-soft">
						Gotta fetch ’em all
					</p>
					<h1 className="mt-4 font-display text-6xl font-extrabold leading-[0.92] tracking-tight text-ink sm:text-7xl lg:text-8xl">
						Pokédex
					</h1>
					<p className="mt-5 max-w-xl text-balance font-display text-lg text-ink-soft sm:text-xl">
						Every Pokémon, one search away — sprites, stats, types, evolutions and more, color-coded by
						type.
					</p>

					<div className="mt-9 flex w-full flex-col items-center gap-4">
						<HomeSearch />
						<Link
							to="/pokemon"
							search={{ search: undefined }}
							className="inline-flex items-center gap-1.5 font-mono text-[0.72rem] font-bold uppercase tracking-widest text-ink-soft underline-offset-4 transition hover:text-ink hover:underline"
						>
							Or browse the full dex
							<ArrowRightIcon className="size-3.5" weight="bold" />
						</Link>
					</div>
				</div>
			</section>

			{/* ───────────────── featured ───────────────── */}
			<section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
				<div className="mb-7 flex items-end justify-between gap-4">
					<div>
						<p className="font-mono text-[0.7rem] font-bold uppercase tracking-[0.3em] text-ink-faint">
							Start here
						</p>
						<h2 className="mt-1.5 font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
							Featured
						</h2>
					</div>
					<Link
						to="/pokemon"
						search={{ search: undefined }}
						className="hidden shrink-0 items-center gap-1.5 font-mono text-[0.7rem] font-bold uppercase tracking-widest text-ink-soft transition hover:text-ink sm:inline-flex"
					>
						View all
						<ArrowRightIcon className="size-3.5" weight="bold" />
					</Link>
				</div>

				<div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
					{FEATURED.map((p) => (
						<PokemonCard key={p.name} id={p.id} name={p.name} />
					))}
				</div>
			</section>

			<Footer />
		</div>
	)
}
