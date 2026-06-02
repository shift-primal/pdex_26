import { cn } from '#/lib/utils-general';

export const PokemonImage = ({
    sprite,
    size = 'lg'
}: {
    sprite: string;
    size?: 'xs' | 'sm' | 'md' | 'lg';
}) => {
    const SIZES = {
        xs: 'w-20 h-20',
        sm: 'w-32 h-32',
        md: 'w-48 h-48',
        lg: 'w-72 h-72'
    };

    return (
        <div className={size === 'lg' ? 'pt-30' : ''}>
            <div className={cn('flex items-center justify-center mx-auto', SIZES[size])}>
                <img src={sprite} className="w-full h-full object-contain" />
            </div>
        </div>
    );
};
