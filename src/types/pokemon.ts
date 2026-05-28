import type { ELEMENTAL_TYPE_NAMES, STAT_NAMES } from '#/constants';

export type ElementalTypeName = (typeof ELEMENTAL_TYPE_NAMES)[number];
export type StatName = (typeof STAT_NAMES)[number];

export type PokemonElementalType = {
    slot: number;
    name: ElementalTypeName;
    icon?: string;
    url: string;
};

export type PokemonStat = {
    value: number;
    name: StatName;
    icon?: string;
    url: string;
};

export type PokemonSprites = {
    front: string;
    back: string;
    frontShiny: string;
    backShiny: string;
};

export interface Pokemon {
    id: number;
    name: string;
    height: number;
    weight: number;
    types: PokemonElementalType[];
    stats: PokemonStat[];
    sprites: PokemonSprites;
}
