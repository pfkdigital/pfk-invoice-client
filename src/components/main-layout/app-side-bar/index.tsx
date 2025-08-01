import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { NavUser } from "@/components/nav-user";
import { sidebarItems } from "./side-bar-items";
import avatar from "@/assets/shadcn.jpg";
import { PlusIcon } from "lucide-react";
import { IconCirclePlusFilled } from "@tabler/icons-react"
import { Button } from "@/components/ui/button";
import { Link } from "react-router";

const defaultUser = {
    name: "Nuh Ali",
    email: "nuh@pfkdigital.co.uk",
    avatar
}

const AppSideBar = () => {
    return (
        <Sidebar collapsible="icon">
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent className="flex flex-col gap-2">
                        <SidebarMenu>
                            <SidebarMenuItem className="flex items-center gap-2">
                                <SidebarMenuButton
                                    tooltip="Quick Create"
                                    className="bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground min-w-8 duration-200 ease-linear"
                                >
                                    <IconCirclePlusFilled />
                                    <span>Quick Create</span>
                                </SidebarMenuButton>
                                <Button
                                    size="icon"
                                    className="size-8 group-data-[collapsible=icon]:opacity-0"
                                    variant="outline"
                                >
                                    <PlusIcon />
                                    <span className="sr-only">Inbox</span>
                                </Button>
                            </SidebarMenuItem>
                        </SidebarMenu>
                        <SidebarMenu>
                            {sidebarItems.map((item) => (
                                <Link to={item.href} key={item.label}>
                                    <SidebarMenuItem key={item.label}>
                                        <SidebarMenuButton tooltip={item.label}>
                                            {item.icon && <item.icon />}
                                            <span>{item.label}</span>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                </Link>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={defaultUser} />
            </SidebarFooter>
        </Sidebar>
    )
}

export default AppSideBar;