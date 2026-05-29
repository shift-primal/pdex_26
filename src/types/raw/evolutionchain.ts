import type { RawNamedResource } from '#/types/generic';

export type RawEvolution = {
    is_baby: boolean;
    evolves_to: RawEvolution[];
    species: RawNamedResource;
};

export interface RawEvolutionChain {
    id: number;
    chain: RawEvolution;
}
