import { createBrowserRouter } from "react-router";
import MainLayout from "../src/components/main-layout";
import React from "react";

const DashboardPage = React.lazy(() => import('../src/features/dashboard/page/dashboard'))
const InvoicesPage = React.lazy(() => import('../src/features/invoices/page/invoices'));
const InvoiceDetailPage = React.lazy(() => import('../src/features/invoices/page/invoice-detail'));
const ClientsPage = React.lazy(() => import('../src/features/clients/page/clients'));
const ClientDetailPage = React.lazy(() => import('../src/features/clients/page/client-detail'));

export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            { path: '/dashboard', element: <DashboardPage /> },
            { path: '/invoices', element: <InvoicesPage /> },
            { path: '/invoices/:id', element: <InvoiceDetailPage /> },
            { path: '/clients', element: <ClientsPage /> },
            { path: '/clients/:id', element: <ClientDetailPage /> }
        ]
    }
])