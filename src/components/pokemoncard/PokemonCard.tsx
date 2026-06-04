import { PokemonNavigation } from '#/components/pokemoncard/PokemonNavigation';
import { PokemonImage } from '#/components/pokemoncard/PokemonImage';
import { PokemonTitle } from '#/components/pokemoncard/PokemonTitle';
import { PokemonTypes } from '#/components/pokemoncard/PokemonTypes';
import { PokemonTabs } from '#/components/pokemoncard/tabs/PokemonTabs';
import type { Pokemon } from '#/types/pokemon';
import { CardBg } from '#/components/pokemoncard/CardBg';

type PokemonCardProps = {
    pokemon: Pokemon;
    activeTab: string;
    onTabChange: (tab: string) => void;
};

export const PokemonCard = ({ pokemon, activeTab, onTabChange }: PokemonCardProps) => {
    console.log(pokemon);
    const hasEvolutions =
        pokemon.evolution?.evolvesFrom !== null || pokemon.evolution?.evolvesTo.length > 0;

    const hasForms = pokemon.forms.length > 1;

    return (
        <div className="relative overflow-x-hidden h-screen flex flex-col">
            <CardBg type={pokemon.types[0]} />
            <PokemonNavigation currentId={pokemon.id} />
            <PokemonImage sprite={pokemon.sprites.front} name={pokemon.name} />
            <PokemonTitle name={pokemon.name} id={pokemon.id} />
            <PokemonTypes types={pokemon.types} />
            <PokemonTabs
                pokemon={pokemon}
                hasEvolutions={hasEvolutions}
                hasForms={hasForms}
                activeTab={activeTab}
                onTabChange={onTabChange}
            />
        </div>
    );
};
