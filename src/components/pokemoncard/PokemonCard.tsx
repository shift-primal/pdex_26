import { CardBackground } from '#/components/pokemoncard/CardBackground';
import { PokemonImage } from '#/components/pokemoncard/PokemonImage';
import { PokemonTitle } from '#/components/pokemoncard/PokemonTitle';
import { PokemonTypes } from '#/components/pokemoncard/PokemonTypes';
import type { Pokemon } from '#/types/pokemon';

export const PokemonCard = ({ pokemon }: { pokemon: Pokemon }) => {
    return (
        <div className="relative overflow-hidden">
            <CardBackground type={pokemon.types[0]} />
            <PokemonImage sprite={pokemon.sprites.front} />
            <PokemonTitle name={pokemon.name} id={pokemon.id} />
            <PokemonTypes types={pokemon.types} />
        </div>
    );
};
