import type { SearchPokemonInput } from "#/lib/schemas/searchPokemon";
import { fetchPokemonList } from "#/services/api";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";

export function pokemonListQueryOptions() {
	return queryOptions({
		queryKey: ["pokemon", "list"],
		queryFn: () => fetchPokemonList(),
		staleTime: Infinity
	});
}

export const usePokemonList = ({
	search,
	page,
	pageSize
}: SearchPokemonInput) => {
	return useSuspenseQuery({
		...pokemonListQueryOptions(),
		select: (data) => {
			const pageStart = (page - 1) * pageSize;
			const pageEnd = pageStart + pageSize;

			const filtered = data.filter((p) =>
				p.name.includes(search?.toLowerCase() ?? "")
			);
			const sliced = filtered.slice(pageStart, pageEnd);

			return { results: sliced, total: filtered.length };
		}
	});
};
