import { Button } from "@/components/ui/button";
import { DialogHeader, DialogFooter } from "@/components/ui/dialog";
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription } from "@radix-ui/react-dialog";

interface ClientActionDialogProps {
    type?: 'add' | 'edit'
    trigger: string
    triggerIcon?: React.ReactNode
    content?: React.ReactNode;

}

const ClientActionDialog = ({ type, trigger, triggerIcon, content }: ClientActionDialogProps) => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>
                    {triggerIcon}
                    <span>{trigger}</span>
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{type === 'add' ? 'Add Client' : 'Edit Client'}</DialogTitle>
                    <DialogDescription>
                        {content}
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button type="submit">{type === 'add' ? 'Create' : 'Save'}</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export default ClientActionDialog;
