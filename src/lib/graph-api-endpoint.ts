import {
  AGING_ANALYSIS,
  CASH_FLOW,
  DASHBOARD_DATA,
  MONTHLY_REVENUE,
  PAYMENT_TRENDS,
  REVENUE_BY_CLIENT,
  STATUS_DISTRIBUTION,
  TOP_CLIENTS,
} from "@/constants/endpoints";

export const getMonthlyRevenue = async () => {
  const response = await fetch(MONTHLY_REVENUE);

  if (!response.ok) {
    throw new Error("Failed to fetch monthly revenue");
  }
  return response.json();
};

export const getStatusDistribution = async () => {
  const response = await fetch(STATUS_DISTRIBUTION);

  if (!response.ok) {
    throw new Error("Failed to fetch status distribution");
  }
  return response.json();
};
export const getTopClients = async () => {
  const response = await fetch(TOP_CLIENTS);

  if (!response.ok) {
    throw new Error("Failed to fetch top clients");
  }
  return response.json();
};
export const getAgingAnalysis = async () => {
  const response = await fetch(AGING_ANALYSIS);

  if (!response.ok) {
    throw new Error("Failed to fetch aging analysis");
  }
  return response.json();
};
export const getCashFlow = async () => {
  const response = await fetch(CASH_FLOW);

  if (!response.ok) {
    throw new Error("Failed to fetch cash flow");
  }
  return response.json();
};
export const getPaymentTrends = async () => {
  const response = await fetch(PAYMENT_TRENDS);

  if (!response.ok) {
    throw new Error("Failed to fetch payment trends");
  }
  return response.json();
};
export const getRevenueByClient = async (clientId: string) => {
  const response = await fetch(REVENUE_BY_CLIENT(clientId));

  if (!response.ok) {
    throw new Error("Failed to fetch revenue by client");
  }
  return response.json();
};
export const getDashboardData = async () => {
  const response = await fetch(DASHBOARD_DATA);

  if (!response.ok) {
    throw new Error("Failed to fetch dashboard data");
  }
  return response.json();
};
