import { createBrowserRouter } from "react-router";
import MainLayout from "../src/components/MainLayout";
import App from "../src/App";

export const router = createBrowserRouter([
    {
        path: "/dashboard",
        element: <MainLayout />,
        children: [
            { path: '/', element: <App /> },
            { path: '/invoices', element: <App /> },
            { path: '/invoices/:id', element: <App /> },
            { path: '/clients', element: <App /> },
            { path: '/clients/:id', element: <App /> }
        ]
    }
])