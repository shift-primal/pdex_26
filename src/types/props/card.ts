import type { Pokemon, PokemonBasic } from '#/types/pokemon';
import type { TabProps } from '#/types/props/tabs';

export interface PokemonCardProps extends TabProps {
    activePokemon: Pokemon;
    activeForm: PokemonBasic;
    activeTab: string;
    onTabChange: (tab: string) => void;
}
