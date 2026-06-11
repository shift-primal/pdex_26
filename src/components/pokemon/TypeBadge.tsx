import type { PokemonElementalType } from "#/types/pokemon";
import SVG from "react-inlinesvg";

export const TypeBadge = ({
	type,
	variant,
}: {
	type: PokemonElementalType;
	variant?: "default" | "icon";
}) => {
	const v = variant ? variant : "default";

	const defaultBadge = (
		<div
			className="w-24 rounded-full flex justify-center gap-x-2 items-center py-1"
			style={{ backgroundColor: type.color }}
		>
			<div className="aspect-square rounded-full bg-background p-1">
				<SVG
					src={type.icon}
					className="h-4 w-4"
					description={`Icon for ${type.name}`}
					preProcessor={(code) =>
						code.replace(/fill=".*?"/g, `fill="${type.color}"`)
					}
				/>
			</div>
			<span className="font-semibold text-background text-sm capitalize">
				{type.name}
			</span>
		</div>
	);

	const iconBadge = (
		<div
			className="rounded-full h-8 aspect-square shrink-0 overflow-hidden flex items-center justify-center"
			style={{ backgroundColor: type.color }}
		>
			<div className="h-full w-full flex items-center justify-center">
				<SVG
					src={type.icon}
					className="[&_svg]:w-full [&_svg]:h-full [&_svg]:block p-1.5"
					description={`Icon for ${type.name}`}
				/>
			</div>
		</div>
	);

	if (v === "default") return defaultBadge;

	return iconBadge;
};
