import { GenderSwitcher } from "#/components/details/GenderSwitcher"
import { SpriteWrapper } from "#/components/SpriteWrapper"
import { DetailTabs } from "#/components/DetailTabs"
import { resolveFrontSprite } from "#/lib/domain/pokemon.utils"
import { formatId, formatText } from "#/lib/format"
import { usePokemonDetail } from "#/queries/detail"
import type { Gender } from "#/types/pokemon"
import type { Tab } from "#/config/general.config"

import { useAdjacentPokemon } from "#/queries/adjacent"
import { PokemonNavigation } from "#/components/details/PokemonNavigation"
import { useNormalizeSearch } from "#/hooks/useNormalizeSearch"
import { useAdjacentHotkeys } from "#/hooks/useAdjacentHotkeys"

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
	const neighbors = useAdjacentPokemon(species.id)

	useNormalizeSearch({ species, activeVariety, activeForm, variety, form, gender })
	useAdjacentHotkeys(neighbors)

	const sprite = resolveFrontSprite(activeVariety, activeForm, gender)
	const fallbackSprite = resolveFrontSprite(activeVariety, activeForm)
	const title = formatText(activeForm.displayName)

	return (
		<div className="mx-auto flex max-w-md flex-col items-center gap-4 p-8">
			<span className="text-sm text-gray-500">{formatId(species.id)}</span>
			<h1 className="text-3xl font-bold">{title}</h1>

			<PokemonNavigation neighbors={neighbors} />

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

			<DetailTabs tab={tab} />
		</div>
	)
}
