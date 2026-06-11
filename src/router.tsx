import { createRouter as createTanStackRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

import { setupRouterSsrQueryIntegration } from "@tanstack/react-router-ssr-query";
import { getContext } from "./integrations/tanstack-query/root-provider";
import { DefaultPendingComponent } from "#/components/layout/DefaultPendingComponent";
import { DefaultNotFoundComponent } from "#/components/layout/DefaultNotFoundComponent";
import { DefaultErrorComponent } from "#/components/layout/DefaultErrorComponent";

export function getRouter() {
	const context = getContext();

	const router = createTanStackRouter({
		routeTree,
		context,
		scrollRestoration: true,
		defaultPreload: "intent",
		defaultPreloadStaleTime: 0,
		defaultNotFoundComponent: DefaultNotFoundComponent,
		defaultPendingComponent: DefaultPendingComponent,
		defaultErrorComponent: DefaultErrorComponent,
	});

	setupRouterSsrQueryIntegration({
		router,
		queryClient: context.queryClient,
	});

	return router;
}

declare module "@tanstack/react-router" {
	interface Register {
		router: ReturnType<typeof getRouter>;
	}
}
