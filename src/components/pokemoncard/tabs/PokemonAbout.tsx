import { Progress } from '#/components/ui/progress';
import { capFirstLetter } from '#/lib/pokemon/format';
import type { Pokemon } from '#/types/pokemon';
import {
    GenderFemaleIcon,
    GenderIntersexIcon,
    GenderMaleIcon,
    GlobeIcon,
    RulerIcon,
    ScalesIcon,
    ShapesIcon,
    TrophyIcon,
    type Icon
} from '@phosphor-icons/react';

const AboutEntry = ({ title, value, Icon }: { title: string; value: string; Icon: Icon }) => (
    <div className="flex items-center justify-between text-sm">
        <div className="flex gap-x-1.5 items-center">
            <Icon size={16} className="text-muted-foreground" />
            <span className="text-muted-foreground">{title}</span>
        </div>
        <span>{capFirstLetter(value)}</span>
    </div>
);

const metersToFeet = (meters: number) => {
    const totalInches = meters * 39.37;
    return {
        feet: Math.floor(totalInches / 12),
        inches: Math.round(totalInches % 12)
    };
};

const parseHeight = (meters: number) => {
    const { feet, inches } = metersToFeet(meters);
    return `${meters.toFixed(1)}m (${feet}'${inches}")`;
};

const parseWeight = (kg: number) => {
    return `${kg.toFixed(1)}kg (${(kg * 2.2).toFixed(1)}lbs)`;
};

const GenderBar = ({ genderRate }: { genderRate: number }) => {
    return (
        <div className="flex items-center justify-center px-px">
            <GenderMaleIcon size={16} className="text-muted-foreground" />
            <div className="w-full px-4">
                <Progress
                    value={100 - (genderRate / 8) * 100}
                    className="h-2 rounded-full mt-1"
                    colorFilled="#0b6dc3"
                    colorUnfilled="#eb8fe5"
                />
            </div>
            <GenderFemaleIcon size={16} className="text-muted-foreground" />
        </div>
    );
};

export const PokemonAbout = ({ pokemon }: { pokemon: Pokemon }) => {
    return (
        <div className="flex flex-col gap-2 px-4">
            <div className="flex flex-col gap-y-2">
                <span className="font-semibold">General info</span>
                <AboutEntry title="Height" value={parseHeight(pokemon.height)} Icon={RulerIcon} />
                <AboutEntry title="Weight" value={parseWeight(pokemon.weight)} Icon={ScalesIcon} />
                <AboutEntry
                    title="Generation"
                    value={
                        pokemon.generation
                            ? `${pokemon.generation.label} (Gen. ${pokemon.generation.roman})`
                            : 'Unknown'
                    }
                    Icon={TrophyIcon}
                />
                <AboutEntry title="Habitat" value={pokemon.habitat || 'Unknown'} Icon={GlobeIcon} />
                <AboutEntry title="Shape" value={pokemon.shape || 'Unknown'} Icon={ShapesIcon} />
            </div>
            <div className="flex flex-col gap-y-2">
                <span className="font-semibold">Breeding info</span>
                <AboutEntry
                    title="Genderless"
                    value={pokemon.gender?.hasGenderDifferences ? 'Yes' : 'No'}
                    Icon={GenderIntersexIcon}
                />
                <GenderBar genderRate={pokemon.gender?.genderRate ?? 0} />
            </div>
            <span className="w-full line-clamp-2 text-center">{pokemon.flavorText}</span>
        </div>
    );
};
