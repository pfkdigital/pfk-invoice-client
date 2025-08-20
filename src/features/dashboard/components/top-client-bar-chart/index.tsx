import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"

const chartConfig = {
    total_revenue: {
        label: "Total Revenue",
        color: "var(--chart-2)",
    },
    invoice_count: {
        label: "Invoice Count",
        color: "var(--chart-1)",
    },
} satisfies ChartConfig


interface TopClientBarChartProps {
    topClientsChartData: {
        client_id: string;
        client_name: string;
        total_revenue: number;
        invoice_count: number;
        average_invoice_value: number;
    }[];
}

const TopClientBarChart = ({ topClientsChartData }: TopClientBarChartProps) => {
    return (
        <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs">
            <Card className="w-full h-full">
                <CardHeader>
                    <CardTitle>Top 5 Clients</CardTitle>
                    <CardDescription>The top 5 clients by total revenue and invoice count</CardDescription>
                </CardHeader>
                <CardContent>
                    <ChartContainer config={chartConfig}>
                        <BarChart accessibilityLayer data={topClientsChartData}>
                            <CartesianGrid vertical={false} />
                            <XAxis
                                dataKey="client_name"
                                tickLine={false}
                                tickMargin={10}
                                axisLine={false}
                            />
                            <ChartTooltip
                                cursor={false}
                                content={<ChartTooltipContent indicator="dashed" />}
                            />
                            <Bar dataKey="total_revenue" fill="var(--chart-2)" radius={4} />
                            <Bar dataKey="invoice_count" fill="var(--chart-1)" radius={4} />
                        </BarChart>
                    </ChartContainer>
                </CardContent>
            </Card>
        </div>
    )
}

export default TopClientBarChart;