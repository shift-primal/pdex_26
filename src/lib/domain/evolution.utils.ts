import type { PokemonEvolutionChainLink } from "#/types/pokemon"

export const flattenEvolutions = (node: PokemonEvolutionChainLink): PokemonEvolutionChainLink[] => [
	node,
	...node.evolvesTo.flatMap(flattenEvolutions)
]
