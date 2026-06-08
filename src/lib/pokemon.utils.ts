import type { RawNamedResource } from '#/types/generic';
import type { PokemonEvolutionNode } from '#/types/pokemon';
import type { AdjacentPokemon } from '#/types/raw/list';

export const findAdjacentPokemon = (currId: number, list: RawNamedResource[]): AdjacentPokemon => {
    const MAX_DEX_ID = 1025;
    const index = currId - 1;
    return {
        prev: list[(index - 1 + MAX_DEX_ID) % MAX_DEX_ID],
        next: list[(index + 1) % MAX_DEX_ID]
    };
};

export const flattenEvolutions = (node: PokemonEvolutionNode): PokemonEvolutionNode[] => [
    node,
    ...node.evolvesTo.flatMap(flattenEvolutions)
];
