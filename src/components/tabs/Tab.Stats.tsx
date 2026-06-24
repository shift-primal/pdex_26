import { TemporaryWrapper } from "#/components/TemporaryWrapper"
import { usePokemonDetailFromRoute } from "#/queries/detail"

export const Stats = () => {
	const { activeVariety } = usePokemonDetailFromRoute()

	return (
		<TemporaryWrapper title="Stats">
			<ul className="w-full">
				{activeVariety.stats.map((s) => (
					<li key={s.name} className="flex justify-between border-b py-1 text-sm">
						<span>{s.name}</span>
						<span className="font-medium">{s.value}</span>
					</li>
				))}
			</ul>
		</TemporaryWrapper>
	)
}
