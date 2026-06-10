import { usePokemon } from '#/hooks/usePokemon';
import { pokemonListQueryOptions } from '#/hooks/usePokemonList';
import { findAdjacentPokemon, flattenEvolutions } from '#/lib/pokemon.utils';
import { useSuspenseQueries, useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute, redirect, useNavigate } from '@tanstack/react-router';
import { useHotkey } from '@tanstack/react-hotkeys';
import { PokemonCard } from '#/components/pokemon/PokemonCard';
import z from 'zod';
import { TABS } from '#/constants/constants';
import { pokemonBasicQueryOptions } from '#/hooks/usePokemonBasic';

const tabSchema = z.object({
    tab: z.enum(TABS).default('about')
});

type TAB = z.infer<typeof tabSchema>['tab'];

const PokemonDetails = () => {
    const { id } = Route.useParams();
    const { tab } = Route.useSearch();

    const navigate = useNavigate({ from: '/pokemon/$id' });

    const { data: pokemon } = usePokemon(id);

    const { data: pokemonList } = useSuspenseQuery({
        ...pokemonListQueryOptions()
    });

    const evolutions = useSuspenseQueries({
        queries: flattenEvolutions(pokemon.evolution).map((e) => pokemonBasicQueryOptions(e.name))
    }).map(({ data }) => data);

    const forms = useSuspenseQueries({
        queries: pokemon.forms.map((f) => pokemonBasicQueryOptions(f.name))
    }).map(({ data }) => data);

    const adjacent = findAdjacentPokemon(pokemon.id, pokemonList);

    useHotkey('ArrowLeft', (e) => {
        e.preventDefault();
        if (adjacent.prev)
            navigate({ to: '/pokemon/$id', params: { id: adjacent.prev.name }, search: { tab } });
    });
    useHotkey('ArrowRight', (e) => {
        e.preventDefault();
        if (adjacent.next)
            navigate({ to: '/pokemon/$id', params: { id: adjacent.next.name }, search: { tab } });
    });

    const handleTabChange = (tab: string) => navigate({ search: { tab: tab as TAB } });

    return <PokemonCard pokemon={pokemon} activeTab={tab} onTabChange={handleTabChange} />;
};

export const Route = createFileRoute('/pokemon/$id')({
    beforeLoad: async ({ params, context }) => {
        if (/^\d+$/.test(params.id)) {
            const data = await context.queryClient.fetchQuery(pokemonBasicQueryOptions(params.id));
            throw redirect({ to: '/pokemon/$id', params: { id: data.name } });
        }
    },
    component: PokemonDetails,
    validateSearch: tabSchema
});
