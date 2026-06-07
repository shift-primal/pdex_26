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

export const GENERATIONS = {
    i: { label: 'Kanto', number: 1, roman: 'I' },
    ii: { label: 'Johto', number: 2, roman: 'II' },
    iii: { label: 'Hoenn', number: 3, roman: 'III' },
    iv: { label: 'Sinnoh', number: 4, roman: 'IV' },
    v: { label: 'Unova', number: 5, roman: 'V' },
    vi: { label: 'Kalos', number: 6, roman: 'VI' },
    vii: { label: 'Alola', number: 7, roman: 'VII' },
    viii: { label: 'Galar', number: 8, roman: 'VIII' },
    ix: { label: 'Paldea', number: 9, roman: 'IX' }
} as const;

export const FORM_CATEGORIES = {
    mega: { label: 'Mega' },
    gigantamax: { label: 'Gigantamax' },
    eternamax: { label: 'Eternamax' },
    primal: { label: 'Primal' },
    regional: { label: 'Regional' },
    forme: { label: 'Forme' },
    fusion: { label: 'Fusion' },
    battle: { label: 'Battle Bond' },
    striker: { label: 'Strike Style' },
    rotom: { label: 'Rotom' },
    toxtricity: { label: 'Toxtricity' },
    zygarde: { label: 'Zygarde' }
} as const;

export const FORM_TYPES = [
    // Mega — specific before generic
    { label: 'Mega X', suffix: '-mega-x', category: FORM_CATEGORIES.mega },
    { label: 'Mega Y', suffix: '-mega-y', category: FORM_CATEGORIES.mega },
    { label: 'Mega', suffix: '-mega', category: FORM_CATEGORIES.mega },

    // Gigantamax / Eternamax
    { label: 'Gigantamax', suffix: '-gmax', category: FORM_CATEGORIES.gigantamax },
    { label: 'Eternamax', suffix: '-eternamax', category: FORM_CATEGORIES.eternamax },

    // Primal
    { label: 'Primal', suffix: '-primal', category: FORM_CATEGORIES.primal },

    // Regional
    { label: 'Alolan', suffix: '-alola', category: FORM_CATEGORIES.regional },
    { label: 'Galarian', suffix: '-galar', category: FORM_CATEGORIES.regional },
    { label: 'Hisuian', suffix: '-hisui', category: FORM_CATEGORIES.regional },
    { label: 'Paldean', suffix: '-paldea', category: FORM_CATEGORIES.regional },

    // Formes
    { label: 'Altered Forme', suffix: '-altered', category: FORM_CATEGORIES.forme },
    { label: 'Origin Forme', suffix: '-origin', category: FORM_CATEGORIES.forme },
    { label: 'Land Forme', suffix: '-land', category: FORM_CATEGORIES.forme },
    { label: 'Sky Forme', suffix: '-sky', category: FORM_CATEGORIES.forme },
    { label: 'Therian Forme', suffix: '-therian', category: FORM_CATEGORIES.forme },
    { label: 'Zen Mode', suffix: '-zen', category: FORM_CATEGORIES.forme },
    { label: 'Pirouette', suffix: '-pirouette', category: FORM_CATEGORIES.forme },
    { label: 'Blade Forme', suffix: '-blade', category: FORM_CATEGORIES.forme },
    { label: 'Attack Forme', suffix: '-attack', category: FORM_CATEGORIES.forme },
    { label: 'Defense Forme', suffix: '-defense', category: FORM_CATEGORIES.forme },
    { label: 'Speed Forme', suffix: '-speed', category: FORM_CATEGORIES.forme },
    { label: '10% Forme', suffix: '-10', category: FORM_CATEGORIES.zygarde },
    { label: 'Complete Forme', suffix: '-complete', category: FORM_CATEGORIES.zygarde },
    { label: 'School Forme', suffix: '-school', category: FORM_CATEGORIES.forme },

    // Fusions (Kyurem, Necrozma) — specific before generic
    { label: 'Dusk Mane', suffix: '-dusk-mane', category: FORM_CATEGORIES.fusion },
    { label: 'Dawn Wings', suffix: '-dawn-wings', category: FORM_CATEGORIES.fusion },
    { label: 'Ultra', suffix: '-ultra', category: FORM_CATEGORIES.fusion },
    { label: 'Black', suffix: '-black', category: FORM_CATEGORIES.fusion },
    { label: 'White', suffix: '-white', category: FORM_CATEGORIES.fusion },

    // Battle styles — specific before generic
    { label: 'Crowned', suffix: '-crowned', category: FORM_CATEGORIES.battle },
    { label: 'Single Strike', suffix: '-single-strike', category: FORM_CATEGORIES.striker },
    { label: 'Rapid Strike', suffix: '-rapid-strike', category: FORM_CATEGORIES.striker },

    // Rotom
    { label: 'Heat', suffix: '-heat', category: FORM_CATEGORIES.rotom },
    { label: 'Wash', suffix: '-wash', category: FORM_CATEGORIES.rotom },
    { label: 'Frost', suffix: '-frost', category: FORM_CATEGORIES.rotom },
    { label: 'Fan', suffix: '-fan', category: FORM_CATEGORIES.rotom },
    { label: 'Mow', suffix: '-mow', category: FORM_CATEGORIES.rotom },

    // Toxtricity
    { label: 'Amped', suffix: '-amped', category: FORM_CATEGORIES.toxtricity },
    { label: 'Low Key', suffix: '-low-key', category: FORM_CATEGORIES.toxtricity }
] as const;
