import {
	HeartIcon,
	type Icon,
	LightningIcon,
	MagicWandIcon,
	ShieldIcon,
	ShieldPlusIcon,
	SwordIcon
} from "@phosphor-icons/react"

export type StatName = "hp" | "attack" | "defense" | "special-attack" | "special-defense" | "speed"

type StatTheme = {
	color: string
	icon: Icon
}

const STAT_COLORS = {
	"hp": "#e8637a",
	"attack": "#e07d3f",
	"defense": "#5b8dd9",
	"special-attack": "#9b6ec8",
	"special-defense": "#4daa7d",
	"speed": "#d4b83a",
	"total": "#5BC8AF"
} as const

const STAT_ICONS = {
	"hp": HeartIcon,
	"attack": SwordIcon,
	"defense": ShieldIcon,
	"special-attack": MagicWandIcon,
	"special-defense": ShieldPlusIcon,
	"speed": LightningIcon
}

export const STAT_THEME = {
	"hp": { color: STAT_COLORS.hp, icon: STAT_ICONS.hp },
	"attack": { color: STAT_COLORS.attack, icon: STAT_ICONS.attack },
	"defense": { color: STAT_COLORS.defense, icon: STAT_ICONS.defense },
	"special-attack": { color: STAT_COLORS["special-attack"], icon: STAT_ICONS["special-attack"] },
	"special-defense": { color: STAT_COLORS["special-defense"], icon: STAT_ICONS["special-defense"] },
	"speed": { color: STAT_COLORS.speed, icon: STAT_ICONS.speed }
} as const satisfies Record<StatName, StatTheme>
