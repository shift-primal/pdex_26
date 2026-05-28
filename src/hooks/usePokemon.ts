import { fetchPokemon } from '#/api/api';
import { toPokemon } from '#/lib/utils-pokemon';
import { useQuery } from '@tanstack/react-query';

export const usePokemon = (nameOrId: string) =>
    useQuery({
        queryKey: ['pokemon', nameOrId],
        queryFn: () => fetchPokemon(nameOrId),
        select: toPokemon,
        enabled: !!nameOrId
    });
