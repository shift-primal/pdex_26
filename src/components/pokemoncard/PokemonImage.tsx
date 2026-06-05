import { cn } from '#/lib/utils';

export const PokemonImage = ({
    sprite,
    size = 'lg',
    name
}: {
    sprite: string;
    size?: 'xxs' | 'xs' | 'sm' | 'md' | 'lg';
    name: string;
}) => {
    const SIZES = {
        xxs: 'w-20 h-20',
        xs: 'w-24 h-24',
        sm: 'w-32 h-32',
        md: 'w-48 h-48',
        lg: 'w-72 h-72'
    };

    return (
        <div className={size === 'lg' ? 'pt-15' : ''}>
            <div className={cn('flex items-center justify-center mx-auto', SIZES[size])}>
                <img
                    src={sprite}
                    className="w-full h-full object-contain drop-shadow-2xl object-center"
                    alt={name}
                />
            </div>
        </div>
    );
};
