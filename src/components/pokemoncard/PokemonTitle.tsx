import { formatName, formatId } from '#/lib/pokemon/format';

type PokemonTitleProps = {
    name: string;
    id: number;
};

export const PokemonTitle = ({ name, id }: PokemonTitleProps) => {
    return (
        <div className="flex flex-col px-4 pb-4">
            <span className="text-3xl font-semibold">{formatName(name)}</span>
            <span className="text-lg font-medium text-muted-foreground">{formatId(id)}</span>
        </div>
    );
};
