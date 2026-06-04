import { PokemonImage } from '#/components/pokemoncard/PokemonImage';
import type { RawPokemon } from '#/types/raw/pokemon';
import { formatName } from '#/lib/pokemon/format';
import { Link } from '@tanstack/react-router';

export type EntryData = { name: string; sprite: string };

export const selectBasic = (p: RawPokemon): EntryData => ({
    name: p.name,
    sprite: p.sprites.other['official-artwork'].front_default ?? p.sprites.front_default ?? ''
});

export const PokemonEntry = ({
    name,
    sprite,
    isCurrent = false,
    size
}: EntryData & { isCurrent?: boolean; size?: 'xs' | 'sm' }) => (
    <Link
        to="/pokedex/$id"
        params={{ id: name }}
        search={(s) => s}
        className="flex flex-col items-center min-w-fit"
    >
        <div className="flex-1 flex items-center">
            <PokemonImage sprite={sprite} size={size ?? (isCurrent ? 'sm' : 'xs')} name={name} />
        </div>
        <span className={isCurrent ? 'font-semibold' : ''}>{formatName(name)}</span>
    </Link>
);
