import { TypeRelations } from "#/components/details/TypeRelations"
import { usePokemonDetailFromRoute } from "#/queries/detail"

export const Relations = () => {
	const { species, activeVariety } = usePokemonDetailFromRoute()
	return (
		<div>
			<TypeRelations types={activeVariety.types} />
		</div>
	)
}
