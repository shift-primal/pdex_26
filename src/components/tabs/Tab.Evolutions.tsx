import { EvolutionChain } from "#/components/details/EvolutionChain"
import { usePokemonDetailFromRoute } from "#/queries/detail"

export const Evolutions = () => {
	const { species } = usePokemonDetailFromRoute()

	return (
		<div>
			<EvolutionChain species={species} />
		</div>
	)
}
