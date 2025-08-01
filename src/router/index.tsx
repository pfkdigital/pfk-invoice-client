import { createBrowserRouter } from "react-router";
import MainLayout from "@/components/main-layout";
import React from "react";

const DashboardPage = React.lazy(() => import('@/features/dashboard/page/dashboard'))
const InvoicesPage = React.lazy(() => import('@/features/invoices/page/invoices'));
const InvoiceDetailPage = React.lazy(() => import('@/features/invoices/page/invoice-detail'));
const ClientsPage = React.lazy(() => import('@/features/clients/page/clients'));
const ClientDetailPage = React.lazy(() => import('@/features/clients/page/client-detail'));

export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            { index: true, element: <DashboardPage /> },
            { path: 'dashboard', element: <DashboardPage /> },
            { path: 'invoices', element: <InvoicesPage /> },
            { path: 'invoices/:id', element: <InvoiceDetailPage /> },
            { path: 'clients', element: <ClientsPage /> },
            { path: 'clients/:id', element: <ClientDetailPage /> }
        ]
    }
])
