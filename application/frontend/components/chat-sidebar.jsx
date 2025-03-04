"use client"

import * as React from "react"
import { ChevronLeft, ChevronsUpDown, MessageSquare, Plus, User } from "lucide-react"
import { useRouter } from "next/navigation"

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

// Sample data for repositories
const repositories = [
  { id: "1", name: "Personal Project" },
  { id: "2", name: "Work Repository" },
  { id: "3", name: "Research Papers" },
]

// Sample data for chat history
const chatHistory = [
  { id: "1", title: "How to implement authentication", date: "2 days ago" },
  { id: "2", title: "Optimizing database queries", date: "1 week ago" },
  { id: "3", title: "Building responsive layouts", date: "2 weeks ago" },
]

export function ChatSidebar() {
  const router = useRouter()
  const [selectedRepo, setSelectedRepo] = React.useState(repositories[0])

  return (
    (<Sidebar>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
                  <div
                    className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                    <MessageSquare className="size-4" />
                  </div>
                  <div className="flex flex-col gap-0.5 leading-none">
                    <span className="font-semibold">Repository</span>
                    <span className="text-xs text-muted-foreground">{selectedRepo.name}</span>
                  </div>
                  <ChevronsUpDown className="ml-auto size-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-[--radix-dropdown-menu-trigger-width]" align="start">
                {repositories.map((repo) => (
                  <DropdownMenuItem key={repo.id} onSelect={() => setSelectedRepo(repo)}>
                    {repo.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
        <SidebarGroup className="py-2">
          <SidebarGroupContent>
            <Button variant="outline" className="w-full justify-start">
              <Plus className="mr-2 size-4" />
              New Chat
            </Button>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Recent Chats</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {chatHistory.map((chat) => (
                <SidebarMenuItem key={chat.id}>
                  <SidebarMenuButton asChild tooltip={chat.title}>
                    <a href={`/chat/${chat.id}`}>
                      <MessageSquare className="size-4" />
                      <span className="flex flex-col">
                        <span className="line-clamp-1">{chat.title}</span>
                        <span className="text-xs text-muted-foreground">{chat.date}</span>
                      </span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Back to Dashboard">
              <button onClick={() => router.push("/dashboard")}>
                <ChevronLeft className="size-4" />
                <span>Back to Dashboard</span>
              </button>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="User Profile">
              <button onClick={() => router.push("/profile")}>
                <Avatar className="size-6">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                  <AvatarFallback>
                    <User className="size-4" />
                  </AvatarFallback>
                </Avatar>
                <span>John Doe</span>
              </button>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>)
  );
}

