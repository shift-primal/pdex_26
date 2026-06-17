import { createFileRoute, Link } from "@tanstack/react-router"

export const Route = createFileRoute("/")({
	component: Home
})

function Home() {
	return (
		<div>
			<h1>Pokedex (data sandbox)</h1>
			<ul>
				<li>
					<Link to="/pokemon" search={{ search: undefined, page: 1, pageSize: 25 }}>
						/pokemon — list
					</Link>
				</li>
				<li>
					<Link to="/pokemon/$id" params={{ id: "bulbasaur" }} search={{ tab: "about" }}>
						/pokemon/bulbasaur — detail
					</Link>
				</li>
			</ul>
		</div>
	)
}
