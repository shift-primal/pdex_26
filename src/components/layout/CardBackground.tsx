import type { PokemonElementalType } from '#/types/pokemon';

export const CardBackground = ({ type }: { type: PokemonElementalType }) => {
    return (
        <div
            style={{ backgroundColor: type.color }}
            className="w-[140%] ml-[-20%] flex items-center justify-center pt-10 pb-16 rounded-b-[50%]"
        >
            <img src={type.icons.symbol} className="w-48 mask-b-from-65%" />
        </div>
    );
};
