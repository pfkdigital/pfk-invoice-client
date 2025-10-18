import { getClientById } from "@/lib/client-api-client";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import ClientInformationCard from "../components/client-information-card";
import ClientAddressCard from "../components/client-address-card";
import ClientDetailTabs from "../components/client-detail-tabs";
import EditClientDialog from "../components/edit-client-dialog";
import AddInvoiceDialog from "../components/add-invoice-dialog";
import BreadCrumb from "@/components/bread-crumb";

const ClientDetailPage = () => {
  const { id } = useParams();

  const {
    data: client,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["client", id],
    queryFn: () => getClientById(id as string),
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg">Loading client details...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg text-destructive">
          Error loading client details
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      {client && (
        <BreadCrumb
          items={[
            { title: "Home", href: "/dashboard" },
            { title: "Clients", href: "/clients" },
            { title: client?.clientName, href: "#" },
          ]}
        />
      )}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">
            {client?.clientName}
          </h1>
          <p className="text-muted-foreground">
            Client Details & Invoice Management
          </p>
        </div>
        <div className="flex gap-2">
          {client && (
            <>
              <EditClientDialog client={client} />
              <AddInvoiceDialog client={client} />
            </>
          )}
        </div>
      </div>
      <ClientInformationCard client={client!} />
      <ClientAddressCard client={client!} />
      <ClientDetailTabs client={client!} />
    </div>
  );
};

export default ClientDetailPage;
