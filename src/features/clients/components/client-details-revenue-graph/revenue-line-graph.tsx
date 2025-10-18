import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";
import { formatCurrency } from "@/lib/currency-formatter";

interface RevenueDataPoint {
  invoice_count: number;
  month: string;
  revenue: number;
  year: number;
  month_year: string;
}

interface RevenueLineGraphProps {
  data: RevenueDataPoint[];
}

const chartConfig = {
  date: {
    label: "month_year",
  },
  revenue: {
    label: "Revenue",
    color: "var(--primary)",
  },
} satisfies ChartConfig;

export default function RevenueLineGraph({ data }: RevenueLineGraphProps) {
  return (
    <ChartContainer config={chartConfig} className="h-full w-full">
      <LineChart 
        accessibilityLayer 
        data={data}
      >
        <CartesianGrid vertical={true} />
        <XAxis hide />
        <ChartTooltip
          cursor={false}
          content={
            <ChartTooltipContent 
              hideIndicator={false}
              indicator="dot"
              labelFormatter={(value, payload) => {
                if (payload && payload[0]) {
                  return payload[0].payload.month_year;
                }
                return value;
              }}
              formatter={(value) => formatCurrency(Number(value), 'GBP')}
            />
          }
        />
        <Line
          dataKey="revenue"
          type="natural"
          stroke="var(--color-revenue)"
          strokeWidth={2}
          dot={{
            fill: "var(--color-revenue)",
          }}
          activeDot={{
            r: 6,
          }}
        />
      </LineChart>
    </ChartContainer>
  );
}
