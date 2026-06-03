import { capFirstLetter } from '#/lib/utils';
import type { PokemonGeneration } from '#/types/pokemon';
import { GlobeIcon, RulerIcon, ScalesIcon, TrophyIcon, type Icon } from '@phosphor-icons/react';

const AboutEntry = ({ title, value, Icon }: { title: string; value: string; Icon: Icon }) => (
    <div className="flex items-center justify-between text-sm">
        <div className="flex gap-x-1.5 items-center">
            <Icon size={16} className="text-muted-foreground" />
            <span className="text-muted-foreground">{title}</span>
        </div>
        <span>{capFirstLetter(value)}</span>
    </div>
);

type PokemonAboutProps = {
    generation: PokemonGeneration | null;
    height: number;
    weight: number;
    habitat: string;
};

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

export const PokemonAbout = ({ generation, height, weight, habitat }: PokemonAboutProps) => {
    return (
        <div className="flex flex-col gap-4 px-4">
            <span className="font-semibold">General info</span>
            <AboutEntry title="Height" value={parseHeight(height)} Icon={RulerIcon} />
            <AboutEntry title="Weight" value={parseWeight(weight)} Icon={ScalesIcon} />
            <AboutEntry
                title="Generation"
                value={generation ? `${generation.label} (Gen. ${generation.roman})` : 'Unknown'}
                Icon={TrophyIcon}
            />
            <AboutEntry title="Habitat" value={habitat || 'Unknown'} Icon={GlobeIcon} />
        </div>
    );
};
