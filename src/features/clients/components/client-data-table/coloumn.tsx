import { Button } from "@/components/ui/button";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import { ClientAddress, ClientRow } from "@/types/client.types";
import { ColumnDef } from "@tanstack/react-table";
import DeleteClientDialog from "../delete-client-dialog";
import EditClientDialog from "../edit-client-dialog";

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
            return `${address.street}, ${address.country}`;
        },
    },
    {
        header: () => <div className="text-end px-0">Actions</div>,
        id: "actions",
        cell: ({ row }) => (
            <div className="flex justify-end gap-2 px-0">
                <EditClientDialog client={row.original} />
                <DeleteClientDialog clientId={row.original.id} />
            </div>
        ),
    }

]