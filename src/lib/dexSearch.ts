export const matchesQuery = (entry: { id: number; name: string }, rawQuery: string): boolean => {
	const q = rawQuery.trim().toLowerCase()
	if (q === "") return true

	const idQuery = q.replace(/^#/, "")
	if (/^\d+$/.test(idQuery)) return entry.id === Number(idQuery)

	return entry.name.includes(q.replace(/\s+/g, "-"))
}
