import SVG from 'react-inlinesvg';
import type { PokemonElementalType } from '#/types/pokemon';

const TypeBadge = ({ type }: { type: PokemonElementalType }) => {
    return (
        <div
            className="w-24 rounded-full flex justify-center gap-x-2 items-center py-1"
            style={{ backgroundColor: type.color }}
        >
            <div className="aspect-square rounded-full bg-background p-1">
                <SVG
                    src={type.icon}
                    className="h-4 w-4"
                    description={`Icon for ${type.name}`}
                    preProcessor={(code) => code.replace(/fill=".*?"/g, `fill="${type.color}"`)}
                />
            </div>
            <span className="font-semibold text-background text-sm capitalize">{type.name}</span>
        </div>
    );
};

export const PokemonTypes = ({ types }: { types: PokemonElementalType[] }) => {
    return (
        <div className="flex items-center gap-x-4">
            {types.map((t) => (
                <TypeBadge key={t.name} type={t} />
            ))}
        </div>
    );
};
