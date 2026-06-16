import { PokemonSprite } from "#/components/pokemon/PokemonSprite"
import { TypeBadge } from "#/components/pokemon/TypeBadge"
import { useMobile } from "#/hooks/useMobile"
import type { PokemonBasic } from "#/types/pokemon"
import { Link, useSearch } from "@tanstack/react-router"

export const PokemonBasicEntry = ({ pokemon, baseName }: { pokemon: PokemonBasic; baseName?: string }) => {
	const { tab } = useSearch({ from: "/pokemon/$id" })

	const isMobile = useMobile()

	return (
		<Link
			to="/pokemon/$id"
			params={{ id: baseName ?? pokemon.name }}
			search={{ tab, form: baseName ? pokemon.name : undefined }}
		>
			<div className="flex flex-col gap-y-2 items-center justify-center h-fit w-fit p-2">
				<PokemonSprite sprites={pokemon.sprites} name={pokemon.name} size={isMobile ? "sm" : "md"} />
				<div className="flex gap-x-2">
					{pokemon.types.map((t) => (
						<TypeBadge key={t.name} type={t} variant="icon" />
					))}
				</div>
			</div>
		</Link>
	)
}
