import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { IconEdit } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { InvoiceDto } from "@/types/invoice.types";

interface EditInvoiceSheetProps {
  invoice: InvoiceDto;
}

const EditInvoiceSheet = ({ invoice }: EditInvoiceSheetProps) => {
  
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
};

export default EditInvoiceSheet;
