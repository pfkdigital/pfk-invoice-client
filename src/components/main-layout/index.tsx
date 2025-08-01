import { Outlet } from "react-router";
import { SidebarInset, SidebarProvider } from "../ui/sidebar";
import { SiteHeader } from "../site-header";
import AppSideBar from "./app-side-bar";
import ContentContainer from "../content-container";

const MainLayout = () => {
    return (
        <SidebarProvider>
            <>
                <AppSideBar />
                <SidebarInset>
                    <SiteHeader />
                    <ContentContainer>
                        <Outlet />
                    </ContentContainer>
                </SidebarInset>
            </>
        </SidebarProvider>
    )
}

export default MainLayout

