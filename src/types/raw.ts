export type RawNamedResource = { name: string; url: string };

export type RawElementalTypes = {
    slot: number;
    type: RawNamedResource;
};

export type RawStats = {
    base_stat: number;
    stat: RawNamedResource;
};

export type RawSprites = {
    front_default: string;
    back_default: string;
    front_shiny: string;
    back_shiny: string;
    other: {
        showdown: {
            front_default: string;
            back_default: string;
            front_shiny: string;
            back_shiny: string;
        };
    };
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
    types: RawElementalTypes[];
    stats: RawStats[];
    sprites: RawSprites;
}
