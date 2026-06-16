import { getSpriteSize } from "#/lib/pokemon.utils"
import { cn } from "#/lib/utils"
import type { PokemonSprites } from "#/types/pokemon"
import { WarningCircleIcon } from "@phosphor-icons/react"
import type { ClassNameValue } from "tailwind-merge"

export const PokemonSprite = ({
	name,
	sprites,
	size,
	className
}: {
	name: string
	sprites: PokemonSprites
	size?: "sm" | "md" | "lg" | "xl"
	className?: ClassNameValue
}) => {
	const sz = size ? size : "lg"

	if (!sprites.front.default) {
		return <WarningCircleIcon size={32} weight="fill" className="text-muted-foreground" />
	}

	return (
		<div className={cn(getSpriteSize(sz), "flex items-center justify-center mx-auto", className)}>
			<img
				src={sprites.front.default}
				alt={`Sprite of ${name}`}
				className="w-full h-full object-cover drop-shadow-2xl"
			/>
		</div>
	)
}
