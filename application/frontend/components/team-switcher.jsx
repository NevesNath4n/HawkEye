"use client"

import { ChevronsUpDown, Plus } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from "@/components/ui/sidebar"
import { useState, useEffect } from "react"
import { TeamDialog } from "./team-dialog"




const TeamSwitcher = ({ teams, activeTeam, setActiveTeam }) => {
  const { isMobile } = useSidebar()
  const [newMemberRole, setNewMemberRole] = useState("member")
  const [dialogOpen, setDialogOpen] = useState(false)
  useEffect(() => {
    console.log(teams)
  }, [teams])

  return (
    <>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                {activeTeam !== null ? (
                  <>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-semibold">{activeTeam.name}</span>
                      <span className="truncate text-xs">{activeTeam.plan}</span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex size-6 items-center justify-center rounded-md border bg-background">
                      <Plus className="size-4" />
                    </div>
                    <div className="font-medium text-muted-foreground">Add team</div>
                  </>
                )}
                <ChevronsUpDown className="ml-auto" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg max-h-[300px] overflow-auto"
              align="start"
              side="bottom"
              sideOffset={4}
            >
              <DropdownMenuLabel className="text-xs text-muted-foreground sticky top-0 bg-background z-10">
                Teams
              </DropdownMenuLabel>
              <div className="overflow-y-auto">
                {teams.map((team, index) => (
                  <DropdownMenuItem key={team.name} onClick={() => setActiveTeam(team)} className="gap-2 p-2">
                    {team.name}
                  </DropdownMenuItem>
                ))}
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onSelect={() => setDialogOpen(true)}
                className="gap-2 p-2 sticky bottom-0 bg-background z-10"
              >
                <div className="flex size-6 items-center justify-center rounded-md border bg-background">
                  <Plus className="size-4" />
                </div>
                <div className="font-medium text-muted-foreground">Add team</div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
      <TeamDialog
        open={dialogOpen}
        title="Create Team"
        buttonLabel={"Create Team"}
        description="Add a new team"
        onOpenChange={setDialogOpen}
      />
    </>
  )
}

export default TeamSwitcher

