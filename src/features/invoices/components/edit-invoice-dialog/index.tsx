import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { IconEdit } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";

const EditInvoiceDialog = () => {
    return (
        <Dialog>
            <DialogTrigger>
                <Button size="icon" variant="outline" aria-label="Edit">
                    <IconEdit className="size-4" />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Invoice</DialogTitle>
                </DialogHeader>
                <DialogFooter>
                    <Button variant="default">Save Changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export default EditInvoiceDialog;