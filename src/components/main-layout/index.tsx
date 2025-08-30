import { Outlet } from "react-router";
import { SidebarInset, SidebarProvider } from "../ui/sidebar";
import { SiteHeader } from "../site-header";
import AppSideBar from "./app-side-bar";
import ContentContainer from "../content-container";
import { ClientPageProvider } from "@/context/client-page-context";

const MainLayout = () => {
    return (
        <SidebarProvider>
            <ClientPageProvider>
                <>
                    <AppSideBar />
                    <SidebarInset>
                        <SiteHeader />
                        <ContentContainer>
                            <Outlet />
                        </ContentContainer>
                    </SidebarInset>
                </>
            </ClientPageProvider>
        </SidebarProvider>
    )
}

export default MainLayout

