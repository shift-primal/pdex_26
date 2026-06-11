import { PokemonBasicEntry } from "#/components/pokemon/PokemonBasicEntry";
import { usePokemonCard } from "#/context/PokemonCardContext";

export const TabEvolutions = () => {
	const { active, evolutions } = usePokemonCard();

	if (!evolutions || evolutions.length <= 1) return <p>no evolutions</p>;
	return (
		<>
			<>
				<p>{active.name}</p>
				<div className="flex gap-x-2 items-center justify-center">
					{evolutions.map((p) => (
						<PokemonBasicEntry pokemon={p} />
					))}
				</div>
			</>
		</>
	);
};
