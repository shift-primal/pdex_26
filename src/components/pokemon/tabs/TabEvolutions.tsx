import { PokemonBasicEntry } from "#/components/pokemon/PokemonBasicEntry";
import { usePokemonCard } from "#/context/PokemonCardContext";

export const TabEvolutions = () => {
	const { base, evolutions } = usePokemonCard();

	if (!evolutions || evolutions.length <= 1) return <p>no evolutions</p>;
	return (
		<div className="flex gap-x-2 items-center justify-center">
			{evolutions.map((p) => (
				<PokemonBasicEntry
					key={p.id}
					pokemon={p}
					baseName={base.name}
				/>
			))}
		</div>
	);
};
