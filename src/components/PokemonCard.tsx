import type { Pokemon } from '#/types/pokemon';

export const PokemonCard = ({ pokemon }: { pokemon: Pokemon }) => {
    return (
        <div>
            <span className="text-red-400">name: {pokemon.name}</span>
        </div>
    );
};
