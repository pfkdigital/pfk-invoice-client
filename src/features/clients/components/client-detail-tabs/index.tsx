import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { columns } from "../client-data-table/client-invoice-column";
import { DataTable } from "@/features/invoices/components/invoice-data-table";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { TrendingUp } from "lucide-react";
import { ClientDto } from "@/types/client.types";
import { ClientDetailsRevenueGraph } from "../client-details-revenue-graph";
import ClientDetailDistributionGraph from "../client-detail-distribution-graph";

interface ClientDetailTabsProps {
  client?: ClientDto;
}

const ClientDetailTabs = ({ client }: ClientDetailTabsProps) => {
  return (
    <Tabs defaultValue="invoices" className="space-y-4">
      <TabsList>
        <TabsTrigger value="invoices">Invoices</TabsTrigger>
        <TabsTrigger value="analytics">Analytics</TabsTrigger>
      </TabsList>

      <TabsContent value="invoices" className="space-y-4">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Recent Invoices</CardTitle>
                <CardDescription>
                  Invoice history for this client
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <DataTable columns={columns} data={client?.invoices || []} />
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="analytics" className="space-y-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                Revenue Trend
              </CardTitle>
              <CardDescription>
                Monthly revenue from this client
              </CardDescription>
            </CardHeader>
            {client && <ClientDetailsRevenueGraph clientId={client.id} />}
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Payment Status Distribution</CardTitle>
              <CardDescription>Breakdown of invoice statuses</CardDescription>
            </CardHeader>
            {client && (<ClientDetailDistributionGraph clientId={client.id} />)}
          </Card>
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default ClientDetailTabs;
