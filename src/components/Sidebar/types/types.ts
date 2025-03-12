import { ReactNode } from "react";

export interface SidebarItemProps {
  icon: ReactNode;
  text: string;
  alert?: boolean;
  to?: string;
  active?: boolean;
}

export interface SideBarContextProps {
  expanded: boolean;
}
