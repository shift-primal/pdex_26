import { TemporaryWrapper } from "#/components/TemporaryWrapper"
import { defaultVarietyName, genderOf, resolveGenderPresentation } from "#/lib/domain/pokemon.utils"
import { cn } from "#/lib/utils"
import { GENDERS, type Form, type Gender, type Species, type Variety } from "#/types/pokemon"
import { GenderFemaleIcon, GenderMaleIcon, type Icon } from "@phosphor-icons/react"
import { Link } from "@tanstack/react-router"

const SYMBOL: Record<Gender, Icon> = { male: GenderMaleIcon, female: GenderFemaleIcon }

export const GenderSwitcher = ({
	species,
	activeVariety,
	activeForm,
	gender
}: {
	species: Species
	activeVariety: Variety
	activeForm: Form
	gender?: Gender
}) => {
	const presentation = resolveGenderPresentation(species, activeVariety)
	const isDisabled = presentation.kind === "none"

	const defaultName = defaultVarietyName(species)

	const active = isDisabled
		? "none"
		: presentation.kind === "varieties"
			? genderOf(activeVariety.name)
			: presentation.kind === "forms"
				? genderOf(activeForm.name)
				: (gender ?? "male")

	return (
		<TemporaryWrapper title="Gender">
			<div className="flex gap-2">
				{GENDERS.map((g) => {
					const Icon = SYMBOL[g]
					return (
						<Link
							disabled={isDisabled}
							key={g}
							from="/pokemon/$id"
							search={(s) => {
								if (presentation.kind === "sprite")
									return { ...s, gender: g === "female" ? "female" : undefined }
								if (presentation.kind === "varieties")
									return {
										...s,
										variety: presentation[g] === defaultName ? undefined : presentation[g],
										form: undefined
									}
								if (presentation.kind === "forms") return { ...s, form: presentation[g] }
								return s
							}}
							className={cn(
								isDisabled
									? "pointer-events-none opacity-30"
									: active === g
										? "font-bold"
										: "opacity-50"
							)}
						>
							<Icon size={32} weight={active === g ? "regular" : "light"} />
						</Link>
					)
				})}
			</div>
		</TemporaryWrapper>
	)
}
