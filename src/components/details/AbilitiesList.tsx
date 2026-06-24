import { abilityQueryOptions } from "#/queries/ability"
import type { Ability, AbilityRef } from "#/types/pokemon"
import { useSuspenseQueries } from "@tanstack/react-query"

const AbilityChip = ({ ability }: { ability: Ability }) => {
	return (
		<div className="flex border-2 flex-col items-center text-center">
			<p>{ability.displayName}</p>
			<p>{ability.effect}</p>
		</div>
	)
}

export const AbilityList = ({ abilities }: { abilities: AbilityRef[] }) => {
	const results = useSuspenseQueries({
		queries: abilities.map((a) => abilityQueryOptions(a.url)),
		combine: (res) => res.map((r, i) => ({ ...r.data, isHidden: abilities[i].isHidden }))
	})

	return (
		<div className="flex flex-col gap-2">
			{results.map((a) => (
				<AbilityChip key={a.name} ability={a} />
			))}
		</div>
	)
}
