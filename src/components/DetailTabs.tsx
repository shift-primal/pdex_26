import { getRouteApi, useNavigate } from "@tanstack/react-router"
import { Tabs } from "radix-ui"
import { Suspense, useTransition } from "react"
import * as TabsContent from "#/components/tabs"
import { TABS, type Tab } from "#/config/general.config"
import { useScrollRestoration } from "#/hooks/useScrollRestoration"
import { cn } from "#/lib/utils"

const route = getRouteApi("/pokemon/$id")

const TAB_CONTENT: Record<Tab, React.ComponentType> = {
	"about": TabsContent.About,
	"stats": TabsContent.Stats,
	"evolutions": TabsContent.Evolutions,
	"varieties": TabsContent.Varieties,
	"abilities": TabsContent.Abilities,
	"relations": TabsContent.Relations
}

const TabFallback = () => (
	<div className="flex h-40 items-center justify-center">
		<div className="size-7 animate-spin rounded-full border-2 border-line border-t-type" />
	</div>
)

export const DetailTabs = ({ tab }: { tab: Tab }) => {
	const { id } = route.useParams()
	const navigate = useNavigate({ from: "/pokemon/$id" })
	const [isPending, startTransition] = useTransition()
	const onTabChange = (v: Tab) =>
		startTransition(() => navigate({ replace: true, resetScroll: false, search: (s) => ({ ...s, tab: v }) }))

	useScrollRestoration(`${id}|${tab}`)

	return (
		<Tabs.Root value={tab} onValueChange={(v) => onTabChange(v as Tab)} className="flex flex-col">
			<div className="relative -mx-1 px-1">
				<Tabs.List className="scrollbar-none flex shrink-0 gap-1 overflow-x-auto md:gap-1.5">
					{TABS.map((t) => (
						<Tabs.Trigger
							key={t}
							value={t}
							className={cn(
								"relative shrink-0 whitespace-nowrap rounded-full px-3.5 py-1.5 font-mono text-[0.7rem] font-bold uppercase tracking-widest transition",
								"text-ink-faint hover:text-ink-soft",
								"data-[state=active]:bg-[color-mix(in_oklab,var(--type)_75%,white)] data-[state=active]:text-[color-mix(in_oklab,var(--type)_55%,black)]",
								"focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-type"
							)}
						>
							{t}
						</Tabs.Trigger>
					))}
				</Tabs.List>
				{/* hints that the tab list scrolls horizontally on narrow screens */}
				<div className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-sheet to-transparent" />
			</div>

			<div className={cn("mt-6 min-w-0", isPending && "opacity-50 transition-opacity")}>
				<Suspense fallback={<TabFallback />}>
					{TABS.map((t) => {
						const Content = TAB_CONTENT[t]
						return (
							<Tabs.Content key={t} value={t} className="focus-visible:outline-none">
								<Content />
							</Tabs.Content>
						)
					})}
				</Suspense>
			</div>
		</Tabs.Root>
	)
}
