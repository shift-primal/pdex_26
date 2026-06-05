import { FORM_TYPES } from '#/constants';

export const getSpeciesName = (name: string) => {
    const form = FORM_TYPES.find((ft) => name.includes(ft.suffix));
    return form ? name.replace(form.suffix, '') : name;
};

export const formatName = (name: string, isFormEntry: boolean) => {
    const form = FORM_TYPES.find((ft) => name.includes(ft.suffix));
    if (!form) return capFirstLetter(name);

    const base = name.replace(form.suffix, '');

    if (isFormEntry) return form.label;

    return `${capFirstLetter(base)} ${capFirstLetter(form.label)}`;
};

export const formatId = (id: number) => '#' + id.toString().padStart(4, '0');

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
