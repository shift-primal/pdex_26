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

export interface Pokemon {
    id: number;
    name: string;
    height: number;
    weight: number;
    types: PokemonElementalType[];
    stats: PokemonStat[];
    sprites: PokemonSprites;
}
