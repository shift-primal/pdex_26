import type { TabProps } from '#/types/props/tabs';

export const TabForms = ({ pokemon, forms }: Pick<TabProps, 'pokemon' | 'forms'>) => {
    return (
        <>
            <span>Forms</span>
            <span>{pokemon.name}</span>
        </>
    );
};
