import { TabContainer } from "#/components/pokemon/tabs/TabContainer";
import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from "#/components/shadcn/tabs";
import { tabsConfig } from "#/config/tabs";
import { TABS } from "#/constants/constants";
import { usePokemonCard } from "#/context/PokemonCardContext";
import type { PokemonCardProps } from "#/types/props/card";

export const CardTabs = ({
	activeTab,
	onTabChange,
}: Pick<PokemonCardProps, "activeTab" | "onTabChange">) => {
	const { active } = usePokemonCard();
	return (
		<Tabs
			value={activeTab}
			onValueChange={onTabChange}
			className="h-full bg-accent/95 shadow-lg border-t border-t-accent/25 mt-6 rounded-t-4xl p-4"
		>
			<TabsList className="w-full" variant="line">
				{TABS.map((t) => (
					<TabsTrigger
						key={t}
						value={t}
						color={active.types[0].color}
						onKeyDown={(e) => {
							if (e.key === "ArrowLeft" || e.key === "ArrowRight")
								e.preventDefault();
						}}
					>
						<span className="capitalize text-base">
							{t.replaceAll("-", " ")}
						</span>
					</TabsTrigger>
				))}
			</TabsList>
			{TABS.map((t) => {
				const Tab = tabsConfig[t].component;
				return (
					<TabsContent key={t} value={t}>
						<TabContainer>
							<Tab />
						</TabContainer>
					</TabsContent>
				);
			})}
		</Tabs>
	);
};
