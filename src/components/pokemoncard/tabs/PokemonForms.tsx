import type { PokemonForm } from '#/types/pokemon';
import { useQueries } from '@tanstack/react-query';
import { fetchPokemon } from '#/services/api';
import { LoadingComponent } from '#/components/layout/LoadingComponent';
import { PokemonEntry, selectBasic } from '#/components/pokemoncard/tabs/PokemonEntry';
import { ErrorComponent } from '@tanstack/react-router';
import { FORM_CATEGORIES } from '#/constants';

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

    results.find((r) => r.isError) && <ErrorComponent error={results.find((r) => r.error)} />;

    const entries = Object.fromEntries(results.map((r) => [r.data!.name, r.data!]));

    const defaultForm = forms.find((f) => f.isDefault);
    const altForms = forms.filter((f) => !f.isDefault);

    const sortedGroups = Object.values(FORM_CATEGORIES)
        .map(({ label }) => ({ label, forms: altForms.filter((f) => f.formType === label) }))
        .filter(({ forms }) => forms.length > 0);

    const FormBadge = ({ formName }: { formName: string }) => (
        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground bg-background-lighter rounded-full px-3 py-0.5 my-2">
            {formName}
        </span>
    );

    const FormContainer = ({ children }: { children: React.ReactNode }) => {
        return (
            <div className="flex flex-col items-center border border-accent inline-shadow-2xs bg-muted py-4 rounded-md px-2">
                {children}
            </div>
        );
    };

    return (
        <div className="flex flex-wrap items-center justify-evenly gap-4">
            <FormContainer>
                <FormBadge formName="Base" />
                <PokemonEntry
                    {...entries[defaultForm!.name]}
                    isCurrent={defaultForm!.name === current}
                />
            </FormContainer>
            {sortedGroups.map(({ label, forms: groupForms }) => (
                <FormContainer key={label}>
                    <FormBadge formName={label} />
                    <div className="flex gap-4 h-full justify-center">
                        {groupForms.map((f) => (
                            <PokemonEntry
                                {...entries[f.name]}
                                isCurrent={f.name === current}
                                key={f.name}
                            />
                        ))}
                    </div>
                </FormContainer>
            ))}
        </div>
    );
};
