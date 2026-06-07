import {
    HeartIcon,
    LightningIcon,
    MagicWandIcon,
    ShieldIcon,
    ShieldPlusIcon,
    SigmaIcon,
    SwordIcon
} from '@phosphor-icons/react';

export const getTypeIcon = (name: string) =>
    `'https://raw.githubusercontent.com/duiker101/pokemon-type-svg-icons/master/icons'/${name}.svg`;

export const STAT_ICONS = {
    'hp': HeartIcon,
    'attack': SwordIcon,
    'defense': ShieldIcon,
    'special-attack': MagicWandIcon,
    'special-defense': ShieldPlusIcon,
    'speed': LightningIcon,
    'total': SigmaIcon
} as const;
