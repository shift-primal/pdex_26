import { EvolutionChain } from "#/components/details/EvolutionChain"
import { GenderSwitcher } from "#/components/details/GenderSwitcher"
import { VarietySwitcher } from "#/components/details/VarietySwitcher"
import { SpriteWrapper } from "#/components/SpriteWrapper"
import { resolveFrontSprite } from "#/lib/domain/pokemon.utils"
import { formatId, formatText } from "#/lib/format"
import { usePokemonDetail } from "#/queries/detail"
import type { Gender } from "#/types/pokemon"
import { useNavigate } from "@tanstack/react-router"
import { useEffect } from "react"

export const PokemonDetails = ({
	id,
	variety,
	form,
	gender
}: {
	id: string
	variety?: string
	form?: string
	gender?: Gender
}) => {
	const { species, activeVariety, activeForm } = usePokemonDetail(id, variety, form)

	const navigate = useNavigate({ from: "/pokemon/$id" })
	useEffect(() => {
		const stripVariety = variety !== undefined && variety !== activeVariety.name
		const stripForm = form !== undefined && form !== activeForm.name
		if (stripVariety || stripForm) {
			navigate({
				replace: true,
				search: (s) => ({
					...s,
					...(stripVariety ? { variety: undefined } : {}),
					...(stripForm ? { form: undefined } : {})
				})
			})
		}
	}, [variety, form, activeVariety.name, activeForm.name, navigate])

	const sprite = resolveFrontSprite(activeVariety, activeForm, gender)

	const title = formatText(activeForm.displayName)

	return (
		<div className="mx-auto flex max-w-md flex-col items-center gap-4 p-8">
			<span className="text-sm text-gray-500">{formatId(species.id)}</span>
			<h1 className="text-3xl font-bold">{title}</h1>

			<VarietySwitcher species={species} activeVariety={activeVariety} />
			<GenderSwitcher species={species} activeVariety={activeVariety} activeForm={activeForm} gender={gender} />
			<EvolutionChain species={species} />

			{sprite && <SpriteWrapper spriteUrl={sprite} alt={title} size={256} />}

			<div className="flex gap-2">
				{activeVariety.types.map((t) => (
					<span key={t.name} className="rounded bg-gray-200 px-2 py-1 text-sm">
						{t.name}
					</span>
				))}
			</div>

			<p className="text-center text-sm text-gray-600">{species.flavorText}</p>

			<ul className="w-full">
				{activeVariety.stats.map((s) => (
					<li key={s.name} className="flex justify-between border-b py-1 text-sm">
						<span>{s.name}</span>
						<span className="font-medium">{s.value}</span>
					</li>
				))}
			</ul>
		</div>
	)
}
