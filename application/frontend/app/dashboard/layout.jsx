"use client";
import { AppSidebar } from "@/components/app-sidebar"
import TeamSwitcher from "@/components/team-switcher";
import { useEffect, useState,useContext,createContext } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  AudioWaveform,
  Command,
  GalleryVerticalEnd,
  Settings2,
  
} from "lucide-react"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button";
import { TeamDialog } from "@/components/team-dialog";
import axios from "@/lib/axios";



export const TeamContext = createContext(null);

export default function Layout({children}) {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [currentTeam, setCurrentTeam] = useState(null)
  const [teams, setTeams] = useState([])
  const getTeams = async () => {
    try {
      const response = await axios.get(process.env.NEXT_PUBLIC_BASE_API_URL+"/team/get")
      setTeams(response.data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(()=>{
    getTeams()
  },[])

  useEffect(()=>{

  },[currentTeam])

  

  return (
    (
    <TeamContext.Provider value={{currentTeam, setCurrentTeam}}>
      <SidebarProvider open={false}>
        <AppSidebar  />
        <SidebarInset>
        <header className="flex h-16 shrink-0 px-4 justify-between items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2">
            <TeamSwitcher teams={teams} activeTeam={currentTeam} setActiveTeam={setCurrentTeam} />
          </div>
          <Button variant="outline" onClick={()=>{setDialogOpen(true)}}  className="text-white">
            <Settings2 className="text-white"/>
          </Button>
          <TeamDialog currentTeam={currentTeam} open={dialogOpen} onOpenChange={setDialogOpen} buttonLabel={"Edit Team"} title={"Edit Team"} description={"Edit a new team"} />

        </header>
          <div className="flex flex-1 my-4 flex-col gap-4 p-4 pt-0">
              {children}
          
          </div>
        </SidebarInset>
      </SidebarProvider>
    </TeamContext.Provider>)
  );
}
