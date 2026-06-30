import { GenderFemaleIcon, GenderMaleIcon, type Icon } from "@phosphor-icons/react"
import { Link } from "@tanstack/react-router"
import { defaultVarietyName, genderOf, resolveGenderPresentation } from "#/lib/domain/pokemon.utils"
import { cn } from "#/lib/utils"
import { type Form, GENDERS, type Gender, type Species, type Variety } from "#/types/pokemon"

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
	if (isDisabled) return null

	const defaultName = defaultVarietyName(species)

	const active =
		presentation.kind === "varieties"
			? genderOf(activeVariety.name)
			: presentation.kind === "forms"
				? genderOf(activeForm.name)
				: (gender ?? "male")

	return (
		<div className="flex items-center gap-1">
			{GENDERS.map((g) => {
				const Icon = SYMBOL[g]
				return (
					<Link
						key={g}
						from="/pokemon/$id"
						aria-label={g}
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
							"grid size-7 place-items-center rounded-full transition",
							active === g ? "bg-(--on-type)/15 opacity-100" : "opacity-45 hover:opacity-80"
						)}
					>
						<Icon size={18} weight="bold" />
					</Link>
				)
			})}
		</div>
	)
}
