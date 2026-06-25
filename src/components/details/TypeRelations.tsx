import { typeQueryOptions } from "#/queries/type"
import { TYPE_THEME } from "#/theme/pokemon-types.theme"
import type { Damage, PokemonType, TypeName, TypeRef } from "#/types/pokemon"
import { useSuspenseQueries } from "@tanstack/react-query"

type DamageMap = Map<TypeName, number>
type MapByMultiplier = Map<number, TypeName[]>

const DAMAGE_MULTIPLIERS = {
	noDamage: 0,
	halfDamage: 0.5,
	doubleDamage: 2
} as const

function toDamageMap(relations: Damage): DamageMap {
	const pairs = Object.entries(relations).flatMap(([bucket, names]) =>
		names.map((name): [TypeName, number] => [name, DAMAGE_MULTIPLIERS[bucket as keyof typeof DAMAGE_MULTIPLIERS]])
	)

	return new Map(pairs)
}

function combineMaps(maps: DamageMap[]) {
	const combined: DamageMap = new Map()

	for (const map of maps) {
		for (const [name, mult] of map) {
			combined.set(name, (combined.get(name) ?? 1) * mult)
		}
	}

	return combined
}

function groupByMultiplier(map: DamageMap) {
	const grouped: MapByMultiplier = new Map()

	for (const [type, mult] of map) {
		if (mult === 1) continue
		grouped.set(mult, [...(grouped.get(mult) ?? []), type])
	}

	return grouped
}

function calculateDamageRelations(types: PokemonType[]) {
	const incoming = combineMaps(types.map((t) => toDamageMap(t.relations.incoming)))
	const outgoing = combineMaps(types.map((t) => toDamageMap(t.relations.outgoing)))

	return { incoming, outgoing }
}

const TypeChip = ({ type }: { type: TypeName }) => {
	const Icon = TYPE_THEME[type].icon
	const color = TYPE_THEME[type].color
	return (
		<div className="w-8 h-8 flex items-center justify-center rounded-full p-1" style={{ backgroundColor: color }}>
			<Icon />
		</div>
	)
}

const MultiplierGroup = ({
	multiplier,
	types,
	incoming
}: {
	multiplier: number
	types: TypeName[]
	incoming?: boolean
}) => {
	return (
		<div>
			<div className="flex flex-col items-center">
				<span style={{ color: incoming ? "red" : "green" }}>{multiplier}</span>
				<div className="flex flex-wrap gap-x-2">
					{types.map((t) => (
						<TypeChip type={t} />
					))}
				</div>
			</div>
		</div>
	)
}

export const TypeRelations = ({ types }: { types: TypeRef[] }) => {
	const results = useSuspenseQueries({
		queries: types.map((t) => typeQueryOptions(t.url)),
		combine: (res) => res.map((r) => ({ ...r.data }))
	})

	const relations = calculateDamageRelations(results)

	const incoming = groupByMultiplier(relations.incoming)
	const outgoing = groupByMultiplier(relations.outgoing)

	return (
		<div>
			<div>
				<span>Incoming</span>
				{[...incoming].map(([multiplier, types]) => (
					<MultiplierGroup key={multiplier} multiplier={multiplier} types={types} incoming={true} />
				))}
			</div>
			<div>
				<span>Outgoing</span>
				{[...outgoing].map(([multiplier, types]) => (
					<MultiplierGroup key={multiplier} multiplier={multiplier} types={types} incoming={true} />
				))}
			</div>
		</div>
	)
}
