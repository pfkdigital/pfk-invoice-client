import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { formatCurrency } from "@/lib/currency-formatter";
import { CartesianGrid, Cell, Pie, PieChart } from "recharts";

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
} satisfies ChartConfig;

interface DistributionDataPoint {
  status: "PENDING" | "PAID" | "OVERDUE";
  count: number;
  total_amount: number;
}

interface StatusDistributionGraphProps {
  graphData: Array<DistributionDataPoint>;
}

export default function StatusDistributionGraph({
  graphData,
}: StatusDistributionGraphProps) {
  return (
    <ChartContainer config={chartConfig}>
      <PieChart>
        <CartesianGrid vertical={true} horizontal={true} />
        <ChartTooltip
          content={
            <ChartTooltipContent
              className="w-[200px]"
              nameKey="total_amount"
              formatter={(value, payload) => {
                const numericValue = value as number;
                return (
                  <div className="flex items-center gap-2">
                    <span
                      className={`inline-block w-3 h-3 rounded-2 bg-[${
                        chartConfig[payload as keyof typeof chartConfig]?.color
                      }]`}
                    ></span>
                    <span>{formatCurrency(numericValue, "GBP")}</span>
                  </div>
                );
              }}
            />
          }
        />
        <Pie
          data={graphData}
          dataKey="total_amount"
          nameKey="status"
          innerRadius={60}
          outerRadius={100}
          strokeWidth={2}
        >
          {graphData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={`var(--color-${entry.status})`} />
          ))}
        </Pie>
        <ChartLegend
          content={<ChartLegendContent nameKey="status" />}
        />
      </PieChart>
    </ChartContainer>
  );
}
