import { createLink, type LinkComponent } from "@tanstack/react-router"
import { forwardRef } from "react"
import { SpriteWrapper } from "#/components/SpriteWrapper"

interface ChipOwnProps {
	sprite: string | null | undefined
	label?: string
	prefetch?: () => void
}

const ChipBase = forwardRef<HTMLAnchorElement, ChipOwnProps & React.AnchorHTMLAttributes<HTMLAnchorElement>>(
	({ sprite, label, prefetch, ...props }, ref) => (
		<a
			ref={ref}
			{...props}
			onMouseEnter={prefetch}
			onFocus={prefetch}
			className="group flex flex-col items-center gap-1 rounded-2xl border border-line bg-sheet p-3 transition hover:-translate-y-0.5 hover:border-[color-mix(in_oklab,var(--type)_45%,white)] hover:shadow-[0_12px_24px_-16px_var(--type)]"
		>
			<div className="grid size-16 place-items-center rounded-full bg-[color-mix(in_oklab,var(--type)_10%,white)]">
				<SpriteWrapper spriteUrl={sprite} alt={label ?? props.title ?? "Sprite"} size={56} />
			</div>
			{label && <span className="text-xs font-semibold text-ink">{label}</span>}
		</a>
	)
)

const CreatedChip = createLink(ChipBase)

export const Chip: LinkComponent<typeof ChipBase> = (props) => <CreatedChip {...props} />
