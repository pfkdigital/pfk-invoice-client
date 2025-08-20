"use client"

import * as React from "react"
import { CartesianGrid, Line, LineChart, XAxis } from "recharts"

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
import { format } from "path"
import { formatCurrency } from "@/lib/currency-formatter"

interface RevenueLineChartProps {
  chartData: { date: string; revenue: number }[];
}

export const description = "An interactive line chart"

const chartData = [
  { date: "2024-04-01", revenue: 1234 },
  { date: "2024-04-02", revenue: 97 },
  { date: "2024-04-03", revenue: 167 },
  { date: "2024-04-04", revenue: 242 },
  { date: "2024-04-05", revenue: 373 },
]

const chartConfig = {
  views: {
    label: "Page Views",
  },
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)",
  },
  mobile: {
    label: "Mobile",
    color: "var(--chart-2)",
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
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
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
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="Revenue"
                  labelFormatter={(value) => {
                    const [year, month] = value.split('-')
                    const date = new Date(parseInt(year), parseInt(month) - 1)
                    return date.toLocaleDateString("en-US", {
                      month: "long",
                      year: "numeric",
                    })
                  }}
                />
              }
            />
            <Line
              dataKey={"revenue"}
              type="monotone"
              stroke={`var(--chart-3)`}
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
