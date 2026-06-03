import type { ELEMENTAL_TYPES, FORM_CATEGORIES, GENERATIONS, STATS } from '#/constants';
import type { Icon } from '@phosphor-icons/react';

export type ElementalTypeName = keyof typeof ELEMENTAL_TYPES;
export type StatName = keyof typeof STATS;
export type FormCategoryName = keyof typeof FORM_CATEGORIES;
export type PokemonGeneration = (typeof GENERATIONS)[keyof typeof GENERATIONS];

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
    color: string;
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
    evolvesFrom: string | null;
    evolvesTo: string[];
};

export type PokemonForm = {
    isDefault: boolean;
    name: string;
    formType: string | null;
};

export interface Pokemon {
    id: number;
    name: string;
    generation: PokemonGeneration | null;
    flavorText: string;
    height: number;
    weight: number;
    types: PokemonElementalType[];
    stats: PokemonStat[];
    sprites: PokemonSprites;
    cries: PokemonCries;
    status: PokemonStatus;
    evolution: PokemonEvolutionInfo | null;
    habitat: string;
    forms: PokemonForm[];
    isDefault: boolean;
}
