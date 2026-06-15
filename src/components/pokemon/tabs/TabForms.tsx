import { PokemonBasicEntry } from "#/components/pokemon/PokemonBasicEntry";
import { usePokemonCard } from "#/context/PokemonCardContext";

export const TabForms = () => {
	const { base, forms } = usePokemonCard();

	if (!forms || forms.length <= 1) return <p>no forms</p>;
	return (
		<div className="flex justify-center items-center gap-x-2">
			{forms.map((p) => (
				<PokemonBasicEntry
					key={p.id}
					pokemon={p}
					baseName={base.name}
				/>
			))}
		</div>
	);
};
