import type { PokemonElementalType } from '#/types/pokemon';
import SVG from 'react-inlinesvg';
import { capFirstLetter } from '#/lib/pokemon/format';

const ElementalTypeBadge = ({ type }: { type: PokemonElementalType }) => {
    return (
        <div
            style={{ backgroundColor: type.color }}
            className="text-center px-1.5 py-1 w-24 rounded-full flex justify-center gap-x-2 items-center"
        >
            <div className="aspect-square rounded-full bg-background p-1">
                <SVG
                    src={type.icons.symbol}
                    className="h-4 w-4"
                    description={`Icon for ${type.name}`}
                    preProcessor={(code) => code.replace(/fill=".*?"/g, `fill="${type.color}"`)}
                />
            </div>
            <span className="font-semibold text-background text-sm">
                {capFirstLetter(type.name)}
            </span>
        </div>
    );
};

export const PokemonElementalTypes = ({ types }: { types: PokemonElementalType[] }) => {
    return (
        <div className="flex gap-x-2 px-4">
            {types.map((t) => (
                <ElementalTypeBadge key={t.name} type={t} />
            ))}
        </div>
    );
};
