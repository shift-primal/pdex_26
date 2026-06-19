import { TemporaryWrapper } from "#/components/TemporaryWrapper"
import { genderOf, resolveGenderPresentation } from "#/lib/domain/pokemon.utils"
import type { Form, Gender, Species, Variety } from "#/types/pokemon"
import { Link } from "@tanstack/react-router"

const GENDERS = ["male", "female"] as const
const SYMBOL: Record<Gender, string> = { male: "♂", female: "♀" }

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
	if (presentation.kind === "none") return null

	const defaultVarietyName = species.varieties.find((v) => v.isDefault)?.name

	// Where the active gender is recorded depends on the kind: a variety/form name carries it as a
	// suffix; the sprite case keeps it in the ?gender param (defaulting to male).
	const active =
		presentation.kind === "varieties"
			? genderOf(activeVariety.name)
			: presentation.kind === "forms"
				? genderOf(activeForm.name)
				: (gender ?? "male")

	return (
		<TemporaryWrapper title="Gender">
			<div className="flex gap-2">
				{GENDERS.map((g) => (
					<Link
						key={g}
						from="/pokemon/$id"
						// Each kind switches gender through its own param: ?gender / ?variety / ?form.
						search={(s) =>
							presentation.kind === "sprite"
								? { ...s, gender: g === "female" ? "female" : undefined }
								: presentation.kind === "varieties"
									? {
											...s,
											variety:
												presentation[g] === defaultVarietyName ? undefined : presentation[g],
											form: undefined
										}
									: { ...s, form: presentation[g] }
						}
						className={active === g ? "font-bold" : "opacity-50"}
					>
						{SYMBOL[g]}
					</Link>
				))}
			</div>
		</TemporaryWrapper>
	)
}
