import { CLIENTS_ENDPOINT } from "@/constants/endpoints";
import { UpdateClientDto } from "@/schemas/client.schema";
import type { ClientDto, ClientNamesDto, CreateClientDto } from "@/types/client.types";

export const createClient = async (
  clientData: CreateClientDto
): Promise<ClientDto> => {
  const response = await fetch(CLIENTS_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(clientData),
  });

  if (!response.ok) {
    throw new Error("Failed to create client");
  }
  return response.json();
};

export const getClients = async (
  page: number,
  limit: number,
  search: string,
  sort: string
): Promise<ClientDto[] | []> => {
  const response = await fetch(
    `${CLIENTS_ENDPOINT}?page=${page}&limit=${limit}&search=${search}&sort=${sort}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch clients");
  }
  return response.json();
};

export const getAllClientsNamed = async (): Promise<
  Array<ClientNamesDto>
> => {
  const response = await fetch(`${CLIENTS_ENDPOINT}/names`);

  if (!response.ok) {
    throw new Error("Failed to fetch clients");
  }
  return response.json();
};

export const getClientById = async (id: string): Promise<ClientDto> => {
  const response = await fetch(`${CLIENTS_ENDPOINT}/${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch client");
  }
  return response.json();
};

export const updateClient = async (
  id: string,
  clientData: UpdateClientDto
): Promise<UpdateClientDto | null> => {
  const response = await fetch(`${CLIENTS_ENDPOINT}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(clientData),
  });

  if (!response.ok) {
    throw new Error("Failed to update client");
  }
  return response.json();
};

export const deleteClient = async (id: string): Promise<void> => {
  const response = await fetch(`${CLIENTS_ENDPOINT}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete client");
  }
};
