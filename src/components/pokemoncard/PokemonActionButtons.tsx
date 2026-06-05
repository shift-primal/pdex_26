import { cn } from '#/lib/utils';
import { PlayIcon, StarIcon } from '@phosphor-icons/react';
import useSound from 'use-sound';

type PokemonPlaySoundProps = {
    sound: string;
};

type PokemonShinyToggleProps = {
    shiny: boolean;
    setShiny: React.Dispatch<React.SetStateAction<boolean>>;
};

type PokemonActionButtonsProps = PokemonPlaySoundProps & PokemonShinyToggleProps;

const ActionButton = ({
    infoText,
    className,
    children,
    ...props
}: React.ComponentProps<'button'> & { infoText: string }) => (
    <div className="flex flex-col items-center">
        <button
            className={cn('active:scale-90 transition-all p-1 cursor-pointer', className)}
            {...props}
        >
            {children}
        </button>
        <span className="text-xs text-foreground/80 hidden">{infoText}</span>
    </div>
);

const PokemonPlaySound = ({ sound }: PokemonPlaySoundProps) => {
    const [play] = useSound(sound, { volume: 0.25 });
    return (
        <ActionButton onClick={() => play()} infoText="Cry">
            <PlayIcon size={24} className="text-muted-foreground" weight="bold" />
        </ActionButton>
    );
};

const PokemonShinyToggle = ({ shiny, setShiny }: PokemonShinyToggleProps) => (
    <ActionButton onClick={() => setShiny((p) => !p)} infoText="Shiny">
        <StarIcon size={24} weight={shiny ? 'fill' : 'bold'} color="#f2d13b" />
    </ActionButton>
);

export const PokemonActionButtons = ({ sound, shiny, setShiny }: PokemonActionButtonsProps) => {
    return (
        <div className="absolute right-6 top-4 flex items-center gap-x-2 p-1 bg-accent rounded-lg">
            <PokemonPlaySound sound={sound} />
            <PokemonShinyToggle shiny={shiny} setShiny={setShiny} />
        </div>
    );
};
