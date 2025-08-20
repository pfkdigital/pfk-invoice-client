import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getDashboardData } from "@/lib/graph-api-endpoint";
import { useQuery } from "@tanstack/react-query";
import RevenueLineChart from "../revenue-line-chart/revenue-line-chart";
import InvoiceStatusPieChart from "../invoice-status-pie-chart";
import TopClientBarChart from "../top-client-bar-chart";

export const ChartContainer = () => {
    const { data, isLoading, error } = useQuery({
        queryKey: ['dashboardGraphData'],
        queryFn: getDashboardData,
        staleTime: 1000 * 60 * 5,
    })

    if (error) {
        return <div className="flex items-center justify-center h-screen text-destructive">Error loading dashboard data</div>;
    }

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="text-lg text-muted-foreground">Loading dashboard data...</div>
            </div>
        );
    }
    return (
        <div className="w-full h-full p-4 flex flex-col items-center justify-start *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs">
            <Card className="w-full">
                <CardHeader>
                    <CardTitle>Monthly Revenue</CardTitle>
                    <CardDescription>
                        This chart shows the monthly revenue trends based on the data fetched from the API.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <RevenueLineChart chartData={data.monthlyRevenue} />
                </CardContent>
            </Card>
            <div className="w-full grid grid-cols-1 md:grid-cols-2 md:grid-rows-1 md:gap-x-1.5 mt-4">
                <InvoiceStatusPieChart statusDistribution={data.statusDistribution}/>
                <TopClientBarChart topClientsChartData={data.topClients.slice(0, 5)} />
            </div>
        </div>
    );
}