"use client";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { ChatSidebar } from "@/components/chat-sidebar"

export default function ChatLayout({
  children
}) {
  return (
    (<SidebarProvider>
      <ChatSidebar />
      <SidebarInset className="flex flex-col">{children}</SidebarInset>
    </SidebarProvider>)
  );
}

