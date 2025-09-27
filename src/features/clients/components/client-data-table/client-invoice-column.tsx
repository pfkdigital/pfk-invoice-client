import { ColumnDef } from "@tanstack/react-table";
import { InvoiceDto } from "@/types/invoice.types";
import InvoiceStatusBadge from "@/features/invoices/components/invoice-status-badge";
import { formatCurrency } from "@/lib/currency-formatter";

export const columns: ColumnDef<InvoiceDto>[] = [
    {
        accessorKey: "invoiceReference",
        header: "Invoice Reference",
    },
    {
        accessorKey: "client.clientName",
        header: "Client Name",
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
            return <span className="font-bold text-white">{`${formatCurrency(total, 'GBP')}`}</span>;
        },
    },
    {
        accessorKey: "status",
        header: "Invoice Status",
        cell: ({ row }) => {
            return (
                <InvoiceStatusBadge status={row.original.status} />
            )
        },
    }
]