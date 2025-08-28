import { Button } from "@/components/ui/button";
import { Dialog, DialogDescription, DialogFooter, DialogTitle } from "@/components/ui/dialog";

interface DeleteClientDialogProps {
    clientId: string;
    onDelete: (id: string) => void;
}

const DeleteClientDialog: React.FC<DeleteClientDialogProps> = ({ clientId, onDelete }: DeleteClientDialogProps) => {
    return (
        <Dialog>
            <DialogTitle>Delete Client</DialogTitle>
            <DialogDescription>
                Are you sure you want to delete this client?
            </DialogDescription>
            <DialogFooter>
                <Button variant="destructive" onClick={() => onDelete(clientId)}>Delete</Button>
            </DialogFooter>
        </Dialog>
    )
}

export default DeleteClientDialog;
