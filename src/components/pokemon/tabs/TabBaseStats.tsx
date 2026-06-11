import { usePokemonCard } from "#/context/PokemonCardContext";

export const TabBaseStats = () => {
	const { active } = usePokemonCard();
	return (
		<>
			<span>BaseStats</span>
			<span>{active.name}</span>
		</>
	);
};
