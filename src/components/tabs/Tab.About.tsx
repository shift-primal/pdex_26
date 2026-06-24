import { TemporaryWrapper } from "#/components/TemporaryWrapper"
import { usePokemonDetailFromRoute } from "#/queries/detail"

export const About = () => {
	const { species, activeVariety } = usePokemonDetailFromRoute()

	return (
		<TemporaryWrapper title="About">
			<p>{activeVariety.weight}</p>
			<p>{activeVariety.height}</p>
			<p>{species.habitat}</p>
		</TemporaryWrapper>
	)
}
