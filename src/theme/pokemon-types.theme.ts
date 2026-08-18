import type { ComponentType, SVGProps } from "react"
import * as TypeIcons from "#/assets/type-icons"

export type TypeName =
	| "normal"
	| "fighting"
	| "flying"
	| "poison"
	| "ground"
	| "rock"
	| "bug"
	| "ghost"
	| "steel"
	| "fire"
	| "water"
	| "grass"
	| "electric"
	| "psychic"
	| "ice"
	| "dragon"
	| "dark"
	| "fairy"
	| "stellar"

type TypeTheme = {
	color: string
	icon: ComponentType<SVGProps<SVGSVGElement>>
}

const TYPE_COLORS = {
	normal: "#9098a0",
	fighting: "#cd4069",
	flying: "#8fa7dc",
	poison: "#aa6ac7",
	ground: "#d87746",
	rock: "#c0b187",
	bug: "#90c02d",
	ghost: "#5269ab",
	steel: "#5a8ea0",
	fire: "#fd9b54",
	water: "#4d90d4",
	grass: "#63ba5b",
	electric: "#f2d13b",
	psychic: "#f87176",
	ice: "#74ccbe",
	dragon: "#0b6dc3",
	dark: "#5a5366",
	fairy: "#eb8fe5",
	stellar: "#8c7afc"
} as const

export const TYPE_THEME = {
	normal: {
		color: TYPE_COLORS.normal,
		icon: TypeIcons.NormalIcon
	},
	fighting: {
		color: TYPE_COLORS.fighting,
		icon: TypeIcons.FightingIcon
	},
	flying: {
		color: TYPE_COLORS.flying,
		icon: TypeIcons.FlyingIcon
	},
	poison: {
		color: TYPE_COLORS.poison,
		icon: TypeIcons.PoisonIcon
	},
	ground: {
		color: TYPE_COLORS.ground,
		icon: TypeIcons.GroundIcon
	},
	rock: {
		color: TYPE_COLORS.rock,
		icon: TypeIcons.RockIcon
	},
	bug: {
		color: TYPE_COLORS.bug,
		icon: TypeIcons.BugIcon
	},
	ghost: {
		color: TYPE_COLORS.ghost,
		icon: TypeIcons.GhostIcon
	},
	steel: {
		color: TYPE_COLORS.steel,
		icon: TypeIcons.SteelIcon
	},
	fire: {
		color: TYPE_COLORS.fire,
		icon: TypeIcons.FireIcon
	},
	water: {
		color: TYPE_COLORS.water,
		icon: TypeIcons.WaterIcon
	},
	grass: {
		color: TYPE_COLORS.grass,
		icon: TypeIcons.GrassIcon
	},
	electric: {
		color: TYPE_COLORS.electric,
		icon: TypeIcons.ElectricIcon
	},
	psychic: {
		color: TYPE_COLORS.psychic,
		icon: TypeIcons.PsychicIcon
	},
	ice: {
		color: TYPE_COLORS.ice,
		icon: TypeIcons.IceIcon
	},
	dragon: {
		color: TYPE_COLORS.dragon,
		icon: TypeIcons.DragonIcon
	},
	dark: {
		color: TYPE_COLORS.dark,
		icon: TypeIcons.DarkIcon
	},
	fairy: {
		color: TYPE_COLORS.fairy,
		icon: TypeIcons.FairyIcon
	},
	stellar: {
		color: TYPE_COLORS.stellar,
		icon: TypeIcons.StellarIcon
	}
} as const satisfies Record<TypeName, TypeTheme>

/** all type names in canonical order — for filter chips and search-param validation*/
export const TYPE_NAMES = Object.keys(TYPE_THEME) as [TypeName, ...TypeName[]]
