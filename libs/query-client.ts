import { QueryClient } from "@tanstack/react-query";

export const client = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1000 * 60 * 5,
            refetchOnWindowFocus: false,
            retry: 1
        }
    }
})