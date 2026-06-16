import { GenderRatio } from "#/components/pokemon/GenderRatio"
import { InfoBadge, Muted } from "#/components/pokemon/InfoBadge"
import { TypeBadge } from "#/components/pokemon/TypeBadge"
import { Separator } from "#/components/shadcn/separator"
import { CLASSIFICATION_ICONS, GROWTH_RATES } from "#/config/general"
import { usePokemonCard } from "#/context/PokemonCardContext"
import { getPokemonEggCycles, getPokemonHeight, getPokemonWeight } from "#/lib/pokemon.utils"
import { capFirstLetter } from "#/lib/utils"
import type { PokemonClassification } from "#/types/pokemon"
import {
	ChartLineUpIcon,
	CheckIcon,
	EggCrackIcon,
	EggIcon,
	GenderIntersexIcon,
	HouseIcon,
	RulerIcon,
	ScalesIcon,
	ShapesIcon,
	XIcon
} from "@phosphor-icons/react"

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => {
	return (
		<div className="flex flex-col gap-y-1.5 lg:gap-y-3 mb-1.5 lg:mb-3">
			<span className="text-xs lg:text-base font-semibold uppercase tracking-wider text-muted-foreground">
				{title}
			</span>
			<div className="flex flex-col gap-y-1">{children}</div>
		</div>
	)
}

export const TabAbout = () => {
	const { active, base } = usePokemonCard()

	const knownHabitat = base.habitat !== "unknown"
	const hasEggs = !base.eggGroups.includes("no-eggs")

	return (
		<div className="flex flex-col">
			<div className="flex items-center gap-x-4 justify-center">
				{active.types.map((t) => (
					<TypeBadge key={t.name} type={t} />
				))}
			</div>

			<Separator className="bg-accent-foreground/5 my-4" />
			<Section title="General">
				<InfoBadge title="Height" value={getPokemonHeight(active.height)} Icon={RulerIcon} />
				<InfoBadge title="Weight" value={getPokemonWeight(active.weight)} Icon={ScalesIcon} />
				<InfoBadge title="Shape" value={capFirstLetter(base.shape)} Icon={ShapesIcon} />
				<InfoBadge title="Growth Rate" value={GROWTH_RATES[base.growthRate]} Icon={ChartLineUpIcon} />
				<InfoBadge
					title="Habitat"
					value={knownHabitat ? capFirstLetter(base.habitat) : <Muted>Unknown</Muted>}
					Icon={HouseIcon}
				/>
			</Section>
			<Section title="Classification">
				{Object.entries(base.classification).map(([k, v]) => (
					<InfoBadge
						key={k}
						title={k.slice(2)}
						value={
							v ? (
								<CheckIcon className="text-green-400" weight="bold" />
							) : (
								<XIcon className="text-red-400" weight="bold" />
							)
						}
						Icon={CLASSIFICATION_ICONS[k as keyof PokemonClassification]}
					/>
				))}
			</Section>
			<Section title="Breeding">
				<InfoBadge
					title="Gender"
					value={<GenderRatio genderRate={base.genderRate} />}
					Icon={GenderIntersexIcon}
				/>
				<InfoBadge
					title="Egg Groups"
					value={hasEggs ? base.eggGroups.map((e) => capFirstLetter(e)).join(", ") : <Muted>No Eggs</Muted>}
					Icon={EggIcon}
				/>
				<InfoBadge
					title="Egg Cycles"
					value={hasEggs ? getPokemonEggCycles(base.hatchCounter) : <Muted>N/A</Muted>}
					Icon={EggCrackIcon}
				/>
			</Section>
		</div>
	)
}
