import type { PokemonEvolutionChain } from '#/types/pokemon';
import type { RawEvolution } from '#/types/raw/evolutionchain';

export const parseEvolutionChain = (chain: RawEvolution, stage = 0): PokemonEvolutionChain => ({
    name: chain.species.name,
    isBaby: chain.is_baby,
    stage,
    evolvesTo: chain.evolves_to.map((e) => parseEvolutionChain(e, stage + 1))
});

export const findStage = (chain: PokemonEvolutionChain, name: string): number => {
    if (chain.name === name) return chain.stage;
    for (const child of chain.evolvesTo) {
        const stage = findStage(child, name);
        if (stage !== -1) return stage;
    }
    return -1;
};

export const findPrevEvolution = (chain: PokemonEvolutionChain, name: string): string | null => {
    for (const child of chain.evolvesTo) {
        if (child.name === name) return chain.name;
        const result = findPrevEvolution(child, name);
        if (result) return result;
    }
    return null;
};

export const findNextEvolution = (chain: PokemonEvolutionChain, name: string): string[] => {
    if (chain.name === name) return chain.evolvesTo.map((e) => e.name);
    for (const child of chain.evolvesTo) {
        if (child.name === name) return child.evolvesTo.map((e) => e.name);
        const result = findNextEvolution(child, name);
        if (result.length) return result;
    }
    return [];
};
