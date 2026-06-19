import type { PokemonEvolutionNode } from "#/types/pokemon"

export const flattenEvolutions = (node: PokemonEvolutionNode): PokemonEvolutionNode[] => [
	node,
	...node.evolvesTo.flatMap(flattenEvolutions)
]
