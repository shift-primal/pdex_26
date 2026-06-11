import { PokemonBasicEntry } from "#/components/pokemon/PokemonBasicEntry";
import { usePokemonCard } from "#/context/PokemonCardContext";

export const TabForms = () => {
	const { active, forms } = usePokemonCard();

	if (!forms || forms.length <= 1) return <p>no forms</p>;
	return (
		<>
			<p>{active.name}</p>
			<div className="flex justify-center items-center gap-x-2">
				{forms.map((p) => (
					<PokemonBasicEntry
						key={p.id}
						pokemon={p}
						baseName={active.name}
					/>
				))}
			</div>
		</>
	);
};
