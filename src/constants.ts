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

export const ROMAN_DICT: Record<string, number> = {
    i: 1,
    ii: 2,
    iii: 3,
    iv: 4,
    v: 5,
    vi: 6,
    vii: 7,
    viii: 8,
    ix: 9,
    x: 10
} as const;

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
    'hp': HeartIcon,
    'attack': SwordIcon,
    'defense': ShieldIcon,
    'special-attack': MagicWandIcon,
    'special-defense': ShieldPlusIcon,
    'speed': LightningIcon
} as const;

export const API_BASE_URL = 'https://pokeapi.co/api/v2';
