import { cn } from "#/lib/utils"
import { type ClassificationName, classificationVisual } from "#/theme/classification.theme"

export const ClassificationBadge = ({
	classification,
	size = "md",
	variant = "solid"
}: {
	classification: ClassificationName
	size?: "sm" | "md"
	variant?: "solid" | "glass"
}) => {
	const { color, Icon, ink } = classificationVisual(classification)
	const isGlass = variant === "glass"

	return (
		<span
			className={cn(
				"inline-flex items-center gap-1.5 rounded-full font-mono font-bold uppercase tracking-widest",
				size === "md" ? "px-3 py-1 text-[0.7rem]" : "px-2 py-0.5 text-[0.6rem]"
			)}
			style={
				isGlass
					? { backgroundColor: `color-mix(in oklab, ${ink} 30%, ${color} 50%)`, color }
					: { backgroundColor: color, color: "white", boxShadow: `0 6px 16px -8px ${color}` }
			}
		>
			<Icon
				className={size === "md" ? "size-3.5" : "size-3"}
				weight="fill"
				style={{ color: isGlass ? color : "white" }}
			/>
			{classification}
		</span>
	)
}
