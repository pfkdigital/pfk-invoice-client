import { ColumnDef } from "@tanstack/react-table";
import { InvoiceDto } from "@/types/invoice.types";
import InvoiceStatusBadge from "@/features/invoices/components/invoice-status-badge";
import { formatCurrency } from "@/lib/currency-formatter";
import { Button } from "@/components/ui/button";
import { IconEye } from "@tabler/icons-react";
import { Link } from "react-router";

export const columns: ColumnDef<InvoiceDto>[] = [
  {
    accessorKey: "invoiceReference",
    header: "Invoice Reference",
  },
  {
    accessorKey: "invoiceDate",
    header: "Invoice Date",
  },
  {
    accessorKey: "dueDate",
    header: "Due Date",
  },
  {
    accessorKey: "totalAmount",
    header: "Total Amount",
    cell: ({ row }) => {
      const total = row.original.totalAmount as number;
      return (
        <span className="font-bold text-white">{`${formatCurrency(
          total,
          "GBP"
        )}`}</span>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Invoice Status",
    cell: ({ row }) => {
      return <InvoiceStatusBadge status={row.original.status} />;
    },
  },
  {
    id: "actions",
    header: () => <div className="text-end px-0">Actions</div>,
    cell: ({ row }) => {
      const invoice = row.original;
      return (
        <div className="flex justify-end gap-2 px-0">
          <Link to={`/invoices/${invoice.id}`}>
            <Button variant="outline" size="sm">
              <IconEye className="size-4 mr-2" />
              View
            </Button>
          </Link>
        </div>
      );
    },
  },
];
