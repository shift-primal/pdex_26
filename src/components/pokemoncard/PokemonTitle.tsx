import { capFirstLetter } from '#/lib/utils-general';
import { parseId } from '#/lib/utils-pokemon';

type PokemonTitleProps = {
    name: string;
    id: number;
};

export const PokemonTitle = (props: PokemonTitleProps) => {
    const { name, id } = props;
    return (
        <div className="flex flex-col p-4">
            <span className="text-3xl font-semibold line-clamp-2 text-fg">
                {capFirstLetter(name)}
            </span>
            <span className="text-lg font-medium text-semimuted-fg">{parseId(id)}</span>
        </div>
    );
};
