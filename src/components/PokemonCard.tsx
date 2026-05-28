import { CardBackground } from '#/components/layout/CardBackground';
import type { Pokemon } from '#/types/pokemon';

export const PokemonCard = ({ pokemon }: { pokemon: Pokemon }) => {
    return (
        <div className="relative">
            <CardBackground type={pokemon.types[0]} />
        </div>
    );
};
