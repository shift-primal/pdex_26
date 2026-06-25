import { Tabs } from "radix-ui"
import { TABS, type Tab } from "#/config/general.config"
import * as TabsContent from "#/components/tabs"
import { Suspense, useTransition } from "react"
import { TemporaryWrapper } from "#/components/TemporaryWrapper"
import { useNavigate } from "@tanstack/react-router"

const TAB_CONTENT: Record<Tab, React.ComponentType> = {
	"about": TabsContent.About,
	"stats": TabsContent.Stats,
	"evolutions": TabsContent.Evolutions,
	"varieties": TabsContent.Varieties,
	"abilities": TabsContent.Abilities,
	"relations": TabsContent.Relations
}

export const DetailTabs = ({ tab }: { tab: Tab }) => {
	const navigate = useNavigate({ from: "/pokemon/$id" })
	const [isPending, startTransition] = useTransition()
	const onTabChange = (v: Tab) =>
		startTransition(() =>
			navigate({
				replace: true,
				search: (s) => ({ ...s, tab: v })
			})
		)

	return (
		<Tabs.Root value={tab} onValueChange={(v) => onTabChange(v as Tab)}>
			<Tabs.List
				className="flex gap-1 overflow-x-auto
                   scrollbar-none [&::-webkit-scrollbar]:hidden
                   lg:overflow-visible"
			>
				{TABS.map((t) => (
					<Tabs.Trigger
						key={t}
						value={t}
						className="shrink-0 whitespace-nowrap px-4 py-2 text-sm capitalize text-muted-foreground
                       border-b-2 border-transparent
                       data-[state=active]:border-foreground data-[state=active]:text-foreground
                       focus-visible:outline-2 focus-visible:outline-offset-2"
					>
						{t}
					</Tabs.Trigger>
				))}
			</Tabs.List>
			<div className={isPending ? "opacity-50 transition-opacity" : ""}>
				<Suspense
					fallback={
						<TemporaryWrapper title="Loading">
							<p>Loading</p>
						</TemporaryWrapper>
					}
				>
					{TABS.map((t) => {
						const Content = TAB_CONTENT[t]
						return (
							<Tabs.Content key={t} value={t} className="py-4">
								<Content />
							</Tabs.Content>
						)
					})}
				</Suspense>
			</div>
		</Tabs.Root>
	)
}
