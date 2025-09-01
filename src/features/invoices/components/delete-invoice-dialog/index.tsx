import { useState } from "react";

import { DialogHeader, DialogFooter } from "@/components/ui/dialog";
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { deleteInvoice } from "@/lib/invoice-api-client";
import { IconTrash } from "@tabler/icons-react";

interface DeleteInvoiceDialogProps {
    invoiceId: string;
}

const DeleteInvoiceDialog = ({ invoiceId }: DeleteInvoiceDialogProps) => {

    const [open, setOpen] = useState(false);

    const handleDeleteInvoice = async () => {
        try {
            await deleteInvoice(invoiceId);
            setOpen(false);
        } catch (error) {
            console.error("Error deleting invoice:", error);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger>
                <Button size="icon" variant="destructive" aria-label="Delete">
                    <IconTrash className="size-4" />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Are you absolutely sure?</DialogTitle>
                    <DialogDescription>
                        This action cannot be undone. This will permanently delete the invoice and remove all associated data.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button variant="destructive" onClick={handleDeleteInvoice}>Delete</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default DeleteInvoiceDialog;
