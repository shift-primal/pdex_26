import type { RawNamedResource } from '#/types/generic';

export type RawEvolutionNode = {
    evolves_to: RawEvolutionNode[];
    is_baby: boolean;
    species: RawNamedResource;
};

export interface RawEvolutionChain {
    id: number;
    chain: RawEvolutionNode;
}
