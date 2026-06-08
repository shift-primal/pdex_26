import type { RawNamedResource } from '#/types/generic';

export interface RawListResponse {
    count: number;
    results: RawNamedResource[];
}

export interface AdjacentPokemon {
    prev: RawNamedResource;
    next: RawNamedResource;
}
