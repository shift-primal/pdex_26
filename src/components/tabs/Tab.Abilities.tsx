import { AbilityList } from "#/components/details/AbilitiesList"
import { usePokemonDetailFromRoute } from "#/queries/detail"

export const Abilities = () => {
	const { activeVariety } = usePokemonDetailFromRoute()
	return <AbilityList abilities={activeVariety.abilities} />
}
