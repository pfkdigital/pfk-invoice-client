import { getDashboardData } from "@/lib/graph-api-endpoint";
import { useQuery } from "@tanstack/react-query";
import RevenueLineChart from "../revenue-line-chart/revenue-line-chart";
import InvoiceStatusPieChart from "../invoice-status-pie-chart";
import TopClientBarChart from "../top-client-bar-chart";
import AgingAnalysisBarChart from "../aging-analysis-bar-chart";

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
        <div className="w-full h-full pt-4 pl-4 pr-4 flex flex-col items-center justify-start">
            <div className="w-full mt-4">
                <RevenueLineChart chartData={data.monthlyRevenue} />
            </div>
            <div className="w-full grid grid-cols-1 gap-y-4 md:grid-cols-2 md:grid-rows-1 md:gap-x-1.5 mt-4">
                <InvoiceStatusPieChart statusDistribution={data.statusDistribution} />
                <AgingAnalysisBarChart agingAnalysisChartData={data.agingAnalysis} />
            </div>
            <div className="w-full mt-4">
                <TopClientBarChart topClientsChartData={data.topClients} />
            </div>
        </div>
    );
}