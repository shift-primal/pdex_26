import { RulerIcon, ScalesIcon, type Icon } from '@phosphor-icons/react';

type PokemonInfoProps = {
    height: number;
    weight: number;
};

const parseHeight = (height: number) => `${height.toFixed(1)} m`;
const parseWeight = (weight: number) => `${weight.toFixed(1)} kg`;

const Badge = ({ title, value, Icon }: { title: string; value: string; Icon: Icon }) => (
    <div className="flex flex-col gap-y-1 items-center">
        <div className="flex gap-x-1">
            <Icon size={20} className="text-semimuted" />
            <span className="text-sm text-semimuted">{title}</span>
        </div>
        <span className="text-md border rounded-full text-center px-2">{value}</span>
    </div>
);

export const PokemonInfo = (props: PokemonInfoProps) => {
    const { height, weight } = props;

    return (
        <div className="flex p-4 gap-4">
            <Badge title="Height" value={parseHeight(height)} Icon={RulerIcon} />
            <Badge title="Weight" value={parseWeight(weight)} Icon={ScalesIcon} />
        </div>
    );
};
