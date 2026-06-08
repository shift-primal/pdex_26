import { selectPokemon } from '#/lib/parsers/pokemon';
import { fetchEvolutionChain, fetchGeneration, fetchPokemon, fetchSpecies } from '#/services/api';
import type { Pokemon } from '#/types/pokemon';
import type { RawEvolutionChain } from '#/types/raw/evolution';
import type { RawGeneration } from '#/types/raw/generation';
import type { RawPokemon } from '#/types/raw/pokemon';
import type { RawSpecies } from '#/types/raw/species';
import { useSuspenseQuery } from '@tanstack/react-query';

export const usePokemon = (nameOrId: string) =>
    useSuspenseQuery<[RawPokemon, RawSpecies, RawEvolutionChain, RawGeneration], Error, Pokemon>({
        queryKey: ['pokemon', 'full', nameOrId],
        queryFn: async () => {
            const pokemon = await fetchPokemon(nameOrId);
            const species = await fetchSpecies(pokemon.species.url);
            const evolution = await fetchEvolutionChain(species.evolution_chain.url);
            const generation = await fetchGeneration(species.generation.url);

            return [pokemon, species, evolution, generation] as const;
        },
        select: selectPokemon,
        staleTime: Infinity
    });
