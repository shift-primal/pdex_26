import type { PokemonElementalType } from "#/types/pokemon"
import SVG from "react-inlinesvg"

export const TypeBadge = ({ type, variant }: { type: PokemonElementalType; variant?: "default" | "icon" }) => {
	const v = variant ? variant : "default"

	const defaultBadge = (
		<div
			className="w-32 lg:w-64 rounded-full flex justify-center gap-x-2 lg:gap-x-4 items-center py-1 lg:py-2"
			style={{ backgroundColor: type.color }}
		>
			<div className="aspect-square rounded-full bg-background p-0.75 lg:p-1.5">
				<SVG
					src={type.icon}
					className="h-3.5 w-3.5 lg:h-6 lg:w-6"
					description={`Icon for ${type.name}`}
					preProcessor={(code) => code.replace(/fill=".*?"/g, `fill="${type.color}"`)}
				/>
			</div>
			<span className="font-semibold text-background text-sm lg:text-lg capitalize">{type.name}</span>
		</div>
	)

	const iconBadge = (
		<div
			className="rounded-full h-6 aspect-square shrink-0 overflow-hidden flex items-center justify-center"
			style={{ backgroundColor: type.color }}
		>
			<div className="h-full w-full flex items-center justify-center">
				<SVG
					src={type.icon}
					className="[&_svg]:w-full [&_svg]:h-full [&_svg]:block p-1"
					description={`Icon for ${type.name}`}
				/>
			</div>
		</div>
	)

	if (v === "default") return defaultBadge

	return iconBadge
}
