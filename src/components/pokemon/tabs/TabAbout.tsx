import { TypeBadge } from "#/components/pokemon/TypeBadge"
import { CLASSIFICATION_ICONS, GROWTH_RATES } from "#/config/general"
import { usePokemonCard } from "#/context/PokemonCardContext"
import { getPokemonEggCycles, getPokemonHeight, getPokemonWeight } from "#/lib/pokemon.utils"
import { capFirstLetter } from "#/lib/utils"
import type { PokemonClassification } from "#/types/pokemon"
import {
	ChartLineUpIcon,
	EggCrackIcon,
	EggIcon,
	GenderFemaleIcon,
	GenderIntersexIcon,
	GenderMaleIcon,
	GenderNeuterIcon,
	HouseIcon,
	RulerIcon,
	ScalesIcon,
	ShapesIcon,
	type Icon
} from "@phosphor-icons/react"

const InfoBadge = ({ title, value, Icon }: { title: string; value: React.ReactNode; Icon: Icon }) => {
	return (
		<div className="flex items-center justify-between">
			<div className="flex items-center gap-x-1 text-muted-foreground">
				<Icon />
				<span>{title}</span>
			</div>
			<span>{value}</span>
		</div>
	)
}

const GenderRatio = ({ genderRate }: { genderRate: number }) => {
	if (genderRate === -1) {
		return (
			<span className="flex items-center gap-x-1">
				<GenderNeuterIcon />
				Genderless
			</span>
		)
	}

	const female = (genderRate / 8) * 100
	const male = 100 - female

	return (
		<span className="flex items-center gap-x-3">
			<span className="flex items-center gap-x-1 text-blue-400">
				<GenderMaleIcon /> {male}%
			</span>
			<span className="flex items-center gap-x-1 text-pink-400">
				<GenderFemaleIcon /> {female}%
			</span>
		</span>
	)
}

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => {
	return (
		<div>
			<span>{title}</span>
			<div>{children}</div>
		</div>
	)
}

export const TabAbout = () => {
	const { active, base } = usePokemonCard()

	const isMultiType = active.types.length > 1

	return (
		<div>
			<Section title={isMultiType ? "Types" : "Type"}>
				<div className="flex items-center gap-x-2">
					{active.types.map((t) => (
						<TypeBadge key={t.name} type={t} />
					))}
				</div>
			</Section>
			<Section title="General">
				<InfoBadge title="Height" value={getPokemonHeight(active.height)} Icon={RulerIcon} />
				<InfoBadge title="Weight" value={getPokemonWeight(active.weight)} Icon={ScalesIcon} />
				<InfoBadge title="Shape" value={capFirstLetter(base.shape)} Icon={ShapesIcon} />
				<InfoBadge title="Growth Rate" value={GROWTH_RATES[base.growthRate]} Icon={ChartLineUpIcon} />
				<InfoBadge title="Habitat" value={capFirstLetter(base.habitat)} Icon={HouseIcon} />
			</Section>
			<Section title="Classification">
				{Object.entries(base.classification).map(([k, v]) => (
					<InfoBadge
						key={k}
						title={k.slice(2)}
						value={v ? "Yes" : "No"}
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
					value={base.eggGroups.map((e) => capFirstLetter(e)).join(", ")}
					Icon={EggIcon}
				/>
				<InfoBadge title="Egg Cycles" value={getPokemonEggCycles(base.hatchCounter)} Icon={EggCrackIcon} />
			</Section>
		</div>
	)
}
