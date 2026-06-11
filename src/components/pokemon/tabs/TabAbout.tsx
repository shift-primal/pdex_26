import { TypeBadge } from "#/components/pokemon/TypeBadge";
import { usePokemonCard } from "#/context/PokemonCardContext";

export const TabAbout = () => {
	const { active } = usePokemonCard();
	return (
		<>
			<span>About</span>
			<div className="flex items-center gap-x-4">
				{active.types.map((t) => (
					<TypeBadge key={t.name} type={t} />
				))}
			</div>
			<span>{active.name}</span>
		</>
	);
};
