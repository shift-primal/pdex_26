import type { TabProps } from '#/types/props/tabs';

export interface PokemonCardProps extends TabProps {
    activeTab: string;
    onTabChange: (tab: string) => void;
}
