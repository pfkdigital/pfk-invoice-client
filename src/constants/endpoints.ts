export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api/v1";

// Invoices Endpoints
export const INVOICES_ENDPOINT = `${API_BASE_URL}/invoices`;
export const INVOICE_DETAIL_ENDPOINT = (id: string) =>
  `${INVOICES_ENDPOINT}/${id}`;

// Clients Endpoints
export const CLIENTS_ENDPOINT = `${API_BASE_URL}/clients`;
export const CLIENT_DETAIL_ENDPOINT = (id: string) =>
  `${CLIENTS_ENDPOINT}/${id}`;

// Analytics Endpoints
export const ANALYTICS_ENDPOINT = `${API_BASE_URL}/analytics`;
export const INVOICES_COUNT = `${ANALYTICS_ENDPOINT}/analytics/invoices/count`;
export const CLIENTS_COUNT = `${ANALYTICS_ENDPOINT}/analytics/clients/count`;
export const INVOICES_TOTAL_UNPAID = `${ANALYTICS_ENDPOINT}/analytics/invoices/total-unpaid`;
export const INVOICES_TOTAL = `${ANALYTICS_ENDPOINT}/analytics/invoices/total`;

// Graph Endpoints
export const GRAPH_ENDPOINT = `${API_BASE_URL}/graph`;
export const MONTHLY_REVENUE = `${GRAPH_ENDPOINT}/monthly-revenue`;
export const STATUS_DISTRIBUTION = `${GRAPH_ENDPOINT}/status-distribution`;
export const TOP_CLIENTS = `${GRAPH_ENDPOINT}/top-clients`;
export const AGING_ANALYSIS = `${GRAPH_ENDPOINT}/aging-analysis`;
export const CASH_FLOW = `${GRAPH_ENDPOINT}/cash-flow`;
export const PAYMENT_TRENDS = `${GRAPH_ENDPOINT}/payment-trends`;
export const REVENUE_BY_CLIENT = (clientId: string) =>
  `${GRAPH_ENDPOINT}client/${clientId}/revenue`;
export const STATUS_DISTRIBUTION_BY_CLIENT = (clientId: string) =>
  `${GRAPH_ENDPOINT}/clients/${clientId}/status-distribution`;
export const DASHBOARD_DATA = `${GRAPH_ENDPOINT}/dashboard`;
