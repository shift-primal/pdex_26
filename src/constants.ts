import {
    HeartIcon,
    LightningIcon,
    MagicWandIcon,
    ShieldIcon,
    ShieldPlusIcon,
    SwordIcon
} from '@phosphor-icons/react';

const NAME_ICON_BASE =
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-vii/lets-go-pikachu-lets-go-eevee';

const SYMBOL_ICON_BASE =
    'https://raw.githubusercontent.com/duiker101/pokemon-type-svg-icons/master/icons';

export const ELEMENTAL_TYPES = {
    normal: {
        id: 1,
        color: '#9098a0',
        icons: {
            name: `${NAME_ICON_BASE}/1.png`,
            symbol: `${SYMBOL_ICON_BASE}/normal.svg`
        }
    },
    fighting: {
        id: 2,
        color: '#cd4069',
        icons: {
            name: `${NAME_ICON_BASE}/2.png`,
            symbol: `${SYMBOL_ICON_BASE}/fighting.svg`
        }
    },
    flying: {
        id: 3,
        color: '#8fa7dc',
        icons: {
            name: `${NAME_ICON_BASE}/3.png`,
            symbol: `${SYMBOL_ICON_BASE}/flying.svg`
        }
    },
    poison: {
        id: 4,
        color: '#aa6ac7',
        icons: {
            name: `${NAME_ICON_BASE}/4.png`,
            symbol: `${SYMBOL_ICON_BASE}/poison.svg`
        }
    },
    ground: {
        id: 5,
        color: '#d87746',
        icons: {
            name: `${NAME_ICON_BASE}/5.png`,
            symbol: `${SYMBOL_ICON_BASE}/ground.svg`
        }
    },
    rock: {
        id: 6,
        color: '#c0b187',
        icons: {
            name: `${NAME_ICON_BASE}/6.png`,
            symbol: `${SYMBOL_ICON_BASE}/rock.svg`
        }
    },
    bug: {
        id: 7,
        color: '#90c02d',
        icons: {
            name: `${NAME_ICON_BASE}/7.png`,
            symbol: `${SYMBOL_ICON_BASE}/bug.svg`
        }
    },
    ghost: {
        id: 8,
        color: '#5269ab',
        icons: {
            name: `${NAME_ICON_BASE}/8.png`,
            symbol: `${SYMBOL_ICON_BASE}/ghost.svg`
        }
    },
    steel: {
        id: 9,
        color: '#5a8ea0',
        icons: {
            name: `${NAME_ICON_BASE}/9.png`,
            symbol: `${SYMBOL_ICON_BASE}/steel.svg`
        }
    },
    fire: {
        id: 10,
        color: '#fd9b54',
        icons: {
            name: `${NAME_ICON_BASE}/10.png`,
            symbol: `${SYMBOL_ICON_BASE}/fire.svg`
        }
    },
    water: {
        id: 11,
        color: '#4d90d4',
        icons: {
            name: `${NAME_ICON_BASE}/11.png`,
            symbol: `${SYMBOL_ICON_BASE}/water.svg`
        }
    },
    grass: {
        id: 12,
        color: '#63ba5b',
        icons: {
            name: `${NAME_ICON_BASE}/12.png`,
            symbol: `${SYMBOL_ICON_BASE}/grass.svg`
        }
    },
    electric: {
        id: 13,
        color: '#f2d13b',
        icons: {
            name: `${NAME_ICON_BASE}/13.png`,
            symbol: `${SYMBOL_ICON_BASE}/electric.svg`
        }
    },
    psychic: {
        id: 14,
        color: '#f87176',
        icons: {
            name: `${NAME_ICON_BASE}/14.png`,
            symbol: `${SYMBOL_ICON_BASE}/psychic.svg`
        }
    },
    ice: {
        id: 15,
        color: '#74ccbe',
        icons: {
            name: `${NAME_ICON_BASE}/15.png`,
            symbol: `${SYMBOL_ICON_BASE}/ice.svg`
        }
    },
    dragon: {
        id: 16,
        color: '#0b6dc3',
        icons: {
            name: `${NAME_ICON_BASE}/16.png`,
            symbol: `${SYMBOL_ICON_BASE}/dragon.svg`
        }
    },
    dark: {
        id: 17,
        color: '#5a5366',
        icons: {
            name: `${NAME_ICON_BASE}/17.png`,
            symbol: `${SYMBOL_ICON_BASE}/dark.svg`
        }
    },
    fairy: {
        id: 18,
        color: '#eb8fe5',
        icons: {
            name: `${NAME_ICON_BASE}/18.png`,
            symbol: `${SYMBOL_ICON_BASE}/fairy.svg`
        }
    }
} as const;

export const STATS = {
    'hp': { displayName: 'HP', icon: HeartIcon },
    'attack': { displayName: 'ATK', icon: SwordIcon },
    'defense': { displayName: 'DEF', icon: ShieldIcon },
    'special-attack': { displayName: 'SP. ATK', icon: MagicWandIcon },
    'special-defense': { displayName: 'SP. DEF', icon: ShieldPlusIcon },
    'speed': { displayName: 'SPD', icon: LightningIcon }
} as const;

export const API_BASE_URL = 'https://pokeapi.co/api/v2';

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
    { label: 'Origin Forme', suffix: '-origin', category: FORM_CATEGORIES.forme },
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
