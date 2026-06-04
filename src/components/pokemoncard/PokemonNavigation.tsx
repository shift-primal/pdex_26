import { useAdjacentPokemon } from '#/hooks/useAdjacentPokemon';
import { ArrowLeftIcon, ArrowRightIcon, type Icon } from '@phosphor-icons/react';
import { Link } from '@tanstack/react-router';

// TODO Fiks så left arrow alltid er left og right alltid er right (ml-auto?)

const NavArrow = ({ ArrowIcon, id, color }: { ArrowIcon: Icon; id: string; color: string }) => (
    <div className="rounded-full p-1" style={{ backgroundColor: color }}>
        <Link to="/pokedex/$id" params={{ id }} search={(s) => s}>
            <ArrowIcon size={20} className="text-background" />
        </Link>
    </div>
);

export const PokemonNavigation = ({ currentId }: { currentId: number }) => {
    const { prev, next } = useAdjacentPokemon(currentId);

    return (
        <div className="absolute flex gap-2 justify-between w-full px-4 top-1/3 -translate-y-1/2">
            {prev && <NavArrow id={prev.name} ArrowIcon={ArrowLeftIcon} color={prev.color} />}
            {next && <NavArrow id={next.name} ArrowIcon={ArrowRightIcon} color={next.color} />}
        </div>
    );
};
