import z from "zod";

export const CreateInvoiceDtoSchema = z.object({
  description: z.string().optional(),
  status: z.enum(["PENDING", "PAID", "OVERDUE"]),
  invoiceDate: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), "Invalid ISO date string"),
  dueDate: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), "Invalid ISO date string"),
  clientId: z.string(),
  totalAmount: z.number().min(0),
  invoiceItems: z.array(
    z
      .object({
        name: z.string(),
        description: z.string(),
        quantity: z.number().int().positive(),
        unitPrice: z.number().positive(),
      })
      .optional()
  ),
});

export const UpdateInvoiceDtoSchema = z.object({
  invoiceReference: z.string().optional(),
  status: z.enum(["PENDING", "PAID", "OVERDUE"]).optional(),
  dueDate: z.date(),
  invoiceItems: z
    .array(
      z.object({
        id: z.string().optional(),
        name: z.string(),
        description: z.string(),
        quantity: z.number().int().positive(),
        unitPrice: z.number().positive(),
      })
    )
    .optional(),
});

export type CreateInvoiceDto = z.infer<typeof CreateInvoiceDtoSchema>;
export type UpdateInvoiceDto = z.infer<typeof UpdateInvoiceDtoSchema>;
