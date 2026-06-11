export const ELEMENTAL_TYPE_COLORS = {
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
} as const;

const getTypeIcon = (name: string) =>
	`https://raw.githubusercontent.com/duiker101/pokemon-type-svg-icons/master/icons/${name}.svg`;

export const ELEMENTAL_TYPES = {
	normal: {
		id: 1,
		color: ELEMENTAL_TYPE_COLORS.normal,
		icon: getTypeIcon("normal"),
	},
	fighting: {
		id: 2,
		color: ELEMENTAL_TYPE_COLORS.fighting,
		icon: getTypeIcon("fighting"),
	},
	flying: {
		id: 3,
		color: ELEMENTAL_TYPE_COLORS.flying,
		icon: getTypeIcon("flying"),
	},
	poison: {
		id: 4,
		color: ELEMENTAL_TYPE_COLORS.poison,
		icon: getTypeIcon("poison"),
	},
	ground: {
		id: 5,
		color: ELEMENTAL_TYPE_COLORS.ground,
		icon: getTypeIcon("ground"),
	},
	rock: {
		id: 6,
		color: ELEMENTAL_TYPE_COLORS.rock,
		icon: getTypeIcon("rock"),
	},
	bug: { id: 7, color: ELEMENTAL_TYPE_COLORS.bug, icon: getTypeIcon("bug") },
	ghost: {
		id: 8,
		color: ELEMENTAL_TYPE_COLORS.ghost,
		icon: getTypeIcon("ghost"),
	},
	steel: {
		id: 9,
		color: ELEMENTAL_TYPE_COLORS.steel,
		icon: getTypeIcon("steel"),
	},
	fire: {
		id: 10,
		color: ELEMENTAL_TYPE_COLORS.fire,
		icon: getTypeIcon("fire"),
	},
	water: {
		id: 11,
		color: ELEMENTAL_TYPE_COLORS.water,
		icon: getTypeIcon("water"),
	},
	grass: {
		id: 12,
		color: ELEMENTAL_TYPE_COLORS.grass,
		icon: getTypeIcon("grass"),
	},
	electric: {
		id: 13,
		color: ELEMENTAL_TYPE_COLORS.electric,
		icon: getTypeIcon("electric"),
	},
	psychic: {
		id: 14,
		color: ELEMENTAL_TYPE_COLORS.psychic,
		icon: getTypeIcon("psychic"),
	},
	ice: { id: 15, color: ELEMENTAL_TYPE_COLORS.ice, icon: getTypeIcon("ice") },
	dragon: {
		id: 16,
		color: ELEMENTAL_TYPE_COLORS.dragon,
		icon: getTypeIcon("dragon"),
	},
	dark: {
		id: 17,
		color: ELEMENTAL_TYPE_COLORS.dark,
		icon: getTypeIcon("dark"),
	},
	fairy: {
		id: 18,
		color: ELEMENTAL_TYPE_COLORS.fairy,
		icon: getTypeIcon("fairy"),
	},
} as const;
