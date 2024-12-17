import type { Metadata } from "next";
import "@/styles/style.css";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Toaster } from "@/components/ui/toaster";
import ClientProvider from "@/components/client-provider";

export const metadata: Metadata = {
  title: "IOT Power Predictions",
  description: "For Daffa Kurnia Final Project",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ClientProvider>
          <SidebarProvider>
            <AppSidebar />
            <SidebarTrigger className="absolute top-1 left-1" />
            <main className="container w-full px-10 pt-10 pb-6">
              {children}
            </main>
            <Toaster />
          </SidebarProvider>
        </ClientProvider>
      </body>
    </html>
  );
}
