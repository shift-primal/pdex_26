import { createContext, useContext } from "react";
import type { Pokemon, PokemonBasic } from "#/types/pokemon";

type PokemonCardContext = {
	base: Pokemon;
	active: PokemonBasic;
	evolutions: PokemonBasic[];
	forms: PokemonBasic[];
};

const PokemonCardContext = createContext<PokemonCardContext | null>(null);

export const usePokemonCard = () => {
	const ctx = useContext(PokemonCardContext);
	if (!ctx) throw new Error("usePokemonCard must be used inside PokemonCard");
	return ctx;
};

export default PokemonCardContext;
