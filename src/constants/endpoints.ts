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
export const MONTHLY_REVENUE = `${ANALYTICS_ENDPOINT}/graph/monthly-revenue`;
export const STATUS_DISTRIBUTION = `${ANALYTICS_ENDPOINT}/graph/status-distribution`;
export const TOP_CLIENTS = `${ANALYTICS_ENDPOINT}/graph/top-clients`;
export const AGING_ANALYSIS = `${ANALYTICS_ENDPOINT}/graph/aging-analysis`;
export const CASH_FLOW = `${ANALYTICS_ENDPOINT}/graph/cash-flow`;
export const PAYMENT_TRENDS = `${ANALYTICS_ENDPOINT}/graph/payment-trends`;
export const REVENUE_BY_CLIENT = (clientId: string) =>
  `${ANALYTICS_ENDPOINT}/graph/client/${clientId}/revenue`;
export const DASHBOARD_DATA = `${API_BASE_URL}/graph/dashboard`;
