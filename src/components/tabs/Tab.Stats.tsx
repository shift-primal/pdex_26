import { usePokemonDetailFromRoute } from "#/queries/detail"
import { STAT_THEME } from "#/theme/stats.theme"
import type { StatName } from "#/types/pokemon"

const STAT_LABEL: Record<StatName, string> = {
	"hp": "HP",
	"attack": "Attack",
	"defense": "Defense",
	"special-attack": "Sp. Atk",
	"special-defense": "Sp. Def",
	"speed": "Speed"
}

const SCALE_MAX = 200

export const Stats = () => {
	const { activeVariety } = usePokemonDetailFromRoute()
	const total = activeVariety.stats.reduce((sum, s) => sum + s.value, 0)

	return (
		<div className="reveal">
			<div className="grid grid-cols-1 gap-x-12 gap-y-3.5 lg:grid-cols-2 lg:grid-flow-col lg:grid-rows-3">
				{activeVariety.stats.map((s, i) => {
					const { color, icon: Icon } = STAT_THEME[s.name]
					const pct = Math.min(s.value / SCALE_MAX, 1) * 100
					return (
						<div key={s.name} className="grid grid-cols-[7rem_2.5rem_1fr] items-center gap-3">
							<div className="flex items-center gap-2">
								<Icon className="size-4" style={{ color }} weight="fill" />
								<span className="font-mono text-[0.62rem] font-bold uppercase tracking-[0.12em] text-ink-soft">
									{STAT_LABEL[s.name]}
								</span>
							</div>
							<span className="text-right font-mono text-sm font-bold tabular-nums text-ink">
								{s.value}
							</span>
							<div className="h-2.5 overflow-hidden rounded-full bg-line">
								<div
									className="bar-fill h-full rounded-full"
									style={{ width: `${pct}%`, background: color, animationDelay: `${0.05 * i}s` }}
								/>
							</div>
						</div>
					)
				})}
			</div>

			<div className="mt-4 flex items-baseline justify-between border-t border-line pt-4">
				<span className="font-mono text-[0.68rem] font-bold uppercase tracking-[0.18em] text-ink-faint">
					Total
				</span>
				<span className="font-display text-2xl font-extrabold tabular-nums text-ink">{total}</span>
			</div>
		</div>
	)
}
