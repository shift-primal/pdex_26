import { ELEMENTAL_TYPE_COLORS, STAT_COLORS } from '#/constants/colors';
import { STAT_ICONS, getTypeIcon } from '#/constants/icons';

export const API_BASE_URL = 'https://pokeapi.co/api/v2';

export const ELEMENTAL_TYPES = {
    normal: { id: 1, color: ELEMENTAL_TYPE_COLORS.normal, icon: getTypeIcon('normal') },
    fighting: { id: 2, color: ELEMENTAL_TYPE_COLORS.fighting, icon: getTypeIcon('fighting') },
    flying: { id: 3, color: ELEMENTAL_TYPE_COLORS.flying, icon: getTypeIcon('flying') },
    poison: { id: 4, color: ELEMENTAL_TYPE_COLORS.poison, icon: getTypeIcon('poison') },
    ground: { id: 5, color: ELEMENTAL_TYPE_COLORS.ground, icon: getTypeIcon('ground') },
    rock: { id: 6, color: ELEMENTAL_TYPE_COLORS.rock, icon: getTypeIcon('rock') },
    bug: { id: 7, color: ELEMENTAL_TYPE_COLORS.bug, icon: getTypeIcon('bug') },
    ghost: { id: 8, color: ELEMENTAL_TYPE_COLORS.ghost, icon: getTypeIcon('ghost') },
    steel: { id: 9, color: ELEMENTAL_TYPE_COLORS.steel, icon: getTypeIcon('steel') },
    fire: { id: 10, color: ELEMENTAL_TYPE_COLORS.fire, icon: getTypeIcon('fire') },
    water: { id: 11, color: ELEMENTAL_TYPE_COLORS.water, icon: getTypeIcon('water') },
    grass: { id: 12, color: ELEMENTAL_TYPE_COLORS.grass, icon: getTypeIcon('grass') },
    electric: { id: 13, color: ELEMENTAL_TYPE_COLORS.electric, icon: getTypeIcon('electric') },
    psychic: { id: 14, color: ELEMENTAL_TYPE_COLORS.psychic, icon: getTypeIcon('psychic') },
    ice: { id: 15, color: ELEMENTAL_TYPE_COLORS.ice, icon: getTypeIcon('ice') },
    dragon: { id: 16, color: ELEMENTAL_TYPE_COLORS.dragon, icon: getTypeIcon('dragon') },
    dark: { id: 17, color: ELEMENTAL_TYPE_COLORS.dark, icon: getTypeIcon('dark') },
    fairy: { id: 18, color: ELEMENTAL_TYPE_COLORS.fairy, icon: getTypeIcon('fairy') }
} as const;

export const STATS = {
    'hp': { displayName: 'HP', icon: STAT_ICONS.hp, color: STAT_COLORS.hp },
    'attack': { displayName: 'ATK', icon: STAT_ICONS.attack, color: STAT_COLORS.attack },
    'defense': { displayName: 'DEF', icon: STAT_ICONS.defense, color: STAT_COLORS.defense },
    'special-attack': {
        displayName: 'SP. ATK',
        icon: STAT_ICONS['special-attack'],
        color: STAT_COLORS['special-attack']
    },
    'special-defense': {
        displayName: 'SP. DEF',
        icon: STAT_ICONS['special-defense'],
        color: STAT_COLORS['special-defense']
    },
    'speed': { displayName: 'SPD', icon: STAT_ICONS.speed, color: STAT_COLORS.speed },
    'total': { displayName: 'TOTAL', icon: STAT_ICONS.total, color: STAT_COLORS.total }
} as const;
