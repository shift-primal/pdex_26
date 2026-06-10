import { TabAbout } from '#/components/pokemon/tabs/TabAbout';
import { TabBaseStats } from '#/components/pokemon/tabs/TabBaseStats';
import { TabEvolutions } from '#/components/pokemon/tabs/TabEvolutions';
import { TabForms } from '#/components/pokemon/tabs/TabForms';

export const tabsConfig = {
    'about': { component: TabAbout },
    'base-stats': { component: TabBaseStats },
    'evolutions': { component: TabEvolutions },
    'forms': { component: TabForms }
};
