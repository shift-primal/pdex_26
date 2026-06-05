import { PokemonImage } from '#/components/pokemoncard/PokemonImage';
import type { RawPokemon } from '#/types/raw/pokemon';
import { formatName } from '#/lib/pokemon/format';
import { Link } from '@tanstack/react-router';
import { parseTypes } from '#/lib/pokemon/parse';
import type { PokemonElementalType } from '#/types/pokemon';
import SVG from 'react-inlinesvg';

export type EntryData = { name: string; sprite: string; types: PokemonElementalType[] };

export const selectBasic = (p: RawPokemon): EntryData => ({
    name: p.name,
    sprite: p.sprites.other['official-artwork'].front_default ?? p.name,
    types: parseTypes(p.types)
});

const SmallElementalTypeBadge = ({ type }: { type: PokemonElementalType }) => {
    return (
        <div className="aspect-square rounded-full p-1" style={{ backgroundColor: type.color }}>
            <SVG
                src={type.icons.symbol}
                className="h-4 w-4"
                description={`Icon for ${type.name}`}
            />
        </div>
    );
};

export const PokemonEntry = ({
    name,
    sprite,
    types,
    isCurrent = false,
    size
}: EntryData & { isCurrent?: boolean; isDefault?: boolean; size?: 'xs' | 'sm' }) => (
    <Link
        to="/pokedex/$id"
        params={{ id: name }}
        search={(s) => s}
        className="flex flex-col items-center min-w-fit"
    >
        <div className="h-24 w-24 flex items-center justify-center">
            <PokemonImage sprite={sprite} size={size ?? (isCurrent ? 'xs' : 'xxs')} name={name} />
        </div>
        <span
            className={
                isCurrent
                    ? 'font-semibold underline underline-offset-2 decoration-muted-foreground'
                    : ''
            }
        >
            {formatName(name, true)}
        </span>
        <div className="flex gap-x-2 px-4 mt-2">
            {types.map((t) => (
                <SmallElementalTypeBadge key={t.name} type={t} />
            ))}
        </div>
    </Link>
);
