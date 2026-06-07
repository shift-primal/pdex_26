import type { RawNamedResource } from '#/types/generic';

export type RawEvolution = {
    evolves_to: RawEvolution[];
    is_baby: boolean;
    species: RawNamedResource;
};

export interface RawEvolutionChain {
    id: number;
    chain: RawEvolution;
}

export type RawFlavorTextEntry = {
    flavor_text: string;
    language: RawNamedResource;
};

export type RawForm = {
    is_default: boolean;
    pokemon: RawNamedResource;
};

export interface RawSpecies {
    color: RawNamedResource;
    egg_groups: RawNamedResource[];
    evolves_from_species: RawNamedResource | null;
    evolution_chain: {
        url: string;
    };
    flavor_text_entries: RawFlavorTextEntry[];
    gender_rate: number;
    generation: RawNamedResource;
    habitat: RawNamedResource | null;
    has_gender_differences: boolean;
    is_baby: boolean;
    is_legendary: boolean;
    is_mythical: boolean;
    shape: RawNamedResource;
    varieties: RawForm[];
}
