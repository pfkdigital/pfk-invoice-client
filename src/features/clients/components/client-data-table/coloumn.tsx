import { Button } from "@/components/ui/button";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import { ClientAddress, ClientRow } from "@/types/client.types";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<ClientRow>[] = [
    {
        accessorKey: "clientName",
        header: "Client Name",
    },
    {
        accessorKey: "clientEmail",
        header: "Client Email",
    },
    {
        accessorKey: "clientPhone",
        header: "Client Phone",
    },
    {
        accessorKey: "clientAddress",
        header: "Client Address",
        cell: ({ row }) => {
            const address = row.original.clientAddress[0] as ClientAddress
            console.log(address);
            return `${address.street}, ${address.country}`;
        },
    },
    {
        header: () => <div className="text-end px-0">Actions</div>,
        id: "actions",
        cell: ({ row }) => (
            <div className="flex justify-end gap-2 px-0">
                <Button size="icon" variant="outline" onClick={() => handleEdit(row.original)} aria-label="Edit">
                    <IconEdit className="size-4" />
                </Button>
                <Button size="icon" variant="destructive" onClick={() => handleDelete(row.original.id)} aria-label="Delete">
                    <IconTrash className="size-4" />
                </Button>
            </div>
        ),
    }

]