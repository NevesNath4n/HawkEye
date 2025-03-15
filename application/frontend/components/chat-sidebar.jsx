"use client"

import * as React from "react"
import { ChevronLeft, ChevronsUpDown, MessageSquare, Plus, User,MoreHorizontal,Trash } from "lucide-react"
import { useRouter,useParams } from "next/navigation"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarMenuAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import axios from "@/lib/axios";
import { ThreadContext } from "@/app/chat/[id]/[[...thread]]/layout"
import { useContext } from "react"
import { NavUser } from "@/components/nav-user"

// Sample data for repositories
// const repositories = [
//   { id: "1", name: "Personal Project" },
//   { id: "2", name: "Work Repository" },
//   { id: "3", name: "Research Papers" },
// ]

// Sample data for chat history


export function ChatSidebar({repositories,repositoryId,chatHistory,setChatHistory}) {
  const router = useRouter()
  const [selectedRepo, setSelectedRepo] = React.useState(null)
  const { threadId, setThreadId,newThread,setnewThread  } = useContext(ThreadContext);
  const data = {
    user: {
      name: "shadcn",
      email: "m@example.com",
      avatar: "/avatars/shadcn.jpg",
    }
  }
  const loadChatHistory = async () => {
    let response = await axios.get("/chat/get?repositoryId="+selectedRepo.id)
    setChatHistory(response.data)
  }


  const onDeleteChat = async (chatId) => {
    let response = await axios.delete("/chat/delete/"+chatId)
    if(response.status === 200){
      let newChatHistory = chatHistory.filter((chat)=>(chat.id !== chatId))
      setChatHistory(newChatHistory)
    }
    
  }


  // React.useEffect(()=>{
  //   if(repositories.length > 0){
  //     let repository = repositories.filter(repo => repo.id === Number(repositoryId))[0]
  //     console.log(repository)
  //     setSelectedRepo(repository);
  //   }
  // },[])

  React.useEffect(()=>{
    if(repositories.length > 0){
      let repository = repositories.filter(repo => repo.id === Number(repositoryId))[0];
      setSelectedRepo(repository);
    }
  },[repositories])

  React.useEffect(()=>{
    if(selectedRepo !== null){
      loadChatHistory()
      // Load chat history for selected repository
    }
  },[selectedRepo])


  const handleThreadClick = async (repositoryId,chat) => {
    window.history.replaceState(null,'',`/chat/${repositoryId}/${chat.id}`)
    setThreadId(chat.id)
  }




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
                    {(selectedRepo !== null && selectedRepo !== undefined) && (<span className="text-xs text-muted-foreground">{selectedRepo.name}</span>)}
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
            <Button variant="outline" onClick={()=>{setnewThread(true)}} className="w-full justify-start">
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
                    <span onClick={() => handleThreadClick(repositoryId, chat)} className="flex items-center gap-2">
                      <MessageSquare className="size-4" />
                      <span className="flex flex-col">
                        <span className="line-clamp-1">{chat.title}</span>
                        <span className="text-xs text-muted-foreground">{chat.date}</span>
                      </span>
                    </span>
                  </SidebarMenuButton>
            
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <SidebarMenuAction showOnHover>
                        <MoreHorizontal className="size-4" />
                        <span className="sr-only">More options</span>
                      </SidebarMenuAction>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent side="right" align="start">
                      <DropdownMenuItem onClick={() => onDeleteChat(chat.id)} className="text-destructive focus:text-destructive">
                        <Trash className="mr-2 size-4" />
                        <span>Delete</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
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
            <NavUser user={data.user} />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>)
  );
}

