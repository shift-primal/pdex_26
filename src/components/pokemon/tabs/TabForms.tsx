import { PokemonBasicEntry } from "#/components/pokemon/PokemonBasicEntry"
import { usePokemonCard } from "#/context/PokemonCardContext"

export const TabForms = () => {
	const { base, forms } = usePokemonCard()

	if (forms.length <= 1) return <p className="text-sm text-muted-foreground text-center">No forms</p>

	return (
		<div className="flex flex-col items-center gap-4">
			<PokemonBasicEntry pokemon={base} />

			<div className="flex flex-wrap items-center gap-2 justify-center overflow-y-auto max-h-50 lg:max-h-full">
				{forms.map((p, i) => {
					return i > 0 && <PokemonBasicEntry key={p.id} pokemon={p} baseName={base.name} />
				})}
			</div>
		</div>
	)
}
