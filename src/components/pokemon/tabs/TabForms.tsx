import { PokemonBasicEntry } from "#/components/pokemon/PokemonBasicEntry";
import type { TabProps } from "#/types/props/tabs";

export const TabForms = ({
	pokemon,
	forms,
}: Pick<TabProps, "pokemon" | "forms">) => {
	return (
		<>
			<p>{pokemon.name}</p>
			<div className="flex justify-center items-center gap-x-2">
				{forms.map((p) => (
					<PokemonBasicEntry pokemon={p} baseName={pokemon.name} />
				))}
			</div>
		</>
	);
};
