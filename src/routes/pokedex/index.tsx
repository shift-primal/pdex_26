import { ErrorComponent } from '#/components/ErrorComponent';
import { LoadingComponent } from '#/components/LoadingComponent';
import { usePokemonList } from '#/hooks/usePokemonList';
import { searchPokemonSchema } from '#/utils/searchPokemonSchema';
import { createFileRoute } from '@tanstack/react-router';

const PokedexPage = () => {
    const search = Route.useSearch();
    const { data: pokemonList, isLoading, isError } = usePokemonList(search);

    if (isLoading) {
        return <LoadingComponent />;
    }
    if (isError || !pokemonList) {
        return <ErrorComponent />;
    }

    return (
        <div>
            {pokemonList.results.map((p) => (
                <div>{p.name}</div>
            ))}
        </div>
    );
};

export const Route = createFileRoute('/pokedex/')({
    component: PokedexPage,
    validateSearch: searchPokemonSchema
});
