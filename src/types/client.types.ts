import type { InvoiceDto } from "./invoice.types";

export interface ClientAddress {
  id: string;
  street: string;
  city: string;
  country: string;
  postalCode: string;
  clientId: string;
}

export type PartialClientAddress = Partial<ClientAddress>;
export interface CreateClientDto {
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  clientAddress: PartialClientAddress;
}

export interface UpdateClientDto {
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  clientAddress: PartialClientAddress;
}

export interface ClientDto {
  id: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  clientAddress: PartialClientAddress;
  invoices?: InvoiceDto[];
}
export interface ClientRow {
  id: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  clientAddress: ClientAddress
}
