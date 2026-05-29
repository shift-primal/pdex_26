import type { RawNamedResource } from '#/types/generic';

type RawVariety = {
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
    is_baby: boolean;
    is_legendary: boolean;
    is_mythical: boolean;
    habitat: RawNamedResource;
    varieties?: RawVariety[];
    evolves_from_species?: RawNamedResource;
    evolution_chain?: {
        url: string;
    };
}
