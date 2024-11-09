import { ChartArea, ClockArrowDown, Database } from "lucide-react";

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
  SidebarMenuSub,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import Link from "next/link";

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="mx-4 mt-4">Power Predictions</SidebarHeader>
      <SidebarContent className="px-2">
        <SidebarGroup>
          <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {/* Real-time Data */}
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/">
                    <ClockArrowDown />
                    <span>Real-time Data</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {/* Graph Data */}
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/graph">
                    <ChartArea />
                    <span>Graph Data</span>
                  </Link>
                </SidebarMenuButton>
                <SidebarMenuSub>
                  <SidebarMenuSubItem>
                    <SidebarMenuButton asChild>
                      <Link href="/graph/sensor/1">
                        <span>Sensor 1</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuSubItem>
                  <SidebarMenuSubItem>
                    <SidebarMenuButton asChild>
                      <Link href="/graph/sensor/2">
                        <span>Sensor 2</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuSubItem>
                  <SidebarMenuSubItem>
                    <SidebarMenuButton asChild>
                      <Link href="/graph/sensor/3">
                        <span>Sensor 3</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuSubItem>
                </SidebarMenuSub>
              </SidebarMenuItem>

              {/* Graph Data */}
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/table">
                    <Database />
                    <span>Table Data</span>
                  </Link>
                </SidebarMenuButton>
                <SidebarMenuSub>
                  <SidebarMenuSubItem>
                    <SidebarMenuButton asChild>
                      <Link href="/table/sensor/1">
                        <span>Sensor 1</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuSubItem>
                  <SidebarMenuSubItem>
                    <SidebarMenuButton asChild>
                      <Link href="/table/sensor/2">
                        <span>Sensor 2</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuSubItem>
                  <SidebarMenuSubItem>
                    <SidebarMenuButton asChild>
                      <Link href="/table/sensor/3">
                        <span>Sensor 3</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuSubItem>
                </SidebarMenuSub>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
