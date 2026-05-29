import type { ELEMENTAL_TYPES, STATS } from '#/constants';
import type { Icon } from '@phosphor-icons/react';

export type ElementalTypeName = keyof typeof ELEMENTAL_TYPES;
export type StatName = keyof typeof STATS;

export type PokemonElementalType = {
    slot: number;
    name: ElementalTypeName;
    color: string;
    icons: {
        name: string;
        symbol: string;
    };
};

export type PokemonStat = {
    value: number;
    name: StatName;
    icon: Icon;
};

export type PokemonSprites = {
    front: string;
    back: string;
    frontShiny: string;
    backShiny: string;
};

export type PokemonCries = {
    latest: string;
    legacy: string;
};

export type PokemonStatus = {
    baby: boolean;
    legendary: boolean;
    mythical: boolean;
};

export type PokemonEvolutionChain = {
    name: string;
    isBaby: boolean;
    stage: number;
    evolvesTo: PokemonEvolutionChain[];
};

export type PokemonEvolutionInfo = {
    stage: number;
    chain: PokemonEvolutionChain;
};

export interface Pokemon {
    id: number;
    name: string;
    generation: number;
    flavorText: string;
    height: number;
    weight: number;
    types: PokemonElementalType[];
    stats: PokemonStat[];
    sprites: PokemonSprites;
    cries: PokemonCries;
    status: PokemonStatus;
    evolution: PokemonEvolutionInfo | null;
}
