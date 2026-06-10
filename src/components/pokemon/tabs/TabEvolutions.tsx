import type { TabProps } from '#/types/props/tabs';

export const TabEvolutions = ({
    pokemon,
    evolutions
}: Pick<TabProps, 'pokemon' | 'evolutions'>) => {
    return (
        <>
            <span>Evolutions</span>
            <span>{pokemon.name}</span>
        </>
    );
};
