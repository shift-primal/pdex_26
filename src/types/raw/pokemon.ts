import type { RawNamedResource } from '#/types/generic';

export type RawElementalType = {
    slot: number;
    type: RawNamedResource;
};

export type RawStat = {
    base_stat: number;
    stat: RawNamedResource;
};

export type RawSprites = {
    front_default: string;
    back_default: string;
    front_shiny: string;
    back_shiny: string;
    other: {
        'showdown': {
            front_default: string;
            back_default: string;
            front_shiny: string;
            back_shiny: string;
        };
        'official-artwork': {
            front_default: string;
            front_shiny: string;
        };
    };
};

export type RawCries = {
    latest: string;
    legacy: string;
};

export type RawListResponse = {
    count: number;
    results: RawNamedResource[];
};

export type RawListTypeResponse = {
    pokemon: {
        pokemon: RawNamedResource;
    }[];
};

export interface RawPokemon {
    id: number;
    name: string;
    height: number;
    weight: number;
    types: RawElementalType[];
    stats: RawStat[];
    sprites: RawSprites;
    cries: RawCries;
}
