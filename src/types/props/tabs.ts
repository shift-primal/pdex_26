import type { Pokemon, PokemonBasic } from '#/types/pokemon';

export type TabProps = {
    pokemon: Pokemon;
    evolutions: PokemonBasic[];
    forms: PokemonBasic[];
};
