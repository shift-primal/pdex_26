import { Tabs } from "radix-ui"
import { TABS, type Tab } from "#/config/general.config"
import * as TabsContent from "#/components/tabs"

export const DetailTabs = ({ tab, onTabChange }: { tab: Tab; onTabChange: (v: Tab) => void }) => {
	return (
		<Tabs.Root value={tab} onValueChange={(v) => onTabChange(v as Tab)} orientation="horizontal">
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
			<Tabs.Content value="about" className="py-4">
				<TabsContent.About />
			</Tabs.Content>
			<Tabs.Content value="stats" className="py-4">
				<TabsContent.Stats />
			</Tabs.Content>
			<Tabs.Content value="evolutions" className="py-4">
				<TabsContent.Evolutions />
			</Tabs.Content>
			<Tabs.Content value="varieties" className="py-4">
				<TabsContent.Varieties />
			</Tabs.Content>
			<Tabs.Content value="abilities" className="py-4">
				<TabsContent.Abilities />
			</Tabs.Content>
		</Tabs.Root>
	)
}
