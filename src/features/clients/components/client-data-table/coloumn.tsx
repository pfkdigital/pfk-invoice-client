import { ClientAddress, ClientDto, ClientRow } from "@/types/client.types";
import { ColumnDef } from "@tanstack/react-table";
import DeleteClientDialog from "../delete-client-dialog";
import EditClientDialog from "../edit-client-dialog";
import { Button } from "@/components/ui/button";
import { IconEye } from "@tabler/icons-react";
import { Link } from "react-router";

export const columns: ColumnDef<ClientDto>[] = [
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
            const address = row.original.clientAddress as ClientAddress
            return `${address.street}, ${address.country}`;
        },
    },
    {
        id: "actions",
        header: () => <div className="text-end px-0">Actions</div>,
        cell: ({ row }) => {
            const client = row.original;
            return (
                <div className="flex justify-end gap-2 px-0">
                    <Link to={`/clients/${client.id}`}>
                        <Button variant="outline" size="sm">
                            <IconEye className="size-4 mr-2" />
                            View
                        </Button>
                    </Link>
                    <EditClientDialog client={client} />
                    <DeleteClientDialog clientId={client.id} />
                </div>
            );
        },
    }

]