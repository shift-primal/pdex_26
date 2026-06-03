● You need a category field on FORM_TYPES to group
things like Mega X and Mega Y together. Here's the
plan:

Step 1 — add category to FORM_TYPES:
{ label: 'Mega X', suffix: '-mega-x', category:
'Mega' },
{ label: 'Mega Y', suffix: '-mega-y', category:
'Mega' },
{ label: 'Mega', suffix: '-mega', category:
'Mega' },
{ label: 'Gigantamax', suffix: '-gmax', category:
'Gigantamax' },
// etc.

Step 2 — update PokemonVariety to store the category:
variety: string | null // change to category, e.g.
'Mega', 'Gigantamax'

Step 3 — group in PokemonVarieties:
const groups = Object.groupBy(
varieties.filter((v) => !v.isDefault),
(v) => v.variety ?? 'Other'
);

Step 4 — render:

- Default on top
- <ArrowDownIcon />
- Each group in its own labeled box

Start with Step 1 — add category to all entries in
FORM_TYPES, then show me and we'll wire up the rest.
