import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { getInvoiceById } from "@/lib/invoice-api-client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { formatCurrency } from "@/lib/currency-formatter";
import { format } from "date-fns";
import BreadCrumb from "@/components/bread-crumb";
import InvoiceStatusBadge from "../components/invoice-status-badge";
import { IconEdit, IconDownload, IconPrinter } from "@tabler/icons-react";
import { Skeleton } from "@/components/ui/skeleton";
import { InvoiceStatus } from "@/types/invoice.types";

const InvoiceDetailPage = () => {
  const {id} = useParams<{ id: string }>();

  const {
    data: invoice,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["invoice", id],
    queryFn: () => getInvoiceById(id!),
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="px-6 py-8 space-y-6">
        <div className="mb-8">
          <Skeleton className="h-6 w-48" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <Skeleton className="h-8 w-64" />
              </CardHeader>
              <CardContent className="space-y-4">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </CardContent>
            </Card>
          </div>
          <div>
            <Card>
              <CardHeader>
                <Skeleton className="h-6 w-32" />
              </CardHeader>
              <CardContent className="space-y-4">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  if (error || !invoice) {
    return (
      <div className="px-6 py-8">
        <div className="text-center py-12">
          <h2 className="text-2xl font-semibold text-muted-foreground mb-2">
            Invoice Not Found
          </h2>
          <p className="text-muted-foreground">
            The invoice you're looking for doesn't exist or has been deleted.
          </p>
        </div>
      </div>
    );
  }

  const subtotal =
    invoice.invoiceItems?.reduce(
      (sum: number, item: any) => sum + item.quantity * item.unitPrice,
      0
    ) || 0;

  return (
    <div className="px-6 py-8">
      {/* Breadcrumb */}
      <div className="mb-8">
        <BreadCrumb
          items={[
            { title: "Home", href: "/dashboard" },
            { title: "Invoices", href: "/invoices" },
            {
              title: `Invoice ${invoice.invoiceReference}`,
              href: `/invoices/${invoice.id}`,
            },
          ]}
        />
      </div>

      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Invoice {invoice.invoiceReference}
          </h1>
          <div className="flex items-center gap-2">
            <InvoiceStatusBadge status={invoice.status} />
            <span className="text-sm text-muted-foreground">
              Created {format(new Date(invoice.invoiceDate), "MMM dd, yyyy")}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <IconPrinter className="size-4 mr-2" />
            Print
          </Button>
          <Button variant="outline" size="sm">
            <IconDownload className="size-4 mr-2" />
            Download
          </Button>
          <Button size="sm">
            <IconEdit className="size-4 mr-2" />
            Edit Invoice
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Invoice Details */}
          <Card>
            <CardHeader>
              <CardTitle>Invoice Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Invoice Reference
                  </label>
                  <p className="text-sm font-mono mt-1">
                    {invoice.invoiceReference}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Status
                  </label>
                  <div className="mt-1">
                    <InvoiceStatusBadge status={invoice.status} />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Invoice Date
                  </label>
                  <p className="text-sm mt-1">
                    {format(new Date(invoice.invoiceDate), "MMMM dd, yyyy")}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Due Date
                  </label>
                  <p className="text-sm mt-1">
                    {format(new Date(invoice.dueDate), "MMMM dd, yyyy")}
                  </p>
                </div>
              </div>

              {invoice.description && (
                <>
                  <Separator />
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">
                      Description
                    </label>
                    <p className="text-sm mt-1">{invoice.description}</p>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Invoice Items */}
          <Card>
            <CardHeader>
              <CardTitle>Invoice Items</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Table Header */}
                <div className="grid grid-cols-12 gap-4 text-sm font-medium text-muted-foreground border-b pb-2">
                  <div className="col-span-4">Item</div>
                  <div className="col-span-3">Description</div>
                  <div className="col-span-2 text-center">Quantity</div>
                  <div className="col-span-2 text-right">Unit Price</div>
                  <div className="col-span-1 text-right">Total</div>
                </div>

                {/* Table Rows */}
                {invoice.invoiceItems?.map((item: any, index: number) => (
                  <div
                    key={index}
                    className="grid grid-cols-12 gap-4 text-sm py-3 border-b last:border-b-0"
                  >
                    <div className="col-span-4 font-medium">{item.name}</div>
                    <div className="col-span-3 text-muted-foreground">
                      {item.description}
                    </div>
                    <div className="col-span-2 text-center">
                      {item.quantity}
                    </div>
                    <div className="col-span-2 text-right">
                      {formatCurrency(item.unitPrice, "GBP")}
                    </div>
                    <div className="col-span-1 text-right font-medium">
                      {formatCurrency(item.quantity * item.unitPrice, "GBP")}
                    </div>
                  </div>
                ))}

                {/* Totals */}
                <div className="space-y-2 pt-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>{formatCurrency(subtotal, "GBP")}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-semibold">
                    <span>Total Amount</span>
                    <span className="text-lg">
                      {formatCurrency(invoice.totalAmount || subtotal, "GBP")}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Client Information */}
          <Card>
            <CardHeader>
              <CardTitle>Client Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {invoice.clientName && (
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Client Name
                  </label>
                  <p className="text-sm mt-1">{invoice.clientName}</p>
                </div>
              )}
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Client ID
                </label>
                <p className="text-sm font-mono mt-1">{invoice.clientId}</p>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full" variant="outline" disabled={invoice.status === InvoiceStatus.PAID}>
                Mark as Paid
              </Button>
              <Button className="w-full" variant="outline" disabled={invoice.status === InvoiceStatus.PAID}>
                Send Reminder
              </Button>
              <Button className="w-full" variant="outline" disabled>
                Duplicate Invoice
              </Button>
              <Separator />
              <Button className="w-full" variant="destructive" disabled={invoice.status === InvoiceStatus.PAID}>
                Delete Invoice
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default InvoiceDetailPage;
