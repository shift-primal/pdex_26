import { ErrorComponent } from '#/components/ErrorComponent';
import { LoadingComponent } from '#/components/LoadingComponent';
import { PokemonCard } from '#/components/PokemonCard';
import { usePokemon } from '#/hooks/usePokemon';
import { createFileRoute } from '@tanstack/react-router';

const PokemonCardPage = () => {
    const { id } = Route.useParams();
    const { data: pokemon, isLoading, isError } = usePokemon(id);

    if (isLoading) {
        return <LoadingComponent />;
    }
    if (isError || !pokemon) {
        return <ErrorComponent />;
    }

    return (
        <div>
            <PokemonCard pokemon={pokemon} />
        </div>
    );
};

export const Route = createFileRoute('/pokedex/$id')({
    component: PokemonCardPage
});
