import { GenderSwitcher } from "#/components/details/GenderSwitcher"
import { SpriteWrapper } from "#/components/SpriteWrapper"
import { DetailTabs } from "#/components/DetailTabs"
import { resolveFrontSprite, resolveGenderPresentation } from "#/lib/domain/pokemon.utils"
import { formatId, formatText } from "#/lib/format"
import { usePokemonDetail } from "#/queries/detail"
import type { Gender } from "#/types/pokemon"
import { useNavigate } from "@tanstack/react-router"
import { useEffect } from "react"
import type { Tab } from "#/config/general.config"

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

	const genderIsValid = resolveGenderPresentation(species, activeVariety).kind === "sprite" && gender === "female"

	const navigate = useNavigate({ from: "/pokemon/$id" })
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

	const sprite = resolveFrontSprite(activeVariety, activeForm, gender)
	const fallbackSprite = resolveFrontSprite(activeVariety, activeForm)

	const title = formatText(activeForm.displayName)

	return (
		<div className="mx-auto flex max-w-md flex-col items-center gap-4 p-8">
			<span className="text-sm text-gray-500">{formatId(species.id)}</span>
			<h1 className="text-3xl font-bold">{title}</h1>

			<GenderSwitcher species={species} activeVariety={activeVariety} activeForm={activeForm} gender={gender} />

			{sprite && (
				<SpriteWrapper spriteUrl={sprite} fallbackUrl={fallbackSprite} alt={title} size={256} scale={1.5} />
			)}

			<div className="flex gap-2">
				{activeVariety.types.map((t) => (
					<span key={t.name} className="rounded bg-gray-200 px-2 py-1 text-sm">
						{t.name}
					</span>
				))}
			</div>

			<p className="text-center text-sm text-gray-600">{species.flavorText}</p>

			<DetailTabs tab={tab} onTabChange={(v) => navigate({ replace: true, search: (s) => ({ ...s, tab: v }) })} />
		</div>
	)
}
