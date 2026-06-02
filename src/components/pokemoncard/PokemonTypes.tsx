import type { PokemonElementalType } from '#/types/pokemon';
import SVG from 'react-inlinesvg';
import { capFirstLetter } from '#/lib/utils-general';

const TypeBadge = ({ type }: { type: PokemonElementalType }) => {
    return (
        <div
            style={{ backgroundColor: type.color }}
            className="text-center px-3 py-1 w-28 rounded-full flex justify-center gap-x-2"
        >
            <div className="aspect-square rounded-full bg-background p-1">
                <SVG
                    src={type.icons.symbol}
                    className="h-4 w-4"
                    description={`Icon for ${type.name}`}
                    preProcessor={(code) => code.replace(/fill=".*?"/g, `fill="${type.color}"`)}
                />
            </div>
            <span className="font-semibold text-white">{capFirstLetter(type.name)}</span>
        </div>
    );
};

export const PokemonTypes = ({ types }: { types: PokemonElementalType[] }) => {
    return (
        <div className="flex gap-x-2 px-2">
            {types.map((t) => (
                <TypeBadge key={t.name} type={t} />
            ))}
        </div>
    );
};
