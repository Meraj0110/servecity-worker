"use client";

import * as React from "react";
import { usePathname } from "next/navigation";

import { SearchForm } from "@/components/search-form";
import { VersionSwitcher } from "@/components/version-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";

// ------------------------------------------
// DYNAMIC NAV DATA
// ------------------------------------------

const navData = {
  versions: ["1.0.1", "1.1.0-alpha", "2.0.0-beta1"],

  navMain: [
    {
      title: "Services",
      items: [
        {
          title: "See Upcoming Services",
          url: "/dashboard/services/list",
        },
      ],
    },
    {
      title: "Your Servings",
      items: [
        {
          title: "See Your Orders",
          url: "/dashboard/orders/all-orders",
        },
      ],
    },
  ],
};

// ------------------------------------------

export function AppSidebar(props: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname(); // get current route

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <VersionSwitcher
          versions={navData.versions}
          defaultVersion={navData.versions[0]}
        />
        <SearchForm />
      </SidebarHeader>

      <SidebarContent>
        {navData.navMain.map((group) => (
          <SidebarGroup key={group.title}>
            <SidebarGroupLabel>{group.title}</SidebarGroupLabel>

            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => {
                  const isActive = pathname === item.url;

                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild isActive={isActive}>
                        <a href={item.url}>{item.title}</a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarRail />
    </Sidebar>
  );
}
