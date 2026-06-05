import type { RawNamedResource } from '#/types/generic';

export type RawForm = {
    is_default: boolean;
    pokemon: RawNamedResource;
};

export type RawFlavorTextEntry = {
    flavor_text: string;
    language: RawNamedResource;
};

export interface RawSpecies {
    generation: RawNamedResource;
    flavor_text_entries: RawFlavorTextEntry[];
    has_gender_differences: boolean;
    gender_rate: number;
    shape: RawNamedResource;
    is_baby: boolean;
    is_legendary: boolean;
    is_mythical: boolean;
    habitat: RawNamedResource | null;
    varieties?: RawForm[];
    evolves_from_species?: RawNamedResource;
    evolution_chain?: {
        url: string;
    };
}
