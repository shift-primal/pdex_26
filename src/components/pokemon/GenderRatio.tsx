import { GenderNeuterIcon, GenderMaleIcon, GenderFemaleIcon } from "@phosphor-icons/react"

export const GenderRatio = ({ genderRate }: { genderRate: number }) => {
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
