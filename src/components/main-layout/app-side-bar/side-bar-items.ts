import { BarChart3, FileText, Users } from "lucide-react";
import { LucideIcon } from "lucide-react";

export type SidebarItemType = {
  icon: LucideIcon;
  label: string;
  href: string;
};

export type SidebarItems = SidebarItemType[];

export const sidebarItems = [
  { icon: BarChart3, label: "Dashboard", href: "/dashboard" },
  { icon: FileText, label: "Invoices", href: "/invoices" },
  { icon: Users, label: "Clients", href: "/clients" },
];
