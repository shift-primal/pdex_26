import { usePokemon } from '#/hooks/usePokemon';
import { createFileRoute, Link } from '@tanstack/react-router';

const Home = () => {
    const { data: pokemon, isLoading, isError } = usePokemon('4');

    if (isLoading) return <div>Loading...</div>;
    if (!pokemon || isError) return <div>Error</div>;

    return (
        <div className="p-8">
            <Link to="/pokedex" className="border border-pink-400">
                Pokedex
            </Link>
        </div>
    );
};

export const Route = createFileRoute('/')({ component: Home });
