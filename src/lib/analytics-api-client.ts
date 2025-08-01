import {
  ANALYTICS_ENDPOINT,
  INVOICES_COUNT,
  CLIENTS_COUNT,
  INVOICES_TOTAL,
  INVOICES_TOTAL_UNPAID,
} from "@/constants/endpoints";

export const getAnalyticsData = async () => {
  const response = await fetch(`${ANALYTICS_ENDPOINT}`);

  if (!response.ok) {
    throw new Error("Failed to fetch analytics data");
  }
  return response.json();
};

export const getInvoicesCount = async () => {
  const response = await fetch(`${INVOICES_COUNT}`);

  if (!response.ok) {
    throw new Error("Failed to fetch invoices count");
  }
  return response.json();
};

export const getClientsCount = async () => {
  const response = await fetch(`${CLIENTS_COUNT}`);

  if (!response.ok) {
    throw new Error("Failed to fetch clients count");
  }
  return response.json();
};

export const getTotalInvoices = async () => {
  const response = await fetch(`${INVOICES_TOTAL}`);

  if (!response.ok) {
    throw new Error("Failed to fetch total invoices");
  }
  return response.json();
};

export const getTotalUnpaidInvoices = async () => {
  const response = await fetch(`${INVOICES_TOTAL_UNPAID}`);

  if (!response.ok) {
    throw new Error("Failed to fetch total unpaid invoices");
  }
  return response.json();
};
