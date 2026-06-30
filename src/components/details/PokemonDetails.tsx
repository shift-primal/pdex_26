import PokeballIcon from "#/assets/pokeball.svg?react"
import { DetailTabs } from "#/components/DetailTabs"
import { BackButton } from "#/components/details/BackButton"
import { GenderSwitcher } from "#/components/details/GenderSwitcher"
import { PokemonNavigation } from "#/components/details/PokemonNavigation"
import { SpriteWrapper } from "#/components/SpriteWrapper"
import { TypeBadge } from "#/components/TypeBadge"
import type { Tab } from "#/config/general.config"
import { useAdjacentHotkeys } from "#/hooks/useAdjacentHotkeys"
import { useNormalizeSearch } from "#/hooks/useNormalizeSearch"
import { typeVars } from "#/lib/color"
import { resolveFrontSprite } from "#/lib/domain/pokemon.utils"
import { formatId, formatText } from "#/lib/format"
import { useAdjacentPokemon } from "#/queries/adjacent"
import { usePokemonDetail } from "#/queries/detail"
import { TYPE_THEME } from "#/theme/pokemon-types.theme"
import type { Gender, Species, TypeRef } from "#/types/pokemon"

const ROMAN = ["", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"]

const tags = (c: Species["classification"]) =>
	[c.isBaby && "Baby", c.isLegendary && "Legendary", c.isMythical && "Mythical"].filter(Boolean) as string[]

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

	useNormalizeSearch({ species, activeVariety, activeForm, variety, form, gender })
	useAdjacentHotkeys(neighbors)

	const sprite = resolveFrontSprite(activeVariety, activeForm, gender)
	const fallbackSprite = resolveFrontSprite(activeVariety, activeForm)
	const title = formatText(activeForm.displayName)

	const types: TypeRef[] = (activeForm.types.length ? activeForm.types : activeVariety.types)
		.slice()
		.sort((a, b) => a.slot - b.slot)
	const palette = typeVars(TYPE_THEME[types[0].name].color, types[1] ? TYPE_THEME[types[1].name].color : undefined)

	const classifications = tags(species.classification)

	return (
		<div className="min-h-screen" style={palette}>
			<div className="backdrop-bloom" />

			<div className="mx-auto flex h-dvh max-w-2xl flex-col overflow-hidden px-4 py-5 sm:px-6 md:grid md:max-w-6xl md:grid-cols-[0.8fr_1.2fr] md:items-stretch md:gap-6 md:py-8 lg:grid-cols-[1fr_1fr] lg:gap-10">
				<header
					className="grain relative z-0 min-w-0 overflow-hidden rounded-t-(--radius) px-7 pb-12 pt-6 text-(--on-type) md:flex md:h-full md:flex-col md:rounded-(--radius) md:px-8 md:pb-8"
					style={{
						background:
							"linear-gradient(168deg, var(--type) 0%, color-mix(in oklab, var(--type) 72%, white) 100%)"
					}}
				>
					<div className="dotfield pointer-events-none absolute right-5 top-5 size-24 opacity-30" />
					<div
						aria-hidden
						className="hidden ghost-in pointer-events-none absolute bottom-1/8 left-1/2 -translate-x-1/2 font-display  font-extrabold leading-none tracking-tight md:block md:text-[10rem]"
					>
						{formatId(species.id)}
					</div>

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

					<div className="relative mx-auto flex h-56 w-full items-center justify-center md:h-auto md:flex-1">
						{sprite && (
							<div className="fade-in relative md:scale-110 lg:scale-[1.9]">
								<PokeballIcon className="pointer-events-none absolute left-6/7 top-1/10 size-76 -translate-x-1/2 -translate-y-1/2 text-current opacity-[0.07] [&_path]:fill-current" />
								<div
									className="pointer-events-none absolute left-1/2 top-1/2 size-52 -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl"
									style={{
										background:
											"radial-gradient(circle, color-mix(in oklab, white 55%, transparent), transparent 70%)"
									}}
								/>
								<SpriteWrapper spriteUrl={sprite} fallbackUrl={fallbackSprite} alt={title} size={224} />
							</div>
						)}
					</div>

					<div className="reveal relative mt-1" style={{ animationDelay: "0.1s" }}>
						<p className="mb-2 font-mono text-[0.7rem] font-bold uppercase tracking-[0.2em] opacity-85">
							Gen {ROMAN[species.generation.id] ?? species.generation.id} ·{" "}
							{formatText(species.generation.region)}
						</p>
						<h1
							className="font-display font-extrabold leading-[0.95] tracking-tight wrap-anywhere"
							style={{ fontSize: "clamp(2.1rem, 4.5vw + 1rem, 3.6rem)" }}
						>
							{title}
						</h1>
						<div className="mt-3 flex flex-wrap items-center gap-2">
							{types.map((t) => (
								<TypeBadge key={t.name} type={t.name} />
							))}
							{classifications.map((c) => (
								<span
									key={c}
									className="rounded-full border border-current px-2.5 py-0.5 font-mono text-[0.6rem] font-bold uppercase tracking-widest opacity-80"
								>
									{c}
								</span>
							))}
						</div>
					</div>
				</header>

				{/* tabs */}
				<section className="relative z-10 -mt-6 flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden rounded-(--radius) bg-sheet px-6 pb-6 pt-6 shadow-[0_30px_80px_-40px_color-mix(in_oklab,var(--type)_70%,black)] sm:px-8 md:mt-0 md:h-full md:px-8 md:py-8">
					{species.flavorText && (
						<p
							className="reveal mb-4 max-w-prose shrink-0 font-display text-base leading-snug text-ink-soft md:text-lg"
							style={{ animationDelay: "0.16s" }}
						>
							{species.flavorText.replace(/\s+/g, " ").trim()}
						</p>
					)}

					<DetailTabs tab={tab} />

					<div className="mt-4 shrink-0 border-t border-line pt-4">
						<PokemonNavigation neighbors={neighbors} />
					</div>
				</section>
			</div>
		</div>
	)
}
