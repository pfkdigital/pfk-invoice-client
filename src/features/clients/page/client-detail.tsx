import { getClientById } from "@/lib/client-api-client";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";

const ClientDetailPage = () => {
  const { id } = useParams();

  const { data, isLoading, error } = useQuery({
    queryKey: ['client', id],
    queryFn: () => getClientById(id as string)
  })

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error loading client details</div>
  }

  return (
    <div>
      <h1>Client Detail</h1>
      <p>Client detail page</p>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default ClientDetailPage;
