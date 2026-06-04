import { ELEMENTAL_TYPES } from '#/constants';
import { fetchPokemon } from '#/services/api';
import type { ElementalTypeName } from '#/types/pokemon';
import type { RawPokemon } from '#/types/raw/pokemon';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';

const MAX_POKEMON_ID = 1025;

const selectBasic = (p: RawPokemon) => ({
    name: p.name,
    id: p.id,
    color: ELEMENTAL_TYPES[p.types[0].type.name as ElementalTypeName].color
});

const navQuery = (id: number) => ({
    queryKey: ['pokemon-nav', id] as const,
    queryFn: () => fetchPokemon(String(id)),
    staleTime: Infinity
});

export const useAdjacentPokemon = (currentId: number) => {
    const queryClient = useQueryClient();

    // Seed current to cache and prefetch next
    useEffect(() => {
        queryClient.prefetchQuery(navQuery(currentId));
        if (currentId + 2 <= MAX_POKEMON_ID) queryClient.prefetchQuery(navQuery(currentId + 2));
    }, [currentId, queryClient]);

    const prev = useQuery({
        ...navQuery(currentId - 1),
        enabled: currentId > 1,
        select: selectBasic
    });
    const next = useQuery({
        ...navQuery(currentId + 1),
        enabled: currentId < MAX_POKEMON_ID,
        select: selectBasic
    });

    return { prev: prev.data ?? null, next: next.data ?? null };
};
