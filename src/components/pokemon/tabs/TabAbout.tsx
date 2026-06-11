import { TypeBadge } from "#/components/pokemon/TypeBadge";
import type { TabProps } from "#/types/props/tabs";

export const TabAbout = ({ pokemon }: Pick<TabProps, "pokemon">) => {
	return (
		<>
			<span>About</span>
			<div className="flex items-center gap-x-4">
				{pokemon.types.map((t) => (
					<TypeBadge key={t.name} type={t} />
				))}
			</div>
			<span>{pokemon.name}</span>
		</>
	);
};
