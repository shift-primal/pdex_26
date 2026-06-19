import type { RawNamedResource } from "#/types/generic"

export type RawEvolutionChainLink = {
	evolves_to: RawEvolutionChainLink[]
	is_baby: boolean
	species: RawNamedResource
}

export interface RawEvolutionChain {
	id: number
	chain: RawEvolutionChainLink
}
