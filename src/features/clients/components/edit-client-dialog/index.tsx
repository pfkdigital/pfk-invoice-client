import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { IconEdit } from "@tabler/icons-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { CreateClientDto, UpdateClientSchema, UpdateClientDto } from "@/schemas/client.schema";
import { createClient, updateClient } from "@/lib/client-api-client";
import { ClientRow } from "@/types/client.types";

interface EditClientDialogProps {
    client: ClientRow;
}

const EditClientDialog: React.FC<EditClientDialogProps> = ({ client }) => {
    const [open, setOpen] = useState(false);
    const form = useForm<UpdateClientDto>({
        resolver: zodResolver(UpdateClientSchema),
        defaultValues: {
            clientName: client.clientName,
            clientEmail: client.clientEmail,
            clientPhone: client.clientPhone,
            clientAddress: {
                street: client.clientAddress[0].street,
                city: client.clientAddress[0].city,
                country: client.clientAddress[0].country,
                postalCode: client.clientAddress[0].postalCode,
            },
        },
    });

    const queryClient = useQueryClient();

    const onSubmit = async (values: UpdateClientDto) => {
        try {
            await updateClient(client.id, values);
            queryClient.invalidateQueries({ queryKey: ["clients"] });
            setOpen(false);
            form.reset();
        } catch (error) {
            console.error("Error creating client:", error);
        }
    };



    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button size="icon" variant="outline" aria-label="Edit">
                    <IconEdit className="size-4" />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Client</DialogTitle>
                    <DialogDescription>
                        Update the client information below.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 py-2">
                        <FormField
                            name="clientName"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Client Name</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            name="clientEmail"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder="client@example.com" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            name="clientPhone"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Phone</FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder="+1 (555) 555-5555" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            name="clientAddress.street"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Street</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            name="clientAddress.city"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>City</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            name="clientAddress.country"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Country</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            name="clientAddress.postalCode"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Postal Code</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
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

export default EditClientDialog;