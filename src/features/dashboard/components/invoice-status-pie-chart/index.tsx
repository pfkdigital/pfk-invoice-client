import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "@/components/ui/chart";
import { PieChart, Pie, Cell } from "recharts";
import * as React from "react";
import { formatCurrency } from "@/lib/currency-formatter";

interface ApiStatusDistributionItem {
    status: string
    count: number
    total_amount: number
}

interface PieChartDataPoint {
    id: string
    value: number
    count: number
    amount: number
}

interface InvoiceStatusPieChartProps {
    statusDistribution: ApiStatusDistributionItem[]
    currency?: string
}

const chartConfig = {
    PAID: {
        label: "Paid",
        color: "var(--chart-3)",
    },
    OVERDUE: {
        label: "Overdue",
        color: "var(--chart-2)",
    },
    PENDING: {
        label: "Pending",
        color: "var(--chart-1)",
    },
} satisfies ChartConfig

const InvoiceStatusPieChart = ({ statusDistribution, currency = "GBP" }: InvoiceStatusPieChartProps) => {
    const [metric, setMetric] = React.useState<'count' | 'amount'>("count")

    const raw = Array.isArray(statusDistribution) ? statusDistribution : []

    const data: PieChartDataPoint[] = React.useMemo(() => {
        return raw.map(item => ({
            id: item.status,
            value: metric === 'count' ? item.count : item.total_amount,
            count: item.count,
            amount: item.total_amount
        }))
    }, [raw, metric])

    const totalValue = data.reduce((a, c) => a + c.value, 0)
    const hasData = data.length > 0 && totalValue > 0

    return (
        <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs">
            <Card className="w-full h-full">
                <CardHeader className="space-y-2">
                    <div className="flex items-start justify-between gap-4">
                        <div>
                            <CardTitle>Invoice Status Distribution</CardTitle>
                            <CardDescription>
                                Breakdown of invoices by {metric === 'count' ? 'count' : 'total amount'}.
                            </CardDescription>
                        </div>
                        <div className="flex gap-1 rounded-md border p-1 text-xs">
                            {(['count', 'amount'] as const).map(m => (
                                <button
                                    key={m}
                                    onClick={() => setMetric(m)}
                                    className={`px-2 py-1 rounded-sm transition-colors data-[active=true]:bg-muted data-[active=true]:text-foreground ${metric === m ? 'bg-muted text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                                    data-active={metric === m}
                                    type="button"
                                >
                                    {m === 'count' ? 'Count' : 'Amount'}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="text-xs bold">
                        Total {metric === 'count' ? 'Invoices' : 'Value'}: {metric === 'count' ? totalValue.toLocaleString() : formatCurrency(totalValue, currency)}
                    </div>
                </CardHeader>
                <CardContent>
                    <ChartContainer
                        config={chartConfig}
                        className="mx-auto aspect-square max-h-[350px]"
                    >
                        <PieChart>
                            <ChartTooltip
                                content={
                                    <ChartTooltipContent
                                        className="w-[200px]"
                                        nameKey="revenue"
                                        formatter={(value, payload, ...args) => {
                                            const numericValue = value as number;
                                            return (
                                                <div className="flex items-center gap-2">
                                                    <span
                                                        className={`inline-block w-3 h-3 rounded-2 bg-[${chartConfig[payload as keyof typeof chartConfig]?.color ?? 'var(--chart-1)'}]`}
                                                    ></span>
                                                    <span>
                                                        {metric === 'count' ? `${numericValue.toLocaleString()} Invoices` : formatCurrency(numericValue, currency)}
                                                    </span>
                                                </div>
                                            );
                                        }}
                                    />
                                }
                            />
                            <Pie
                                data={hasData ? data : []}
                                dataKey="value"
                                nameKey="id"
                                innerRadius={60}
                                strokeWidth={4}
                                isAnimationActive
                            >
                                {hasData && data.map(d => (
                                    <Cell key={d.id} fill={`var(--color-${d.id})`} />
                                ))}
                            </Pie>
                            {!hasData && (
                                <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" className="fill-muted-foreground text-xs">No data</text>
                            )}
                            <ChartLegend verticalAlign="bottom" content={<ChartLegendContent nameKey="id" />} />
                        </PieChart>
                    </ChartContainer>
                </CardContent>
            </Card>
        </div>
    )
}

export default InvoiceStatusPieChart;