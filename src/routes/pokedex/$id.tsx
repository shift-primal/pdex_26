import { ErrorComponent } from '#/components/layout/ErrorComponent';
import { LoadingComponent } from '#/components/layout/LoadingComponent';
import { PokemonCard } from '#/components/pokemoncard/PokemonCard';
import { usePokemon } from '#/hooks/usePokemon';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useEffect } from 'react';
import { z } from 'zod';

const searchSchema = z.object({
    tab: z.string().optional().default('about')
});

const PokemonCardPage = () => {
    const { id } = Route.useParams();
    const { tab } = Route.useSearch();
    const navigate = useNavigate({ from: '/pokedex/$id' });
    const { data: pokemon, isLoading, isError } = usePokemon(id);

    const setTab = (value: string) =>
        navigate({ search: (prev) => ({ ...prev, tab: value }), replace: true });

    useEffect(() => {
        if (!pokemon) return;
        const hasEvolutions =
            pokemon.evolution?.evolvesFrom !== null || pokemon.evolution?.evolvesTo.length > 0;
        const hasForms = pokemon.forms.length > 1;
        if ((tab === 'evolutions' && !hasEvolutions) || (tab === 'forms' && !hasForms)) {
            setTab('about');
        }
    }, [pokemon?.id]);

    if (isLoading) {
        return <LoadingComponent />;
    }
    if (isError || !pokemon) {
        return <ErrorComponent />;
    }

    return <PokemonCard pokemon={pokemon} activeTab={tab} onTabChange={setTab} />;
};

export const Route = createFileRoute('/pokedex/$id')({
    validateSearch: searchSchema,
    component: PokemonCardPage
});
