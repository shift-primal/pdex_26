import { resolveGenderPresentation } from "#/lib/domain/pokemon.utils"
import type { Gender, Species, Variety, Form } from "#/types/pokemon"
import { useNavigate } from "@tanstack/react-router"
import { useEffect } from "react"

export const useNormalizeSearch = ({
	species,
	activeVariety,
	activeForm,
	variety,
	form,
	gender
}: {
	species: Species
	activeVariety: Variety
	activeForm: Form
	variety?: string
	form?: string
	gender?: Gender
}) => {
	const navigate = useNavigate({ from: "/pokemon/$id" })
	const genderIsValid = resolveGenderPresentation(species, activeVariety).kind === "sprite" && gender === "female"

	useEffect(() => {
		const stripVariety = variety !== undefined && variety !== activeVariety.name
		const stripForm = form !== undefined && form !== activeForm.name
		const stripGender = gender !== undefined && !genderIsValid

		if (stripVariety || stripForm || stripGender) {
			navigate({
				replace: true,
				search: (s) => ({
					...s,
					...(stripVariety ? { variety: undefined } : {}),
					...(stripForm ? { form: undefined } : {}),
					...(stripGender ? { gender: undefined } : {})
				})
			})
		}
	}, [variety, form, gender, activeVariety.name, activeForm.name, genderIsValid, navigate])
}
