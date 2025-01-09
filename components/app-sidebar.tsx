import {
  // CalendarClock,
  ChartArea,
  ClockArrowDown,
  LayoutDashboard,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
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
      <SidebarHeader className="mx-4 mt-4">IOT Power Predictions</SidebarHeader>
      <SidebarContent className="px-2">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {/* Real-time Data */}
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/">
                    <LayoutDashboard />
                    <span>Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {/* History Data */}
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/real-time">
                    <ClockArrowDown />
                    <span>Real-time Data</span>
                  </Link>
                </SidebarMenuButton>
                <SidebarMenuSub>
                  <SidebarMenuSubItem>
                    <SidebarMenuButton asChild>
                      <Link href="/real-time/1">
                        <span>AC</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuSubItem>
                  <SidebarMenuSubItem>
                    <SidebarMenuButton asChild>
                      <Link href="/real-time/2">
                        <span>Fan</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuSubItem>
                  <SidebarMenuSubItem>
                    <SidebarMenuButton asChild>
                      <Link href="/real-time/3">
                        <span>Charger & Monitor</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuSubItem>
                </SidebarMenuSub>
              </SidebarMenuItem>

              {/* Prediction Data */}
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/consumption">
                    <ChartArea />
                    <span>Consumption Data</span>
                  </Link>
                </SidebarMenuButton>
                <SidebarMenuSub>
                  <SidebarMenuSubItem>
                    <SidebarMenuButton asChild>
                      <Link href="/consumption/1">
                        <span>AC</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuSubItem>
                  <SidebarMenuSubItem>
                    <SidebarMenuButton asChild>
                      <Link href="/consumption/2">
                        <span>Fan</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuSubItem>
                  <SidebarMenuSubItem>
                    <SidebarMenuButton asChild>
                      <Link href="/consumption/3">
                        <span>Charger & Monitor</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuSubItem>
                </SidebarMenuSub>
              </SidebarMenuItem>

              {/* Manual Prediction */}
              {/* <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <span>
                    <CalendarClock />
                    <span>Manual Trigger</span>
                  </span>
                </SidebarMenuButton>
                <SidebarMenuSub>
                  <SidebarMenuSubItem>
                    <SidebarMenuButton asChild>
                      <Link href="/energy/prediction">
                        <span>Energy Prediction</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuSubItem>
                  <SidebarMenuSubItem>
                    <SidebarMenuButton asChild>
                      <Link href="/energy/calculation">
                        <span>Energy Calculation</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuSubItem>
                </SidebarMenuSub>
              </SidebarMenuItem> */}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
