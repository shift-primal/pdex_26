import { createFileRoute, Link } from '@tanstack/react-router';

const Home = () => {
    return (
        <div className="p-8">
            <Link to="/pokedex" className="border border-pink-400">
                Pokedex
            </Link>
        </div>
    );
};

export const Route = createFileRoute('/')({ component: Home });
