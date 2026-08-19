import { QueryClient } from "@tanstack/react-query"
import { ApiError } from "#/services/api"

export function getContext() {
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				retry: (failureCount, error) => !(error instanceof ApiError && error.status === 404) && failureCount < 3
			}
		}
	})

	return {
		queryClient
	}
}
export default function TanstackQueryProvider() {}
