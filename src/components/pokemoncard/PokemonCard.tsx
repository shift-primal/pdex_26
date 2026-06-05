import { PokemonImage } from '#/components/pokemoncard/PokemonImage';
import { PokemonTitle } from '#/components/pokemoncard/PokemonTitle';
import { PokemonElementalTypes } from '#/components/pokemoncard/PokemonElementalTypes';
import { PokemonTabs } from '#/components/pokemoncard/tabs/PokemonTabs';
import type { Pokemon } from '#/types/pokemon';
import { CardBg } from '#/components/pokemoncard/CardBg';
import { useState } from 'react';
import { PokemonActionButtons } from '#/components/pokemoncard/PokemonActionButtons';

type PokemonCardProps = {
    pokemon: Pokemon;
    activeTab: string;
    onTabChange: (tab: string) => void;
};

export const PokemonCard = ({ pokemon, activeTab, onTabChange }: PokemonCardProps) => {
    const [shiny, setShiny] = useState(false);

    const hasEvolutions =
        pokemon.evolution?.evolvesFrom !== null || pokemon.evolution?.evolvesTo.length > 0;

    const hasForms = pokemon.forms.length > 1;

    return (
        <div className="relative overflow-x-hidden h-screen flex flex-col transform-gpu">
            <CardBg type={pokemon.types[0]} />
            <PokemonImage
                sprite={shiny ? pokemon.sprites.shiny : pokemon.sprites.default}
                name={pokemon.name}
            />
            <PokemonTitle name={pokemon.name} id={pokemon.id} />
            <PokemonElementalTypes types={pokemon.types} />
            <PokemonTabs
                pokemon={pokemon}
                hasEvolutions={hasEvolutions}
                hasForms={hasForms}
                activeTab={activeTab}
                onTabChange={onTabChange}
            />
            <PokemonActionButtons sound={pokemon.cries.latest} shiny={shiny} setShiny={setShiny} />
        </div>
    );
};
