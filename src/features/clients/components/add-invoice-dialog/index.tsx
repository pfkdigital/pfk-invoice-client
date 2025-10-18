import { useEffect, useMemo, useState } from "react";

import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CreateInvoiceDto,
  CreateInvoiceDtoSchema,
} from "@/schemas/invoice.schema";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

import { cn } from "@/lib/utils";
import { format } from "date-fns";

import { IconCirclePlusFilled, IconTrash, IconEdit } from "@tabler/icons-react";
import { CalendarIcon } from "lucide-react";

import { ClientDto } from "@/types/client.types";
import { toast } from "sonner";
import { createInvoice } from "@/lib/invoice-api-client";
import { useQueryClient } from "@tanstack/react-query";
import { formatCurrency } from "@/lib/currency-formatter";

interface AddInvoiceDialogProps {
  client: ClientDto;
}

interface InvoiceItem {
  name: string;
  description: string;
  quantity: number;
  unitPrice: number;
}

function AddInvoiceDialog({ client }: AddInvoiceDialogProps) {
  const [open, setOpen] = useState(false);
  const [datePickerOpen, setDatePickerOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [itemForm, setItemForm] = useState<InvoiceItem>({
    name: "",
    description: "",
    quantity: 1,
    unitPrice: 0,
  });

  const queryClient = useQueryClient();

  const form = useForm<CreateInvoiceDto>({
    resolver: zodResolver(CreateInvoiceDtoSchema),
    defaultValues: {
      clientId: client.id,
      description: "",
      status: "PENDING",
      totalAmount: 0,
      invoiceDate: new Date().toISOString(),
      invoiceItems: [],
    },
  });

  const { fields, append, remove, update } = useFieldArray({
    control: form.control,
    name: "invoiceItems",
  });

  const onSubmit = async (data: CreateInvoiceDto) => {
    if (data.invoiceItems.length === 0) {
      form.setError("invoiceItems", {
        type: "manual",
        message: "At least one invoice item is required",
      });
      return;
    }
    console.log(typeof data.dueDate)
    try {
      await createInvoice(data);
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["clients"] }),
        queryClient.invalidateQueries({ queryKey: ["client"] }),
      ]);
      setOpen(false);
      form.reset();
      toast(`Invoice for ${client.clientName} has been created.`);
    } catch (error) {
      console.error("Unable to create invoice, please try again");
      toast.error("Unable to create invoice, please try again");
    }
    console.log(data);
    setOpen(false);
  };

  const handleAddItem = () => {
    if (!itemForm.name.trim()) {
      return;
    }

    if (editingIndex !== null) {
      update(editingIndex, itemForm);
      setEditingIndex(null);
    } else {
      append(itemForm);
    }

    setItemForm({
      name: "",
      description: "",
      quantity: 1,
      unitPrice: 0,
    });
  };

  const handleEditItem = (index: number) => {
    const item = fields[index];
    setItemForm(item);
    setEditingIndex(index);
  };

  const handleCancelEdit = () => {
    setEditingIndex(null);
    setItemForm({
      name: "",
      description: "",
      quantity: 1,
      unitPrice: 0,
    });
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
    if (dueDate && typeof dueDate == 'object') {
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
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button>
          <IconCirclePlusFilled className="size-5" />
          Add Invoice
        </Button>
      </SheetTrigger>

      <SheetContent
        side="right"
        className="w-full sm:max-w-2xl lg:max-w-4xl overflow-y-auto p-4"
      >
        <SheetHeader className="px-0">
          <SheetTitle className="text-2xl">Create New Invoice</SheetTitle>
          <SheetDescription>
            Create an invoice for {client.clientName}
          </SheetDescription>
        </SheetHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 py-6"
          >
            {/* -------- Basic Details Section -------- */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                Invoice Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  name="description"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g. Website redesign project"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="dueDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Due Date</FormLabel>
                      <Popover
                        open={datePickerOpen}
                        onOpenChange={setDatePickerOpen}
                        modal={true}
                      >
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={new Date(field.value)}
                            onSelect={(date) => {
                              console.log(date);
                              field.onChange(date);
                              setDatePickerOpen(false);
                            }}
                            disabled={(date) => date < new Date()}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="border-t pt-6" />

            {/* -------- Add Item Form -------- */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                {editingIndex !== null ? "Edit Item" : "Add Item"}
              </h3>

              <div className="p-4 border rounded-lg bg-muted/10">
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Item Name *</label>
                      <Input
                        placeholder="e.g. Design service"
                        value={itemForm.name}
                        onChange={(e) =>
                          setItemForm({ ...itemForm, name: e.target.value })
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Description</label>
                      <Input
                        placeholder="Optional description"
                        value={itemForm.description}
                        onChange={(e) =>
                          setItemForm({
                            ...itemForm,
                            description: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Quantity</label>
                      <Input
                        type="number"
                        min="1"
                        value={itemForm.quantity}
                        onChange={(e) =>
                          setItemForm({
                            ...itemForm,
                            quantity: +e.target.value,
                          })
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        Unit Price (£)
                      </label>
                      <Input
                        type="number"
                        min="0"
                        step="0.01"
                        value={itemForm.unitPrice}
                        onChange={(e) =>
                          setItemForm({
                            ...itemForm,
                            unitPrice: +e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-2">
                    {editingIndex !== null && (
                      <Button
                        type="button"
                        variant="outline"
                        onClick={handleCancelEdit}
                      >
                        Cancel
                      </Button>
                    )}
                    <Button
                      type="button"
                      onClick={handleAddItem}
                      disabled={!itemForm.name.trim()}
                    >
                      <IconCirclePlusFilled className="size-4 mr-2" />
                      {editingIndex !== null ? "Update Item" : "Add Item"}
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* -------- Items List -------- */}
            {fields.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                  Invoice Items ({fields.length})
                </h3>

                <div className="space-y-2">
                  {fields.map((field, index) => (
                    <div
                      key={field.id}
                      className="flex items-center justify-between p-4 border rounded-lg bg-muted/20 hover:bg-muted/30 transition-colors"
                    >
                      <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div>
                          <p className="text-sm font-medium">{field.name}</p>
                          {field.description && (
                            <p className="text-xs text-muted-foreground">
                              {field.description}
                            </p>
                          )}
                        </div>
                        <div className="text-sm">
                          <span className="text-muted-foreground">Qty:</span>{" "}
                          {field.quantity}
                        </div>
                        <div className="text-sm">
                          <span className="text-muted-foreground">Price:</span>{" "}
                          £{field.unitPrice.toFixed(2)}
                        </div>
                        <div className="text-sm font-medium">
                          <span className="text-muted-foreground">Total:</span>{" "}
                          {formatCurrency(field.quantity * field.unitPrice)}
                        </div>
                      </div>

                      <div className="flex gap-2 ml-4">
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          onClick={() => handleEditItem(index)}
                        >
                          <IconEdit className="size-4" />
                        </Button>
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          onClick={() => remove(index)}
                        >
                          <IconTrash className="size-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex justify-end p-4 border-t">
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">
                      Total Amount
                    </p>
                    <p className="text-2xl font-bold">{formatCurrency(total)}</p>
                  </div>
                </div>
              </div>
            )}

            {fields.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <p>No items added yet. Add your first item above.</p>
              </div>
            )}

            {/* -------- Actions -------- */}
            <div className="flex justify-end gap-3 pt-4 border-t">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit">Create Invoice</Button>
            </div>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}

export default AddInvoiceDialog;
