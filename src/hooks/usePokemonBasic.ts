import { selectPokemonBasic } from '#/lib/parsers/pokemon';
import { fetchPokemon } from '#/services/api';
import type { PokemonBasic } from '#/types/pokemon';
import type { RawPokemon } from '#/types/raw/pokemon';
import { keepPreviousData, queryOptions, useSuspenseQuery } from '@tanstack/react-query';

export function pokemonBasicQueryOptions(nameOrId: string) {
    return queryOptions<RawPokemon, Error, PokemonBasic>({
        queryKey: ['pokemon', 'basic', nameOrId],
        queryFn: () => fetchPokemon(nameOrId),
        select: selectPokemonBasic,
        enabled: !!nameOrId,
        placeholderData: keepPreviousData,
        staleTime: Infinity
    });
}

export const usePokemonBasic = (nameOrId: string) =>
    useSuspenseQuery(pokemonBasicQueryOptions(nameOrId));
