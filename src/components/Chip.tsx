import { SpriteWrapper } from "#/components/SpriteWrapper"
import { createLink, type LinkComponent } from "@tanstack/react-router"
import { forwardRef } from "react"

interface ChipOwnProps {
	sprite: string | null | undefined
	label?: string
	prefetch?: () => void
}

const ChipBase = forwardRef<HTMLAnchorElement, ChipOwnProps & React.AnchorHTMLAttributes<HTMLAnchorElement>>(
	({ sprite, label, prefetch, ...props }, ref) => (
		<a ref={ref} {...props} onMouseEnter={prefetch} onFocus={prefetch} className="flex flex-col items-center">
			<SpriteWrapper spriteUrl={sprite} alt={label ?? props.title ?? "Sprite"} />
			{label && <span className="text-sm">{label}</span>}
		</a>
	)
)

const CreatedChip = createLink(ChipBase)

export const Chip: LinkComponent<typeof ChipBase> = (props) => <CreatedChip {...props} />
