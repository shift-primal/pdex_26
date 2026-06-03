import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const capFirstLetter = (text: string) => {
    text.replaceAll(' ', '-');

    if (!text.includes('-')) {
        return text.charAt(0).toUpperCase() + text.slice(1);
    }

    return text
        .split('-')
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ');
};
