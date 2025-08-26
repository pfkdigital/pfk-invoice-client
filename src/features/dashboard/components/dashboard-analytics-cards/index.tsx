import { getAnalyticsData } from "@/lib/analytics-api-client"
import { useQuery } from "@tanstack/react-query"
import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardHeader, CardDescription, CardTitle, CardAction, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { IconTrendingUp, IconTrendingDown } from "@tabler/icons-react"
import { formatCurrency } from "@/lib/currency-formatter"

export const DashboardAnalyticsCards = () => {
    const { data, isLoading, error } = useQuery({
        queryKey: ['dashboardAnalytics'],
        queryFn: getAnalyticsData,
        staleTime: 1000 * 60 * 5,
    })

    if (isLoading) {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[...Array(4)].map((_, i) => (
                    <div key={i} className="p-4 bg-card rounded-lg shadow">
                        <Skeleton className="h-6 w-32 mb-2" />
                        <Skeleton className="h-8 w-16" />
                    </div>
                ))}
            </div>
        )
    }

    if (error) {
        return <div className="flex items-center justify-center h-64 text-destructive">Error loading analytics data</div>
    }

    return (
        <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-4 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-4 @m/main:grid-cols-2 @5xl/main:grid-cols-4">
            <Card className="@container/card">
                <CardHeader>
                    <CardDescription>Total Invoices Raised</CardDescription>
                    <CardTitle className="text-xl font-semibold tabular-nums @[250px]/card:text-2xl">
                        {formatCurrency(data.totalAmount)}
                    </CardTitle>
                    <CardAction>
                        <Badge variant="outline">
                            <IconTrendingUp />
                        </Badge>
                    </CardAction>
                </CardHeader>
                <CardFooter className="flex-col items-start gap-1.5 text-sm">
                    <div className="line-clamp-1 flex gap-2 font-medium">
                        Trending up this month <IconTrendingUp className="size-4" />
                    </div>
                    <div className="text-muted-foreground">
                        Revenue growth is on track
                    </div>
                </CardFooter>
            </Card>
            <Card className="@container/card">
                <CardHeader>
                    <CardDescription>Unpaid Amount</CardDescription>
                    <CardTitle className="text-xl font-semibold tabular-nums @[250px]/card:text-2xl">
                        {formatCurrency(data.totalAmountUnpaid)}
                    </CardTitle>
                    <CardAction>
                        <Badge variant="outline">
                            <IconTrendingDown />
                            -20%
                        </Badge>
                    </CardAction>
                </CardHeader>
                <CardFooter className="flex-col items-start gap-1.5 text-sm">
                    <div className="line-clamp-1 flex gap-2 font-medium">
                        Down 20% this period <IconTrendingDown className="size-4" />
                    </div>
                    <div className="text-muted-foreground">
                        Acquisition needs attention
                    </div>
                </CardFooter>
            </Card>
            <Card className="@container/card">
                <CardHeader>
                    <CardDescription>Active Clients</CardDescription>
                    <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                        {data.clientCount}
                    </CardTitle>
                    <CardAction>
                        <Badge variant="outline">
                            <IconTrendingUp />
                            +12.5%
                        </Badge>
                    </CardAction>
                </CardHeader>
                <CardFooter className="flex-col items-start gap-1.5 text-sm">
                    <div className="line-clamp-1 flex gap-2 font-medium">
                        Strong user retention <IconTrendingUp className="size-4" />
                    </div>
                    <div className="text-muted-foreground">
                        Engagement exceeds targets
                    </div>
                </CardFooter>
            </Card>
            <Card className="@container/card">
                <CardHeader>
                    <CardDescription>Invoices Count</CardDescription>
                    <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                        {data.invoiceCount}
                    </CardTitle>
                    <CardAction>
                        <Badge variant="outline">
                            <IconTrendingUp />
                            +20
                        </Badge>
                    </CardAction>
                </CardHeader>
                <CardFooter className="flex-col items-start gap-1.5 text-sm">
                    <div className="line-clamp-1 flex gap-2 font-medium">
                        More invoices raised <IconTrendingUp className="size-4" />
                    </div>
                    <div className="text-muted-foreground">Meets growth projections</div>
                </CardFooter>
            </Card>
        </div>
    )
}