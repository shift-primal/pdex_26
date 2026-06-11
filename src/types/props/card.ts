import type { Pokemon, PokemonBasic } from "#/types/pokemon";

export interface PokemonCardProps {
	base: Pokemon;
	active: Pokemon;
	evolutions: PokemonBasic[];
	forms: PokemonBasic[];
	activeTab: string;
	onTabChange: (tab: string) => void;
}
