import type { PokemonForm } from '#/types/pokemon';
import { useQueries } from '@tanstack/react-query';
import { ArrowRightIcon } from '@phosphor-icons/react';
import { fetchPokemon } from '#/services/api';
import { LoadingComponent } from '#/components/layout/LoadingComponent';
import { PokemonEntry, selectBasic } from '#/components/pokemoncard/tabs/PokemonEntry';
import { ErrorComponent } from '@tanstack/react-router';

type PokemonFormsProps = {
    current: string;
    forms: PokemonForm[];
};

export const PokemonForms = ({ current, forms }: PokemonFormsProps) => {
    const results = useQueries({
        queries: forms.map((f) => ({
            queryKey: ['pokemon-basic', f.name],
            queryFn: () => fetchPokemon(f.name),
            staleTime: Infinity,
            select: selectBasic
        }))
    });

    if (results.some((r) => !r.data || r.isLoading)) return <LoadingComponent />;
    if (results.some((r) => r.isError)) return <ErrorComponent error={'Idk'} />;

    const entries = Object.fromEntries(results.map((r) => [r.data!.name, r.data!]));

    const defaultForm = forms.find((f) => f.isDefault);
    const altForms = forms.filter((f) => !f.isDefault);

    return (
        <div className="flex flex-col gap-4 h-full justify-center">
            {altForms.map((f) => (
                <div key={f.name} className="flex items-center justify-center gap-4">
                    {defaultForm && (
                        <PokemonEntry
                            {...entries[defaultForm.name]}
                            isCurrent={defaultForm.name === current}
                        />
                    )}
                    <ArrowRightIcon />
                    <PokemonEntry {...entries[f.name]} isCurrent={f.name === current} />
                </div>
            ))}
        </div>
    );
};
