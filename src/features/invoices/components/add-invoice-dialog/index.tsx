import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { IconCirclePlusFilled } from "@tabler/icons-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { createInvoice } from "@/lib/invoice-api-client";
import { toast } from "sonner";
import { CreateInvoiceDto, CreateInvoiceDtoSchema } from "@/schemas/invoice.schema";
import { ClientDto } from "@/types/client.types";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { InvoiceStatus } from "@/types/invoice.types";
import { cn } from "@/lib/utils";
import { Popover, PopoverTrigger, PopoverContent } from "@radix-ui/react-popover";
import { CalendarIcon, Calendar } from "lucide-react";
import { format } from "date-fns";

const AddInvoiceDialog: React.FC = () => {
    const [open, setOpen] = useState(false);
    const [date, setDate] = useState("");
    const queryClient = useQueryClient();

    const clients = queryClient.getQueryData<ClientDto[]>(['clients']) || [];

    const form = useForm<CreateInvoiceDto>({
        resolver: zodResolver(CreateInvoiceDtoSchema),
        defaultValues: {
            invoiceReference: "",
            status: InvoiceStatus.PENDING,
            clientId: "",
            invoiceDate: Date.now().toString(),
            dueDate: "",
            totalAmount: 0,
            items: [],
        },
    });

    const onSubmit = async (values: CreateInvoiceDto) => {
        try {
            await createInvoice(values);
            queryClient.invalidateQueries({ queryKey: ["invoices"] });
            setOpen(false);
            form.reset();
            toast(`Invoice ${values.invoiceReference} has been created.`);
        } catch (error) {
            console.error("Error creating invoice:", error);
            toast.error("There was an error creating the invoice. Please try again.");
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>
                    <IconCirclePlusFilled className="size-5" />
                    <span>Add Invoice</span>
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add Invoice</DialogTitle>
                    <DialogDescription>
                        Create a new invoice by filling out the information below.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 py-2">
                        <FormField
                            name="invoiceReference"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Invoice Reference</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            name="clientId"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Client</FormLabel>
                                    <FormControl>
                                        <Select value={field.value} onValueChange={field.onChange}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a client" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    {clients.map((client) => (
                                                        <SelectItem key={client.id} value={client.id}>
                                                            {client.clientName}
                                                        </SelectItem>
                                                    ))}
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            name="dueDate"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel>Due Date</FormLabel>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button
                                                    variant={"outline"}
                                                    className={cn(
                                                        "w-[240px] pl-3 text-left font-normal",
                                                        !field.value && "text-muted-foreground"
                                                    )}
                                                >
                                                    {field.value ? (
                                                        format(new Date(field.value), "PPP")
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
                                                selected={field.value ? new Date(field.value) : undefined}
                                                onSelect={(date) => field.onChange(date ? date.toISOString() : "")}
                                                disabled={(date) =>
                                                    date > new Date() || date < new Date("1900-01-01")
                                                }
                                                captionLayout="dropdown"
                                            />
                                        </PopoverContent>
                                    </Popover>
                                    <FormDescription>
                                        The due date for the invoice.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <DialogFooter>
                            <Button type="submit">Create</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};

export default AddInvoiceDialog;
