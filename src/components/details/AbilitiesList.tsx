import { useSuspenseQueries } from "@tanstack/react-query"
import { abilityQueryOptions } from "#/queries/ability"
import type { Ability, AbilityRef } from "#/types/pokemon"

const AbilityCard = ({ ability }: { ability: Ability & { isHidden: boolean } }) => (
	<div className="rounded-2xl border border-line bg-sheet p-4">
		<div className="mb-1.5 flex items-center gap-2">
			<h3 className="font-display text-lg font-bold text-ink">{ability.displayName}</h3>
			{ability.isHidden && (
				<span className="rounded-full bg-[color-mix(in_oklab,var(--type)_14%,white)] px-2 py-0.5 font-mono text-[0.55rem] font-bold uppercase tracking-widest text-[color-mix(in_oklab,var(--type)_55%,black)]">
					Hidden
				</span>
			)}
		</div>
		<p className="text-sm leading-relaxed text-ink-soft">{ability.effect}</p>
	</div>
)

export const AbilityList = ({ abilities }: { abilities: AbilityRef[] }) => {
	const results = useSuspenseQueries({
		queries: abilities.map((a) => abilityQueryOptions(a.url)),
		combine: (res) => res.map((r, i) => ({ ...r.data, isHidden: abilities[i].isHidden }))
	})

	return (
		<div className="reveal flex flex-col gap-3">
			{results.map((a) => (
				<AbilityCard key={a.name} ability={a} />
			))}
		</div>
	)
}
