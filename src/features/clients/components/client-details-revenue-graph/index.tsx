import { CardContent } from "@/components/ui/card";
import { getRevenueByClient } from "@/lib/graph-api-endpoint";
import { useQuery } from "@tanstack/react-query";
import RevenueLineGraph from "./revenue-line-graph";

interface ClientDetailsRevenueGraphProps {
  clientId: string;
}

export const ClientDetailsRevenueGraph = ({
  clientId,
}: ClientDetailsRevenueGraphProps) => {
  const {
    data: revenueData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["client-revenue", clientId],
    queryFn: () => getRevenueByClient(clientId),
  });

  if (isLoading) {
    return (
      <CardContent className="flex items-center justify-center h-64">
        <div className="text-lg">Loading revenue data...</div>
      </CardContent>
    );
  }

  if (error) {
    return (
      <CardContent className="flex items-center justify-center h-64">
        <div className="text-lg text-destructive">
          Error loading revenue data
        </div>
      </CardContent>
    );
  }

  return (
    <CardContent className="h-[350px]">
      <RevenueLineGraph data={revenueData || []} />
    </CardContent>
  );
};

export default ClientDetailsRevenueGraph;
