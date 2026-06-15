import { TabAbout } from "#/components/pokemon/tabs/TabAbout";
import { TabBaseStats } from "#/components/pokemon/tabs/TabBaseStats";
import { TabEvolutions } from "#/components/pokemon/tabs/TabEvolutions";
import { TabForms } from "#/components/pokemon/tabs/TabForms";

export const TABS = ["about", "base-stats", "evolutions", "forms"] as const;

type Tab = (typeof TABS)[number];

export const tabsConfig: Record<Tab, { component: () => React.ReactElement }> =
	{
		about: { component: TabAbout },
		"base-stats": { component: TabBaseStats },
		evolutions: { component: TabEvolutions },
		forms: { component: TabForms }
	};
