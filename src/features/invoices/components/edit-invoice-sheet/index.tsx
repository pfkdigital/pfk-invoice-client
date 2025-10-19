import { useEffect, useMemo, useState } from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  UpdateInvoiceDto,
  UpdateInvoiceDtoSchema,
} from "@/schemas/invoice.schema";
import { toast } from "sonner";
import { updateInvoice } from "@/lib/invoice-api-client";
import { useQueryClient } from "@tanstack/react-query";
import InvoiceBaseForm from "@/components/invoice-base-form/invoice-base-form";
import { FormType } from "@/enums/form-type.enum";
import { InvoiceDto } from "@/types/invoice.types";

interface InvoiceItem {
  name: string;
  description: string;
  quantity: number;
  unitPrice: number;
}

interface EditInvoiceSheetProps {
  invoice: InvoiceDto;
  formType: FormType;
}

function EditInvoiceSheet({ invoice, formType }: EditInvoiceSheetProps) {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [open, setOpen] = useState(false);
  const [itemForm, setItemForm] = useState<InvoiceItem>({
    name: "",
    description: "",
    quantity: 1,
    unitPrice: 0,
  });

  const queryClient = useQueryClient();

  const form = useForm<UpdateInvoiceDto>({
    resolver: zodResolver(UpdateInvoiceDtoSchema),
    defaultValues: {
      clientId: invoice.clientId,
      description: invoice.description,
      status: invoice.status,
      totalAmount: invoice.totalAmount,
      dueDate: invoice.dueDate,
      invoiceItems: invoice.invoiceItems || [],
    },
  });

  const onSubmit = async (data: UpdateInvoiceDto) => {
    if ((data.invoiceItems?.length ?? 0) === 0) {
      form.setError("invoiceItems", {
        type: "manual",
        message: "At least one invoice item is required",
      });
      return;
    }

    try {
      await updateInvoice(invoice.id, data);
      queryClient.invalidateQueries({ queryKey: ["invoices", invoice.id] });
      setOpen(false);
      form.reset();
      toast(`Invoice has been updated.`);
    } catch (error) {
      console.error("Unable to update invoice, please try again");
      toast.error("Unable to update invoice, please try again");
    }
    setOpen(false);
  };

  const invoiceItems = form.watch("invoiceItems");
  const dueDate = form.watch("dueDate");

  const total = useMemo(() => {
    if (!invoiceItems) return 0;
    return invoiceItems.reduce((acc, item) => {
      if (!item) return acc;
      const quantity = Number(item.quantity) || 0;
      const unitPrice = Number(item.unitPrice) || 0;
      return acc + quantity * unitPrice;
    }, 0);
  }, [invoiceItems]);

  useEffect(() => {
    form.setValue("totalAmount", total, {
      shouldValidate: false,
      shouldDirty: false,
    });
  }, [total, form]);

  useEffect(() => {
    if (dueDate && typeof dueDate == "object") {
      form.setValue("dueDate", (dueDate as Date).toISOString());
    }
  }, [dueDate]);

  useEffect(() => {
    if (!open) {
      form.reset();
      setItemForm({
        name: "",
        description: "",
        quantity: 1,
        unitPrice: 0,
      });
      setEditingIndex(null);
    }
  }, [open, form]);

  return (
    <InvoiceBaseForm
      client={null}
      invoice={null}
      open={open}
      setOpen={setOpen}
      formType={formType}
      form={form as any}
      itemForm={itemForm}
      setItemForm={setItemForm}
      editingIndex={editingIndex}
      setEditingIndex={setEditingIndex}
      onSubmit={onSubmit}
      total={total}
    />
  );
}

export default EditInvoiceSheet;
