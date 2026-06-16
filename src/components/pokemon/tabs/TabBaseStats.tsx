import { Progress } from "#/components/shadcn/progress"
import { Separator } from "#/components/shadcn/separator"
import { STAT_COLORS, STAT_ICONS, STATS } from "#/config/stats"
import { usePokemonCard } from "#/context/PokemonCardContext"
import type { Icon } from "@phosphor-icons/react"

const StatEntry = ({
	name,
	value,
	color,
	Icon,
	max = 255
}: {
	name: string
	value: number
	color: string
	Icon: Icon
	max?: number
}) => {
	return (
		<div className="flex items-center justify-between text-sm lg:text-lg gap-3 w-full" key={name}>
			<div className="flex gap-x-1.5 items-center w-20 lg:w-30 shrink-0">
				<Icon size={16} style={{ color: color }} />
				<span className="text-sm lg:text-lg text-center text-muted-foreground">{name}</span>
			</div>
			<span className="font-semibold text-right min-w-8">{value}</span>
			<Progress
				value={(value / max) * 100}
				className="h-3 rounded-full mt-1 lg:h-4"
				colorFilled={color}
				colorUnfilled="#e0e0e0"
			/>
		</div>
	)
}

export const TabBaseStats = () => {
	const { active } = usePokemonCard()

	const totalValue = active.stats.reduce((acc, curr) => acc + curr.value, 0)

	const totalProps = {
		name: "TOTAL",
		value: totalValue,
		color: STAT_COLORS["total"],
		Icon: STAT_ICONS["total"]
	}

	return (
		<div className="flex flex-col gap-6 h-full justify-center">
			{active.stats.map((s) => {
				const props = {
					name: STATS[s.name].displayName,
					value: s.value,
					color: s.color,
					Icon: STATS[s.name].icon
				}
				return <StatEntry key={s.name} {...props} />
			})}
			<Separator />
			<StatEntry {...totalProps} max={720} />
		</div>
	)
}
