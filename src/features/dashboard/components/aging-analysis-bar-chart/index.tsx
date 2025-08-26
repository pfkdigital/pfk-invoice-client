import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { ChartTooltip, ChartTooltipContent, ChartContainer } from "@/components/ui/chart"
import { formatCurrency } from "@/lib/currency-formatter"
import { AgingAnalysisDataPoint } from "@/types/graph.types"
import { CartesianGrid, XAxis, YAxis, Bar, BarChart } from "recharts"

const chartConfig = {
    total_amount: {
        label: "Total Amount",
        color: "var(--chart-2)",
    },
    count: {
        label: "Invoice Count",
        color: "var(--chart-1)",
    },
}

interface AgingAnalysisBarChartProps {
    agingAnalysisChartData: AgingAnalysisDataPoint[]
}

const AgingAnalysisBarChart = ({ agingAnalysisChartData }: AgingAnalysisBarChartProps) => {
    return (
        <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs">
            <Card className="w-full h-full">
                <CardHeader>
                    <CardTitle>Aging Analysis</CardTitle>
                    <CardDescription>This chart shows the distribution of invoices based on their age ranges, helping to identify overdue payments and manage cash flow effectively.</CardDescription>
                </CardHeader>
                <CardContent>
                    <ChartContainer config={chartConfig}>
                        <BarChart accessibilityLayer data={agingAnalysisChartData}>
                            <CartesianGrid vertical={true} />
                            <XAxis
                                dataKey="age_range"
                                tickLine={false}
                                tickMargin={5}
                                axisLine={true}
                            />
                            <YAxis
                                dataKey={"total_amount"}
                                tickLine={false}
                                tickMargin={5}
                                axisLine={true}
                                tickFormatter={(value) => ` ${formatCurrency(value)}`}
                            />
                            <ChartTooltip
                                content={
                                    <ChartTooltipContent
                                        className="w-[200px]"
                                        formatter={(value) => {
                                            const numericValue = value as number;
                                            return (
                                                <div className="flex items-center gap-2">
                                                    <span
                                                        className="inline-block w-3 h-3 rounded-2 bg-[var(--chart-3)]"
                                                    ></span>
                                                    <span>
                                                        {formatCurrency(numericValue, "GBP")}
                                                    </span>
                                                </div>
                                            );
                                        }}
                                    />
                                }
                            />
                            <Bar dataKey="total_amount" fill="var(--chart-3)" radius={4} barSize={75} />
                        </BarChart>
                    </ChartContainer>
                </CardContent>
            </Card>
        </div>
    )
}


export default AgingAnalysisBarChart