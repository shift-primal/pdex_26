import type { PokemonElementalType } from '#/types/pokemon';

export const CardBg = ({ type }: { type: PokemonElementalType }) => (
    <div
        className="absolute -z-60 w-full h-full"
        style={{ background: `linear-gradient(180deg, ${type.color}, #FFF 40%)` }}
    >
        <div
            style={{ backgroundColor: type.color }}
            className="absolute w-[140%] ml-[-20%] flex items-center justify-center pt-8 pb-12 rounded-b-full -z-50 bg-linear-to-t from-white/50 via-white/10"
        >
            <img src={type.icons.symbol} className="w-54 " />
        </div>
    </div>
);
