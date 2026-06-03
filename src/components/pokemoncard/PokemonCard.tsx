import { CardBackground } from '#/components/pokemoncard/CardBackground';
import { PokemonImage } from '#/components/pokemoncard/PokemonImage';
import { PokemonTitle } from '#/components/pokemoncard/PokemonTitle';
import { PokemonTypes } from '#/components/pokemoncard/PokemonTypes';
import { PokemonTabs } from '#/components/pokemoncard/tabs/PokemonTabs';
import type { Pokemon } from '#/types/pokemon';

export const PokemonCard = ({ pokemon }: { pokemon: Pokemon }) => {
    console.log(pokemon);

    const hasEvolutions =
        pokemon.evolution?.evolvesFrom !== null || pokemon.evolution?.evolvesTo.length > 0;

    const hasForms = pokemon.forms.length > 0;

    return (
        <div className="relative overflow-x-hidden h-screen flex flex-col">
            <CardBackground type={pokemon.types[0]} />
            <PokemonImage sprite={pokemon.sprites.front} />
            <PokemonTitle name={pokemon.name} id={pokemon.id} isDefault={pokemon.isDefault} />
            <PokemonTypes types={pokemon.types} />
            <PokemonTabs pokemon={pokemon} hasEvolutions={hasEvolutions} hasForms={hasForms} />
        </div>
    );
};
