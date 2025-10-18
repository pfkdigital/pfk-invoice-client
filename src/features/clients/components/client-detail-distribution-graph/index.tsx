import { CardContent } from "@/components/ui/card";
import { getStatusDistributionByClient } from "@/lib/graph-api-endpoint";
import { useQuery } from "@tanstack/react-query";
import StatusDistributionGraph from "./status-distribution-pie-chart";


interface ClientDetailDistributionGraphProps {
  clientId: string;
}

export default function ClientDetailDistributionGraph({
  clientId,
}: ClientDetailDistributionGraphProps) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["client-status-distribution", clientId],
    queryFn: () => getStatusDistributionByClient(clientId),
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
      <StatusDistributionGraph graphData={data || []} />
    </CardContent>
  );
}
