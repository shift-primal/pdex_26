import type { PokemonForm } from '#/types/pokemon';
import { PokemonImage } from '#/components/pokemoncard/PokemonImage';
import { usePokemon } from '#/hooks/usePokemon';
import { Link } from '@tanstack/react-router';
import { formatName } from '#/lib/utils-pokemon';
import { ArrowDownIcon } from '@phosphor-icons/react';

const FormEntry = ({ name, isCurrent = false }: { name: string; isCurrent?: boolean }) => {
    const { data: pokemon, isLoading, isError } = usePokemon(name);

    if (isLoading || isError || !pokemon) return null;

    return (
        <Link
            to="/pokedex/$id"
            params={{ id: pokemon.name }}
            className="flex flex-col items-center h-full"
        >
            <div className="flex-1 flex items-center">
                <PokemonImage sprite={pokemon.sprites.front} size={isCurrent ? 'sm' : 'xs'} />
            </div>
            <span className={isCurrent ? 'font-semibold' : ''}>{formatName(name)}</span>
        </Link>
    );
};

type PokemonFormsProps = {
    current: string;
    forms: PokemonForm[];
};

export const PokemonForms = ({ current, forms }: PokemonFormsProps) => {
    const defaultForm = forms.find((f) => f.isDefault);
    const groups = Object.entries(
        Object.groupBy(
            forms.filter((f) => !f.isDefault),
            (f) => f.formType ?? 'Other'
        )
    );

    return (
        <div className="flex flex-col items-center gap-4">
            {defaultForm && (
                <FormEntry name={defaultForm.name} isCurrent={defaultForm.name === current} />
            )}
            {groups.length > 0 && <ArrowDownIcon />}
            {groups.map(([category, categoryForms]) => (
                <div key={category} className="flex flex-col items-center gap-2 w-full">
                    <span className="text-sm font-semibold text-muted-foreground">{category}</span>
                    <div className="flex flex-wrap gap-2 justify-center">
                        {categoryForms?.map((f) => (
                            <FormEntry key={f.name} name={f.name} isCurrent={f.name === current} />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};
