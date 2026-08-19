import { cn } from "#/lib/utils"
import { typeVisual } from "#/theme/pokemon-types.theme"
import type { TypeName } from "#/types/pokemon"

export const TypeBadge = ({
	type,
	size = "md",
	variant = "solid"
}: {
	type: TypeName
	size?: "sm" | "md"
	variant?: "solid" | "glass"
}) => {
	const { color, Icon, ink } = typeVisual(type)
	const isGlass = variant === "glass"

	return (
		<span
			className={cn(
				"inline-flex items-center gap-1.5 rounded-full font-mono font-bold uppercase tracking-widest",
				size === "md" ? "px-3 py-1 text-[0.7rem]" : "px-2 py-0.5 text-[0.6rem]"
			)}
			style={
				isGlass
					? { backgroundColor: `color-mix(in oklab, ${ink} 50%, ${color} 30%)`, color }
					: { backgroundColor: color, color: "white", boxShadow: `0 6px 16px -8px ${color}` }
			}
		>
			<Icon
				className={cn("[&_path]:fill-current", size === "md" ? "size-3.5" : "size-3")}
				style={{ color: isGlass ? color : "white" }}
			/>
			{type}
		</span>
	)
}
