import { TypeBadge } from '#/components/pokemoncard/TypeBadge';
import type { PokemonElementalType } from '#/types/pokemon';

export const PokemonTypes = ({ types }: { types: PokemonElementalType[] }) => {
    return (
        <div className="flex gap-x-2 px-2">
            {types.map((t) => (
                <TypeBadge type={t} />
            ))}
        </div>
    );
};
