import { getImageSize } from '#/lib/pokemon.utils';
import { cn } from '#/lib/utils';
import type { PokemonSprites } from '#/types/pokemon';
import { WarningCircleIcon } from '@phosphor-icons/react';

export const PokemonSprite = ({
    name,
    sprites,
    size
}: {
    name: string;
    sprites: PokemonSprites;
    size?: 'lg' | 'xl';
}) => {
    const sz = size ? size : 'lg';

    if (!sprites.front.default) {
        return <WarningCircleIcon size={32} weight="fill" className="text-muted-foreground" />;
    }

    return (
        <div className={cn(getImageSize(sz), 'flex items-center justify-center mx-auto mt-24')}>
            <img
                src={sprites.front.default}
                alt={`Sprite of ${name}`}
                className="w-full h-full object-contain drop-shadow-2xl"
            />
        </div>
    );
};
