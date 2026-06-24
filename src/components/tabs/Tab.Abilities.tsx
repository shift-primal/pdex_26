import { AbilityList } from "#/components/details/AbilitiesList"
import { TemporaryWrapper } from "#/components/TemporaryWrapper"
import { usePokemonDetailFromRoute } from "#/queries/detail"

export const Abilities = () => {
	const { activeVariety } = usePokemonDetailFromRoute()

	return (
		<TemporaryWrapper title="Abilities">
			<AbilityList abilities={activeVariety.abilities} />
		</TemporaryWrapper>
	)
}
