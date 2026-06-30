import { TypeRelations } from "#/components/details/TypeRelations"
import { usePokemonDetailFromRoute } from "#/queries/detail"

export const Relations = () => {
	const { activeVariety } = usePokemonDetailFromRoute()
	return <TypeRelations types={activeVariety.types} />
}
