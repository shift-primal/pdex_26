import { PokemonImage } from '#/components/pokemoncard/PokemonImage';
import { usePokemon } from '#/hooks/usePokemon';
import { capFirstLetter } from '#/lib/utils-general';
import { Link } from '@tanstack/react-router';

export const VarietyEntry = ({ name }: { name: string }) => {
    const { data: pokemon, isLoading, isError } = usePokemon(name);

    if (isLoading || isError || !pokemon) return null;

    return (
        <Link
            to="/pokedex/$id"
            params={{ id: pokemon.name }}
            className="flex flex-col items-center h-full"
        >
            <div className="flex-1 flex items-center">
                <PokemonImage sprite={pokemon.sprites.front} size="sm" />
            </div>
            <span className="font-semibold line-clamp-2">{capFirstLetter(name)}</span>
        </Link>
    );
};
