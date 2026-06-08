import { usePokemon } from '#/hooks/usePokemon';
import { pokemonListQueryOptions } from '#/hooks/usePokemonList';
import { findAdjacentPokemon, flattenEvolutions } from '#/lib/pokemon.utils';
import { useSuspenseQueries, useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useHotkey } from '@tanstack/react-hotkeys';
import { pokemonBasicQueryOptions } from '#/hooks/usePokemonBasic';

const PokemonDetails = () => {
    const { id } = Route.useParams();

    const navigate = useNavigate({ from: '/pokedex/$id' });

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

    const adjacent = pokemon && pokemonList ? findAdjacentPokemon(pokemon.id, pokemonList) : null;

    useHotkey('ArrowLeft', () => {
        if (adjacent?.prev) navigate({ to: '/pokedex/$id', params: { id: adjacent.prev.name } });
    });
    useHotkey('ArrowRight', () => {
        if (adjacent?.next) navigate({ to: '/pokedex/$id', params: { id: adjacent.next.name } });
    });

    return (
        <div>
            <p>hey</p>
        </div>
    );
};

export const Route = createFileRoute('/pokedex/$id')({
    component: PokemonDetails
});
