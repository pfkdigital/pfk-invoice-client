import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getDashboardData } from "@/lib/graph-api-endpoint";
import { useQuery } from "@tanstack/react-query";
import RevenueLineChart from "./revenue-line-chart/revenue-line-chart";

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

    console.log(data);
    return (
        <div className="w-full h-full p-4 flex flex-col items-center justify-start">
            <h1>Chart Container</h1>
            <p>This is where the chart will be displayed.</p>
            <Card className="w-full">
                <CardHeader>
                    <CardTitle>Monthly Revenue</CardTitle>
                    <CardDescription>
                        This chart shows the monthly revenue trends based on the data fetched from the API.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <RevenueLineChart config={data.monthlyRevenue} />
                    <pre className="whitespace-pre-wrap">{JSON.stringify(data, null, 2)}</pre>
                </CardContent>
            </Card>
        </div>
    );
}