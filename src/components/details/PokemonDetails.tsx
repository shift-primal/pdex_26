import PokeballIcon from "#/assets/pokeball.svg?react"
import { ClassificationBadge } from "#/components/ClassificationBadge"
import { DetailTabs } from "#/components/DetailTabs"
import { BackButton } from "#/components/details/BackButton"
import { GenderSwitcher } from "#/components/details/GenderSwitcher"
import { PokemonNavigation } from "#/components/details/PokemonNavigation"
import { SpriteWrapper } from "#/components/SpriteWrapper"
import { TypeBadge } from "#/components/TypeBadge"
import type { Tab } from "#/config/general.config"
import { useAdjacentHotkeys } from "#/hooks/useAdjacentHotkeys"
import { useMediaQuery } from "#/hooks/useMediaQuery"
import { useNormalizeSearch } from "#/hooks/useNormalizeSearch"
import { typeVars } from "#/lib/color"
import { resolveDisplayName, resolveFrontSprite } from "#/lib/domain/pokemon.utils"
import { formatId, formatText } from "#/lib/format"
import { useAdjacentPokemon } from "#/queries/adjacent"
import { usePokemonDetail } from "#/queries/detail"
import type { ClassificationName } from "#/theme/classification.theme"
import { TYPE_THEME } from "#/theme/pokemon-types.theme"
import type { Gender, Species, TypeRef } from "#/types/pokemon"

const ROMAN = ["", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"]

const tags = (c: Species["classification"]): ClassificationName[] =>
	[c.isBaby && "baby", c.isLegendary && "legendary", c.isMythical && "mythical"].filter(
		Boolean
	) as ClassificationName[]

export const PokemonDetails = ({
	id,
	variety,
	form,
	gender,
	tab
}: {
	id: string
	variety?: string
	form?: string
	gender?: Gender
	tab: Tab
}) => {
	const { species, activeVariety, activeForm } = usePokemonDetail(id, variety, form)
	const neighbors = useAdjacentPokemon(species.id)
	const isDesktop = useMediaQuery("(min-width: 1024px)") // mirrors the `lg:` breakpoint

	useNormalizeSearch({ species, activeVariety, activeForm, variety, form, gender })
	useAdjacentHotkeys(neighbors)

	const sprite = resolveFrontSprite(activeVariety, activeForm, gender)
	const fallbackSprite = resolveFrontSprite(activeVariety, activeForm)
	const title = resolveDisplayName(activeForm, species)

	const types: TypeRef[] = (activeForm.types.length ? activeForm.types : activeVariety.types)
		.slice()
		.sort((a, b) => a.slot - b.slot)
	const palette = typeVars(TYPE_THEME[types[0].name].color, types[1] ? TYPE_THEME[types[1].name].color : undefined)

	const classifications = tags(species.classification)
	const flavor = species.flavorText?.replace(/\s+/g, " ").trim()
	const eyebrow = `Gen ${ROMAN[species.generation.id] ?? species.generation.id} · ${formatText(species.generation.region)}`
	const heroGradient = "linear-gradient(150deg, var(--type) 0%, color-mix(in oklab, var(--type) 85%, white) 100%)"

	const TypeTags = types.map((t) => <TypeBadge key={t.name} type={t.name} variant="glass" />)

	const ClassificationTags = classifications.length > 0 && (
		<div className="mt-2 flex flex-wrap items-center gap-2">
			{classifications.map((c) => (
				<ClassificationBadge key={c} classification={c} size="sm" variant="glass" />
			))}
		</div>
	)

	const MobileView = (
		<div className="w-full">
			<header
				className="grain relative z-0 overflow-hidden px-7 pb-12 pt-6 text-(--on-type)"
				style={{ background: heroGradient }}
			>
				<div className="relative flex items-center justify-between">
					<BackButton />
					<div className="flex items-center gap-3">
						<span className="font-mono text-sm font-bold tracking-wider opacity-90">
							{formatId(species.id)}
						</span>
						<GenderSwitcher
							species={species}
							activeVariety={activeVariety}
							activeForm={activeForm}
							gender={gender}
						/>
					</div>
				</div>

				<div className="relative mx-auto flex h-56 w-full items-center justify-center">
					{sprite && (
						<div className="fade-in relative">
							<PokeballIcon className="pointer-events-none absolute left-1/2 top-1/2 size-80 -translate-x-1/2 -translate-y-1/2 text-current opacity-[0.08] [&_path]:fill-current" />
							<div
								className="pointer-events-none absolute left-1/2 top-1/2 size-52 -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl"
								style={{
									background:
										"radial-gradient(circle, color-mix(in oklab, white 55%, transparent), transparent 70%)"
								}}
							/>
							<SpriteWrapper
								spriteUrl={sprite}
								fallbackUrl={fallbackSprite}
								alt={title}
								size={208}
								scale={1.8}
							/>
						</div>
					)}
				</div>

				<div className="reveal relative mt-1" style={{ animationDelay: "0.1s" }}>
					<p className="mb-2 font-mono text-[0.7rem] font-bold uppercase tracking-[0.2em] opacity-85">
						{eyebrow}
					</p>
					<h1
						className="font-display font-extrabold leading-[0.95] tracking-tight wrap-anywhere"
						style={{ fontSize: "clamp(2.1rem, 4.5vw + 1rem, 3.6rem)" }}
					>
						{title}
					</h1>
					<div className="mt-3 flex items-start gap-1.5 sm:flex-row sm:items-center sm:gap-2">{TypeTags}</div>
					{ClassificationTags}
				</div>
			</header>

			<main className="relative z-10 -mt-6 rounded-(--radius) bg-sheet px-6 pb-28 pt-6 shadow-[0_30px_80px_-40px_color-mix(in_oklab,var(--type)_70%,black)] sm:px-8">
				{flavor && (
					<p
						className="mb-5 max-w-prose font-display text-base leading-snug text-ink-soft"
						style={{ animationDelay: "0.16s" }}
					>
						{flavor}
					</p>
				)}
				<DetailTabs tab={tab} />
			</main>

			{/* fixed so prev/next stay reachable without scrolling to the bottom */}
			<div
				className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-paper/95 px-4 py-2.5 backdrop-blur-md"
				style={{ paddingBottom: "max(0.625rem, env(safe-area-inset-bottom))" }}
			>
				<PokemonNavigation neighbors={neighbors} />
			</div>
		</div>
	)

	const DesktopView = (
		<div className="relative flex min-h-dvh flex-col">
			{/* top bar */}
			<div className="sticky top-0 z-30 border-b border-line/70 bg-paper/85 backdrop-blur-md">
				<div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-8 px-8 py-3.5 xl:px-12 2xl:max-w-384">
					<BackButton variant="plain" />
					<span className="font-mono text-[0.68rem] font-bold uppercase tracking-[0.18em] text-ink-faint">
						{formatId(species.id)} · {title}
					</span>
				</div>
			</div>

			{/* hero band */}
			<section className="grain relative overflow-hidden text-(--on-type)" style={{ background: heroGradient }}>
				<div
					aria-hidden
					className="ghost-in pointer-events-none absolute bottom-0 right-10 font-display text-[10rem] font-extrabold leading-none tracking-tight xl:text-[14rem] 2xl:text-[18rem]"
				>
					{formatId(species.id)}
				</div>

				<div className="mx-auto grid w-full max-w-7xl grid-cols-[0.85fr_1fr] items-center gap-16 px-8 py-20 xl:gap-24 xl:px-12 xl:py-28 2xl:max-w-384">
					{/* sprite */}
					<div className="relative flex items-center justify-center">
						{sprite && (
							<div className="fade-in relative 2xl:scale-110">
								<PokeballIcon className="pointer-events-none absolute left-1/2 top-1/2 size-112 -translate-x-1/2 -translate-y-1/2 text-current opacity-[0.08] [&_path]:fill-current" />
								<div
									className="pointer-events-none absolute left-1/2 top-1/2 size-96 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
									style={{
										background:
											"radial-gradient(circle, color-mix(in oklab, white 30%, transparent), transparent 70%)"
									}}
								/>
								<SpriteWrapper
									spriteUrl={sprite}
									fallbackUrl={fallbackSprite}
									alt={title}
									size={220}
									scale={2.2}
								/>
							</div>
						)}
					</div>

					{/* identity */}
					<div className="reveal relative min-w-0">
						<div className="mb-5 flex items-center gap-4">
							<p className="font-mono text-sm font-bold uppercase tracking-[0.25em] opacity-85">
								{eyebrow}
							</p>
							<GenderSwitcher
								species={species}
								activeVariety={activeVariety}
								activeForm={activeForm}
								gender={gender}
							/>
						</div>
						<h1 className="font-display text-7xl font-extrabold leading-[0.92] tracking-tight wrap-anywhere xl:text-8xl 2xl:text-[7rem]">
							{title}
						</h1>
						<div className="mt-6 flex items-center gap-2.5">{TypeTags}</div>
						{ClassificationTags}
						{flavor && (
							<p className="mt-8 max-w-2xl font-display text-xl leading-relaxed opacity-90 2xl:text-2xl">
								{flavor}
							</p>
						)}
					</div>
				</div>
			</section>

			{/* content */}
			<main className="flex flex-1 flex-col bg-paper">
				<div className="mx-auto w-full max-w-7xl flex-1 px-8 py-14 xl:px-12 xl:py-6 2xl:max-w-384">
					<DetailTabs tab={tab} />
				</div>

				{/* prev / next — full-width bar at the bottom */}
				<div className="border-t border-line">
					<div className="mx-auto w-full max-w-7xl px-8 py-5 xl:px-12 2xl:max-w-384">
						<PokemonNavigation neighbors={neighbors} />
					</div>
				</div>
			</main>
		</div>
	)

	return (
		<div className="min-h-dvh bg-paper" style={palette}>
			<div className="backdrop-bloom" />

			{/* ───────── mobile / tablet: stacked card ───────── */}
			{!isDesktop && MobileView}

			{/* ───────── desktop: top bar → hero band → content → nav ───────── */}
			{isDesktop && DesktopView}
		</div>
	)
}
