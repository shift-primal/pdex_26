export type PokemonEvolutionChain = {
    name: string;
    isBaby: boolean;
    evolvesTo: PokemonEvolutionChain[];
};

export type PokemonEvolution = {
    chain: PokemonEvolutionChain;
};
