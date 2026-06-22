# TODO

- [ ] **Intent-based prefetch on `Chip`** — on hover/focus of a variety/evolution chip, fire `queryClient.prefetchQuery(...)` for that variety/form so the cache is warm before the click lands. Do it in the shared `Chip` component so it covers both `VarietySwitcher` and `EvolutionChain` at once. Prefetch the raw query (note: `prefetchQuery`/`ensureQueryData` don't run `select`). Optionally add a non-awaited loader prefetch for the bounded evolution-node set.
