import { ColumnDef } from "@tanstack/react-table";
import { InvoiceDto } from "@/types/invoice.types";
import InvoiceStatusBadge from "../invoice-status-badge";
import { formatCurrency } from "@/lib/currency-formatter";
import DeleteInvoiceDialog from "../delete-invoice-dialog";
import EditInvoiceDialog from "../edit-invoice-dialog";

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
    ,
    {
        header: () => <div className="text-end px-0">Actions</div>,
        id: "actions",
        cell: ({ row }) => (
            <div className="flex justify-end gap-2 px-0">
                <EditInvoiceDialog />
                <DeleteInvoiceDialog invoiceId={row.original.id} />
            </div>
        ),
    }
]