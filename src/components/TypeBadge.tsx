import { readableInk } from "#/lib/color"
import { cn } from "#/lib/utils"
import { TYPE_THEME } from "#/theme/pokemon-types.theme"
import type { TypeName } from "#/types/pokemon"

export const TypeBadge = ({ type, size = "md" }: { type: TypeName; size?: "sm" | "md" }) => {
	const { color, icon: Icon } = TYPE_THEME[type]
	const ink = readableInk(color)

	return (
		<span
			className={cn(
				"inline-flex items-center gap-1.5 rounded-full font-mono font-bold uppercase tracking-widest",
				size === "md" ? "px-3 py-1 text-[0.7rem]" : "px-2 py-0.5 text-[0.6rem]"
			)}
			style={{ backgroundColor: color, color: ink, boxShadow: `0 6px 16px -8px ${color}` }}
		>
			<Icon
				className={cn("[&_path]:fill-current", size === "md" ? "size-3.5" : "size-3")}
				style={{ color: ink }}
			/>
			{type}
		</span>
	)
}
