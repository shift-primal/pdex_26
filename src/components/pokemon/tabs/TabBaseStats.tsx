import type { TabProps } from '#/types/props/tabs';

export const TabBaseStats = ({ pokemon }: Pick<TabProps, 'pokemon'>) => {
    return (
        <>
            <span>BaseStats</span>
            <span>{pokemon.name}</span>
        </>
    );
};
