import { formatText, getPokemonEggCycles, getPokemonHeight, getPokemonWeight } from "#/lib/format"
import { usePokemonDetailFromRoute } from "#/queries/detail"
import { GROWTH_RATES } from "#/theme/growth-rates.theme"

const Spec = ({ label, children }: { label: string; children: React.ReactNode }) => (
	<div className="flex flex-col gap-0.5 border-t border-line py-2.5">
		<dt className="font-mono text-[0.62rem] font-bold uppercase tracking-[0.18em] text-ink-faint">{label}</dt>
		<dd className="font-medium text-ink">{children}</dd>
	</div>
)

const GenderRatio = ({ rate }: { rate: number }) => {
	if (rate < 0) return <span className="text-ink-soft">Genderless</span>
	const female = (rate / 8) * 100
	const male = 100 - female
	return (
		<div className="flex flex-col gap-1.5">
			<div className="flex h-2 overflow-hidden rounded-full bg-line">
				<div className="bar-fill h-full" style={{ width: `${male}%`, background: "#5b8dd9" }} />
				<div className="bar-fill h-full" style={{ width: `${female}%`, background: "#eb8fe5" }} />
			</div>
			<div className="flex justify-between font-mono text-[0.62rem] font-bold text-ink-soft">
				<span>♂ {male}%</span>
				<span>♀ {female}%</span>
			</div>
		</div>
	)
}

export const About = () => {
	const { species, activeVariety } = usePokemonDetailFromRoute()

	return (
		<dl className="reveal grid grid-cols-2 gap-x-6">
			<Spec label="Height">{getPokemonHeight(activeVariety.height)}</Spec>
			<Spec label="Weight">{getPokemonWeight(activeVariety.weight)}</Spec>
			<Spec label="Habitat">{species.habitat ? formatText(species.habitat) : "—"}</Spec>
			<Spec label="Shape">{species.shape ? formatText(species.shape) : "—"}</Spec>
			<Spec label="Egg Groups">{species.eggGroups.map(formatText).join(", ") || "—"}</Spec>
			<Spec label="Egg Cycles">{getPokemonEggCycles(species.hatchCounter)}</Spec>
			<Spec label="Growth">{GROWTH_RATES[species.growthRate] ?? "—"}</Spec>
			<Spec label="Capture Rate">{species.captureRate}</Spec>
			<div className="col-span-2">
				<Spec label="Gender Ratio">
					<GenderRatio rate={species.genderRate} />
				</Spec>
			</div>
		</dl>
	)
}
