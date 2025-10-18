import { INVOICES_ENDPOINT } from "@/constants/endpoints";
import { CreateInvoiceDto } from "@/schemas/invoice.schema";
import type {
  InvoiceDto,
  UpdateInvoiceDto,
} from "@/types/invoice.types";

export const getInvoices = async (
  page: number,
  limit: number,
  search: string,
  sort: string
): Promise<InvoiceDto[] | []> => {
  const response = await fetch(
    `${INVOICES_ENDPOINT}?page=${page}&limit=${limit}&search=${search}&sort=${sort}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch invoices");
  }
  return response.json();
};

export const getInvoiceById = async (id: string) => {
  const response = await fetch(`${INVOICES_ENDPOINT}/${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch invoice");
  }
  return response.json();
};

export const createInvoice = async (
  invoiceData: CreateInvoiceDto
): Promise<InvoiceDto> => {
  const response = await fetch(INVOICES_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(invoiceData),
  });

  if (!response.ok) {
    throw new Error("Failed to create invoice");
  }
  return response.json();
};

export const updateInvoice = async (
  id: string,
  invoiceData: UpdateInvoiceDto
): Promise<InvoiceDto | null> => {
  const response = await fetch(`${INVOICES_ENDPOINT}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(invoiceData),
  });

  if (!response.ok) {
    throw new Error("Failed to update invoice");
  }
  return response.json();
};

export const deleteInvoice = async (id: string): Promise<void> => {
  const response = await fetch(`${INVOICES_ENDPOINT}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete invoice");
  }
  return response.json();
};
