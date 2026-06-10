import { PokemonTypes } from '#/components/pokemon/PokemonTypes';
import type { TabProps } from '#/types/props/tabs';

export const TabAbout = ({ pokemon }: Pick<TabProps, 'pokemon'>) => {
    return (
        <>
            <span>About</span>
            <PokemonTypes types={pokemon.types} />
            <span>{pokemon.name}</span>
        </>
    );
};
