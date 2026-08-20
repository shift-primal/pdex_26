# pdex_26

A full National Pokédex — every species, form, and variety through Gen IX — built on [PokéAPI](https://pokeapi.co/).

**Live:** [pokemon.haugestol.com](https://pokemon.haugestol.com)

## Features

- Browse and search the full dex, with type/generation filters and sorting, in a virtualized grid (smooth scrolling even with 1000+ entries)
- Pre-fetching for evolutions, next and prev, also pre-fetch based on scroll position in the grid view.
- Caching to be kind to PokeAPI, but also to have a better experience for the user. 
- Per-Pokémon detail pages: stats, abilities, type matchups, evolution chain, and variety/form switching (e.g. Mega Charizard X vs base Charizard)
- Keyboard navigation between adjacent Pokémon, with mobile-friendly prev/next controls
- Retry/error handling around PokéAPI requests, with a dedicated error state instead of a blank crash

## Stack

- [TanStack Start](https://tanstack.com/start) (React 19, file-based routing, SSR) on [Nitro](https://nitro.build/)
- [TanStack Query](https://tanstack.com/query) for data fetching/caching, [TanStack Virtual](https://tanstack.com/virtual) for the grid
- Tailwind CSS 4
- Zod for API response validation
- Biome for linting/formatting
- Vite + Vitest

## Architecture notes

- `src/services/api.ts` — thin PokéAPI client with typed responses
- `src/queries/` — one `queryOptions` factory per resource (species, variety, form, ability, type), sharing a common shape via `factory.ts`
- `src/lib/domain/` — pure helpers for evolution chains and Pokémon data shaping, kept separate from fetching/rendering
- `src/lib/parsers/` — raw PokéAPI payloads → app-facing types, validated with Zod

## Running locally

```bash
pnpm install
pnpm dev
```

No environment variables or database needed — it's a pure client of the public PokéAPI.

## Deployment

Builds to a Node server via Nitro (`pnpm build` → `pnpm start`), deployed as a Docker image on [Coolify](https://coolify.io).
