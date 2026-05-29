import { fetchEvolutionChain, fetchPokemon, fetchSpecies } from '#/services/api';
import { toPokemon } from '#/lib/utils-pokemon';
import type { Pokemon } from '#/types/pokemon';
import type { RawPokemon } from '#/types/raw/pokemon';
import type { RawSpecies } from '#/types/raw/species';
import { useQuery } from '@tanstack/react-query';
import type { RawEvolutionChain } from '#/types/raw/evolutionchain';

export const usePokemon = (nameOrId: string) =>
    useQuery<[RawPokemon, RawSpecies, RawEvolutionChain | null], Error, Pokemon>({
        queryKey: ['pokemon', nameOrId],
        queryFn: async () => {
            const [pokemon, species] = await Promise.all([
                fetchPokemon(nameOrId),
                fetchSpecies(nameOrId)
            ]);
            const evolution = species.evolution_chain
                ? await fetchEvolutionChain(species.evolution_chain.url)
                : null;

            return [pokemon, species, evolution] as const;
        },
        select: toPokemon,
        enabled: !!nameOrId
    });
