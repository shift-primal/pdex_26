import { pokemonBasicQueryOptions } from '#/hooks/usePokemonBasic';
import { usePokemonList } from '#/hooks/usePokemonList';
import { searchPokemonSchema } from '#/lib/schemas/searchPokemon';
import { useQueries } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';

const Pokedex = () => {
    const search = Route.useSearch();
    const { data: pokemonList } = usePokemonList(search);

    const pokemonQueries = useQueries({
        queries: pokemonList.results.map((p) => pokemonBasicQueryOptions(p.name))
    });

    return (
        <div>
            {pokemonQueries.map((q) => (q.data ? <p key={q.data.name}>{q.data.name}</p> : null))}
        </div>
    );
};

export const Route = createFileRoute('/pokedex/')({
    component: Pokedex,
    validateSearch: searchPokemonSchema
});
