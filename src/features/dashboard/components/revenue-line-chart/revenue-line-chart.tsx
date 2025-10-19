import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts"

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
import { useCallback } from "react"
import { formatCurrency } from "@/lib/currency-formatter"
import { RevenueDataPoint } from "@/types/graph.types"

interface RevenueLineChartProps {
  chartData: RevenueDataPoint[];
}

const chartConfig = {
  date: {
    label: "Invoice Date",
  },
  revenue: {
    label: "Revenue",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig

export default function RevenueLine({ chartData }: RevenueLineChartProps) {
  const total = useCallback(() => chartData.reduce((acc, curr) => acc + curr.revenue, 0), [chartData])

  return (
    <Card className="py-4 sm:py-0">
      <CardHeader className="flex flex-col items-stretch border-b !p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 pb-3 sm:pb-0">
          <CardTitle className="text-lg sm:text-2xl">Revenue Chart</CardTitle>
          <CardDescription> Showing total revenue for the last 12 months </CardDescription>
        </div>
        <div className="flex">
          <button
            className="data-[active=true]:bg-muted/50 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l sm:border-t-0 sm:border-l sm:px-8 sm:py-6"
          >
            <span className="text-muted-foreground text-xs">
              Total Revenue
            </span>
            <span className="text-lg leading-none font-bold sm:text-3xl">
              {formatCurrency(total())}
            </span>
          </button>
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={true} />
            <XAxis
              dataKey="month_year"
              tickLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const [year, month] = value.split('-')
                const date = new Date(parseInt(year), parseInt(month) - 1)
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  year: "numeric",
                })
              }}
            />
            <YAxis
              dataKey={"revenue"}
              tickLine={false}
              tickFormatter={(value) => formatCurrency(value, "GBP")}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[200px]"
                  nameKey="revenue"
                  labelFormatter={(value) => {
                    const [year, month] = value.split('-')
                    const date = new Date(parseInt(year), parseInt(month) - 1)
                    return date.toLocaleDateString("en-US", {
                      month: "long",
                      year: "numeric",
                    })
                  }}
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
            <Line
              dataKey={"revenue"}
              type="monotone"
              stroke={`var(--chart-3)`}
              strokeWidth={2}
              dot={true}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
