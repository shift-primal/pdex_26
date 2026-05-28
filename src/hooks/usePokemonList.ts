import { fetchPokemonList } from '#/api/api';
import { type SearchPokemonInput } from '#/utils/searchPokemonSchema';
import { useQuery } from '@tanstack/react-query';

export const usePokemonList = (input: SearchPokemonInput) => {
    const { search, type, page, pageSize } = input;

    return useQuery({
        queryKey: ['pokemon', 'list', { type }],
        queryFn: () => fetchPokemonList(type),
        select: (data) => {
            const pageStart = (page - 1) * pageSize;
            const pageEnd = pageStart + pageSize;

            const filtered = data.filter((p) => p.name.includes(search ?? ''));
            const sliced = filtered.slice(pageStart, pageEnd);

            return { results: sliced, total: filtered.length };
        }
    });
};
