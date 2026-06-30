import { useNavigate } from "@tanstack/react-router"
import { Tabs } from "radix-ui"
import { Suspense, useTransition } from "react"
import * as TabsContent from "#/components/tabs"
import { TABS, type Tab } from "#/config/general.config"
import { cn } from "#/lib/utils"

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
	const navigate = useNavigate({ from: "/pokemon/$id" })
	const [isPending, startTransition] = useTransition()
	const onTabChange = (v: Tab) =>
		startTransition(() => navigate({ replace: true, search: (s) => ({ ...s, tab: v }) }))

	return (
		<Tabs.Root value={tab} onValueChange={(v) => onTabChange(v as Tab)} className="flex min-h-0 flex-1 flex-col">
			<Tabs.List className="scrollbar-none -mx-1 flex shrink-0 gap-1 overflow-x-auto px-1">
				{TABS.map((t) => (
					<Tabs.Trigger
						key={t}
						value={t}
						className={cn(
							"relative shrink-0 whitespace-nowrap rounded-full px-3.5 py-1.5 font-mono text-[0.7rem] font-bold uppercase tracking-widest transition",
							"text-ink-faint hover:text-ink-soft",
							"data-[state=active]:bg-[color-mix(in_oklab,var(--type)_14%,white)] data-[state=active]:text-[color-mix(in_oklab,var(--type)_55%,black)]",
							"focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-type"
						)}
					>
						{t}
					</Tabs.Trigger>
				))}
			</Tabs.List>

			<div
				className={cn(
					"mt-4 min-h-0 min-w-0 flex-1 overflow-y-auto pr-0.5",
					isPending && "opacity-50 transition-opacity"
				)}
			>
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
