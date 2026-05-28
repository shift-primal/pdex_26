import { PokemonCard } from '#/components/PokemonCard';
import { usePokemon } from '#/hooks/usePokemon';
import { createFileRoute } from '@tanstack/react-router';

const Home = () => {
    const { data: pokemon, isLoading, isError } = usePokemon('4');

    if (isLoading) return <div>Loading...</div>;
    if (!pokemon || isError) return <div>Error</div>;

    return (
        <div className="p-8">
            <PokemonCard pokemon={pokemon} />
        </div>
    );
};

export const Route = createFileRoute('/')({ component: Home });
