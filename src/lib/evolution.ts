import type { PokemonEvolutionChain } from '#/types/evolution';

export type EvolutionPosition = {
    node: PokemonEvolutionChain;
    stage: number;
    evolvesFrom: string | null;
};

export function findEvolutionPosition(
    chain: PokemonEvolutionChain,
    name: string,
    stage = 0,
    parent: string | null = null
): EvolutionPosition | null {
    if (chain.name === name) return { node: chain, stage, evolvesFrom: parent };

    for (const next of chain.evolvesTo) {
        const found = findEvolutionPosition(next, name, stage + 1, chain.name);
        if (found) return found;
    }

    return null;
}
