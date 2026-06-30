const SPRITE_BASE = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon"

export const showdownSpriteFromId = (id: number): string => `${SPRITE_BASE}/other/showdown/${id}.gif`

export const idFromUrl = (url: string): number => Number(url.split("/").filter(Boolean).pop())
