export const matchesQuery = (entry: { id: number; name: string }, rawQuery: string): boolean => {
	const q = rawQuery.trim().toLowerCase()
	if (q === "") return true

	const idQuery = q.replace(/^#/, "")
	if (/^\d+$/.test(idQuery)) return entry.id === Number(idQuery)

	const slugQuery = q.replace(/[.']/g, "").replace(/\s+/g, "-")
	return entry.name.includes(slugQuery)
}
