import { PokemonBasicEntry } from "#/components/pokemon/PokemonBasicEntry";
import type { TabProps } from "#/types/props/tabs";

export const TabEvolutions = ({
	pokemon,
	evolutions,
}: Pick<TabProps, "pokemon" | "evolutions">) => {
	return (
		<>
			<>
				<p>{pokemon.name}</p>
				<div className="flex gap-x-2 items-center justify-center">
					{evolutions.map((p) => (
						<PokemonBasicEntry pokemon={p} />
					))}
				</div>
			</>
		</>
	);
};
