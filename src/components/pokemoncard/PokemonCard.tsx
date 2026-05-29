import { CardBackground } from '#/components/pokemoncard/CardBackground';
import { PokemonImage } from '#/components/pokemoncard/PokemonImage';
import { PokemonTitle } from '#/components/pokemoncard/PokemonTitle';
import { TypeBadge } from '#/components/pokemoncard/TypeBadge';
import type { Pokemon } from '#/types/pokemon';

export const PokemonCard = ({ pokemon }: { pokemon: Pokemon }) => {
    console.log(pokemon);
    return (
        <div className="relative overflow-hidden">
            <CardBackground type={pokemon.types[0]} />
            <PokemonImage sprite={pokemon.sprites.front} />
            <PokemonTitle name={pokemon.name} id={pokemon.id} />
            <div className="flex gap-x-2 px-2">
                {pokemon.types.map((t) => (
                    <TypeBadge key={t.name} type={t} />
                ))}
            </div>
        </div>
    );
};
