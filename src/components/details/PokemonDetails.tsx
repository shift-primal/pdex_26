import { EvolutionChain } from "#/components/details/EvolutionChain"
import { VarietySwitcher } from "#/components/details/VarietySwitcher"
import { SpriteWrapper } from "#/components/SpriteWrapper"
import { formatId, formatText } from "#/lib/format"
import { usePokemonDetail } from "#/queries/detail"

export const PokemonDetails = ({ id, variety, form }: { id: string; variety?: string; form?: string }) => {
	const { species, activeVariety, activeForm } = usePokemonDetail(id, variety, form)

	const sprite = activeForm.sprites.front.default ?? activeVariety.sprites.front.default

	const title = formatText(activeForm.displayName)

	return (
		<div className="mx-auto flex max-w-md flex-col items-center gap-4 p-8">
			<span className="text-sm text-gray-500">{formatId(species.id)}</span>
			<h1 className="text-3xl font-bold">{title}</h1>

			<VarietySwitcher species={species} activeVariety={activeVariety} />
			<EvolutionChain species={species} />

			{sprite && <SpriteWrapper spriteUrl={sprite} alt={title} size={256} />}

			<div className="flex gap-2">
				{activeVariety.types.map((t) => (
					<span key={t.name} className="rounded bg-gray-200 px-2 py-1 text-sm">
						{t.name}
					</span>
				))}
			</div>

			<p className="text-center text-sm text-gray-600">{species.flavorText}</p>

			<ul className="w-full">
				{activeVariety.stats.map((s) => (
					<li key={s.name} className="flex justify-between border-b py-1 text-sm">
						<span>{s.name}</span>
						<span className="font-medium">{s.value}</span>
					</li>
				))}
			</ul>
		</div>
	)
}
