export type RevenueDataPoint = {
    date: string;
    revenue: number;
}

export type AgingAnalysisDataPoint = {
    age_range: string;
    total_amount: number;
    count: number;
}

export type TopClientsDataPoint = {
    client_id: string;
    client_name: string;
    total_revenue: number;
    invoice_count: number;
    average_invoice_value: number;
}