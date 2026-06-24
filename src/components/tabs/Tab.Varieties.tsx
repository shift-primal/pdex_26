import { VarietySwitcher } from "#/components/details/VarietySwitcher"
import { usePokemonDetailFromRoute } from "#/queries/detail"

export const Varieties = () => {
	const { species, activeVariety } = usePokemonDetailFromRoute()
	return (
		<div>
			<VarietySwitcher species={species} activeVariety={activeVariety} />
		</div>
	)
}
