import { ArrowDownIcon, ArrowRightIcon } from "@phosphor-icons/react"
import { PokemonBasicEntry } from "#/components/pokemon/PokemonBasicEntry"
import { usePokemonCard } from "#/context/PokemonCardContext"
import { buildEvolutionChain, findEvolutionNode, findEvolutionParent } from "#/lib/pokemon.utils"
import type { PokemonBasic } from "#/types/pokemon"

type Entries = Record<string, PokemonBasic>

const FanLayout = ({ entries, top, bottom }: { entries: Entries; top: string; bottom: string[] }) => (
	<div className="flex flex-col items-center gap-4 h-48">
		<PokemonBasicEntry pokemon={entries[top]} />
		<ArrowDownIcon className="text-muted-foreground" />
		<div className="flex flex-wrap items-center gap-2 justify-center">
			{bottom.map((name) => (
				<PokemonBasicEntry key={name} pokemon={entries[name]} />
			))}
		</div>
	</div>
)

const LinearLayout = ({ entries, chain }: { entries: Entries; chain: string[] }) => (
	<div className="flex items-start justify-center gap-2">
		{chain.map((name, i) => (
			<div key={name} className="flex items-center">
				{i > 0 && <ArrowRightIcon size={16} className="text-muted-foreground mr-2" />}
				<PokemonBasicEntry pokemon={entries[name]} />
			</div>
		))}
	</div>
)

export const TabEvolutions = () => {
	const { base, evolutions } = usePokemonCard()

	if (evolutions.length <= 1) return <p className="text-sm text-muted-foreground text-center">No evolutions</p>

	const entries = Object.fromEntries(evolutions.map((p) => [p.name, p]))
	const currentNode = findEvolutionNode(base.evolution, base.name)
	const parentNode = findEvolutionParent(base.evolution, base.name)

	const isBrancher = (currentNode?.evolvesTo.length ?? 0) > 1
	const isBranch = (parentNode?.evolvesTo.length ?? 0) > 1

	if (!isBrancher && !isBranch) {
		return <LinearLayout entries={entries} chain={buildEvolutionChain(base.evolution)} />
	}

	const fanTop = isBrancher ? base.name : parentNode!.name
	const fanBottom = isBrancher ? currentNode!.evolvesTo.map((e) => e.name) : parentNode!.evolvesTo.map((e) => e.name)

	return <FanLayout entries={entries} top={fanTop} bottom={fanBottom} />
}
