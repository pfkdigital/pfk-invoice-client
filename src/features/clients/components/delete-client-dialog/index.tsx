import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { deleteClient } from "@/lib/client-api-client";
import { IconTrash } from "@tabler/icons-react";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";

interface DeleteClientDialogProps {
    clientId: string;
}

const DeleteClientDialog: React.FC<DeleteClientDialogProps> = ({ clientId }: DeleteClientDialogProps) => {
    const [open, setOpen] = useState(false)
    const client = useQueryClient();

    const handleDeleteClient = async () => {
        try {
            await deleteClient(clientId);
            client.invalidateQueries({ queryKey: ['clients'] });
            setOpen(false);
            toast(`Client has been deleted.`);
        } catch (error) {
            console.error("Error deleting client:", error);
            toast.error("There was an error deleting the client. Please try again.");
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button size="icon" variant="destructive" aria-label="Delete">
                    <IconTrash className="size-4" />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Are you absolutely sure?</DialogTitle>
                    <DialogDescription>
                        This action cannot be undone. This will permanently delete the client and remove all associated data.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button variant="destructive" onClick={handleDeleteClient}>Delete</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default DeleteClientDialog;
