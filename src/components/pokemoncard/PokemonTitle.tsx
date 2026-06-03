import { formatName, parseId } from '#/lib/utils-pokemon';

type PokemonTitleProps = {
    name: string;
    id: number;
    isDefault: boolean;
};

export const PokemonTitle = ({ name, id }: PokemonTitleProps) => {
    return (
        <div className="flex flex-col px-4 pb-4">
            <span className="text-3xl font-semibold">{formatName(name)}</span>
            <span className="text-lg font-medium text-muted-foreground">{parseId(id)}</span>
        </div>
    );
};
