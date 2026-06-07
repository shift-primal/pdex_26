import type { PokemonEvolution } from '#/types/pokemon/evolution';
import type { ELEMENTAL_TYPES, FORM_CATEGORIES, GENERATIONS, STATS } from '#/constants/constants';
import type { Icon } from '@phosphor-icons/react';

export type ElementalTypeName = keyof typeof ELEMENTAL_TYPES;
export type StatName = keyof typeof STATS;
export type FormCategoryName = keyof typeof FORM_CATEGORIES;
export type PokemonGeneration = (typeof GENERATIONS)[keyof typeof GENERATIONS];

export type PokemonElementalType = {
    name: ElementalTypeName;
    color: string;
    icon: string;
};

export type PokemonStat = {
    color: string;
    name: StatName;
    value: number;
    icon: Icon;
};

export type PokemonSprites = {
    front: {
        default: string;
        female: string | null;
        shiny: string | null;
    };
    back: {
        default: string;
        female: string | null;
        shiny: string | null;
    };
};

export type PokemonCries = {
    latest: string;
    legacy: string;
};

export type PokemonForm = {
    category: FormCategoryName;
    isDefault: boolean;
    name: string;
};

export type PokemonGender = {
    hasGenderDifferences: boolean;
    genderRate: number | null;
};

export type PokemonClassification = {
    isBaby: boolean;
    isLegendary: boolean;
    isMythical: boolean;
};

export interface PokemonBasic {
    id: number;
    name: string;
    sprites: PokemonSprites;
    types: PokemonElementalType[];
}

export interface PokemonFull extends PokemonBasic {
    classification: PokemonClassification;
    cries: PokemonCries;
    evolution: PokemonEvolution;
    flavorText: string;
    forms: PokemonForm[];
    gender: PokemonGender;
    generation: PokemonGeneration | null;
    habitat: string;
    height: number;
    isDefault: boolean;
    shape: string;
    stats: PokemonStat[];
    weight: number;
}
