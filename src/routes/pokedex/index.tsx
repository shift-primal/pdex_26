import { LoadingComponent } from '#/components/layout/LoadingComponent';
import { usePokemonList } from '#/hooks/usePokemonList';
import { searchPokemonSchema } from '#/lib/schemas/searchPokemonSchema';
import { createFileRoute, ErrorComponent, Link } from '@tanstack/react-router';

const PokedexPage = () => {
    const search = Route.useSearch();
    const { data: pokemonList, isLoading, isError, error } = usePokemonList(search);

    if (isLoading) {
        return <LoadingComponent />;
    }
    if (isError || !pokemonList) {
        return <ErrorComponent error={error} />;
    }

    return (
        <div>
            {pokemonList.results.map((p) => (
                <Link to="/pokedex/$id" params={{ id: p.name }} key={p.name}>
                    {p.name}
                </Link>
            ))}
        </div>
    );
};

export const Route = createFileRoute('/pokedex/')({
    component: PokedexPage,
    validateSearch: searchPokemonSchema
});
