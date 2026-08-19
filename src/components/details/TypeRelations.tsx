import { useSuspenseQueries } from "@tanstack/react-query"
import { typeQueryOptions } from "#/queries/type"
import { typeVisual } from "#/theme/pokemon-types.theme"
import type { Damage, PokemonType, TypeName, TypeRef } from "#/types/pokemon"

type DamageMap = Map<TypeName, number>

const DAMAGE_MULTIPLIERS = { noDamage: 0, halfDamage: 0.5, doubleDamage: 2 } as const

function toDamageMap(relations: Damage): DamageMap {
	const pairs = Object.entries(relations).flatMap(([bucket, names]) =>
		names.map((name): [TypeName, number] => [name, DAMAGE_MULTIPLIERS[bucket as keyof typeof DAMAGE_MULTIPLIERS]])
	)
	return new Map(pairs)
}

function combineMaps(maps: DamageMap[]) {
	const combined: DamageMap = new Map()
	for (const map of maps) {
		for (const [name, mult] of map) combined.set(name, (combined.get(name) ?? 1) * mult)
	}
	return combined
}

const MULT_LABEL: Record<number, string> = { 0: "0×", 0.25: "¼×", 0.5: "½×", 2: "2×", 4: "4×" }

const TypeRow = ({ entries }: { entries: [TypeName, number][] }) => {
	if (entries.length === 0) return <p className="font-mono text-xs text-ink-faint">None</p>
	return (
		<div className="flex flex-wrap gap-2">
			{entries
				.sort((a, b) => b[1] - a[1])
				.map(([type, mult]) => {
					const { color, Icon, ink } = typeVisual(type)
					return (
						<div
							key={type}
							className="flex items-center gap-1.5 rounded-full bg-[color-mix(in_oklab,var(--type)_8%,white)] py-1 pl-1 pr-2.5"
						>
							<span
								className="grid size-6 place-items-center rounded-full"
								style={{ backgroundColor: color }}
							>
								<Icon className="size-3.5 [&_path]:fill-current" style={{ color: ink }} />
							</span>
							<span className="font-mono text-[0.7rem] font-bold text-ink-soft">
								{MULT_LABEL[mult] ?? `${mult}×`}
							</span>
						</div>
					)
				})}
		</div>
	)
}

const Group = ({ title, entries }: { title: string; entries: [TypeName, number][] }) => (
	<div className="flex flex-col gap-2.5">
		<h3 className="font-mono text-[0.62rem] font-bold uppercase tracking-[0.18em] text-ink-faint">{title}</h3>
		<TypeRow entries={entries} />
	</div>
)

export const TypeRelations = ({ types }: { types: TypeRef[] }) => {
	const results = useSuspenseQueries({
		queries: types.map((t) => typeQueryOptions(t.url)),
		combine: (res) => res.map((r) => ({ ...r.data }) as PokemonType)
	})

	const incoming = combineMaps(results.map((t) => toDamageMap(t.relations.incoming)))
	const entries = [...incoming].filter(([, mult]) => mult !== 1)

	const weak = entries.filter(([, m]) => m > 1)
	const resist = entries.filter(([, m]) => m < 1 && m > 0)
	const immune = entries.filter(([, m]) => m === 0)

	return (
		<div className="reveal flex flex-col gap-6">
			<Group title="Weak to" entries={weak} />
			<Group title="Resists" entries={resist} />
			{immune.length > 0 && <Group title="Immune to" entries={immune} />}
		</div>
	)
}
