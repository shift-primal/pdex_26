import { BabyIcon, CrownIcon, type Icon, SparkleIcon } from "@phosphor-icons/react"
import { readableInk } from "#/lib/color"

export type ClassificationName = "baby" | "legendary" | "mythical"

type ClassificationTheme = {
	color: string
	icon: Icon
}

export const CLASSIFICATION_THEME = {
	baby: {
		color: "#f6b26b",
		icon: BabyIcon
	},
	legendary: {
		color: "#d4af37",
		icon: CrownIcon
	},
	mythical: {
		color: "#8b5cf6",
		icon: SparkleIcon
	}
} as const satisfies Record<ClassificationName, ClassificationTheme>

export const classificationVisual = (name: ClassificationName) => {
	const { color, icon: Icon } = CLASSIFICATION_THEME[name]
	return { color, Icon, ink: readableInk(color) }
}
