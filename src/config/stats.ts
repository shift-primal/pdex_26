import {
	HeartIcon,
	LightningIcon,
	MagicWandIcon,
	ShieldIcon,
	ShieldPlusIcon,
	SigmaIcon,
	SwordIcon
} from "@phosphor-icons/react"

export const STAT_ICONS = {
	"hp": HeartIcon,
	"attack": SwordIcon,
	"defense": ShieldIcon,
	"special-attack": MagicWandIcon,
	"special-defense": ShieldPlusIcon,
	"speed": LightningIcon,
	"total": SigmaIcon
} as const

export const STAT_COLORS = {
	"hp": "#e8637a",
	"attack": "#e07d3f",
	"defense": "#5b8dd9",
	"special-attack": "#9b6ec8",
	"special-defense": "#4daa7d",
	"speed": "#d4b83a",
	"total": "#5BC8AF"
} as const

export const STATS = {
	"hp": { displayName: "HP", icon: STAT_ICONS.hp, color: STAT_COLORS.hp },
	"attack": {
		displayName: "ATK",
		icon: STAT_ICONS.attack,
		color: STAT_COLORS.attack
	},
	"defense": {
		displayName: "DEF",
		icon: STAT_ICONS.defense,
		color: STAT_COLORS.defense
	},
	"special-attack": {
		displayName: "SP. ATK",
		icon: STAT_ICONS["special-attack"],
		color: STAT_COLORS["special-attack"]
	},
	"special-defense": {
		displayName: "SP. DEF",
		icon: STAT_ICONS["special-defense"],
		color: STAT_COLORS["special-defense"]
	},
	"speed": {
		displayName: "SPD",
		icon: STAT_ICONS.speed,
		color: STAT_COLORS.speed
	}
} as const
