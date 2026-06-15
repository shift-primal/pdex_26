import { PokemonSprite } from "#/components/pokemon/PokemonSprite";
import { TypeBadge } from "#/components/pokemon/TypeBadge";
import type { PokemonBasic } from "#/types/pokemon";
import { Link, useSearch } from "@tanstack/react-router";

export const PokemonBasicEntry = ({
	pokemon,
	baseName
}: {
	pokemon: PokemonBasic;
	baseName?: string;
}) => {
	const { tab } = useSearch({ from: "/pokemon/$id" });

	return (
		<Link
			to="/pokemon/$id"
			params={{ id: baseName ?? pokemon.name }}
			search={{ tab, form: baseName ? pokemon.name : undefined }}
		>
			<div className="flex flex-col gap-y-2 items-center justify-center border-2 h-fit w-fit">
				<PokemonSprite
					sprites={pokemon.sprites}
					name={pokemon.name}
					size="sm"
				/>
				<div className="flex gap-x-2">
					{pokemon.types.map((t) => (
						<TypeBadge key={t.name} type={t} variant="icon" />
					))}
				</div>
			</div>
		</Link>
	);
};
