"use client"

import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Star, GitFork, Eye, MoreVertical, Trash, RefreshCw, MessageSquare,Edit,PanelTop } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import DeleteDialog from "./delete-dialog"
import { AlertDialogTrigger } from "./ui/alert-dialog"
import  EditRepositoryDialog  from "./edit-repository-dialog"
import { DialogTrigger } from "./ui/dialog"
import axios from "@/lib/axios"
import { toast } from "sonner"


export default function GitHubRepoCard({
  repository: { name,slug, description, language,id,ignore, url } 
}) {
  const handleDelete = async (e) => {
    console.log("Delete clicked")
    let response = await axios.delete("/repository/delete/"+id)
    if(response.status == 204){
      toast.success("Repository deleted successfully");
    }

  }

  const handleSync = (e) => {
    e.preventDefault()
    // Implement sync functionality
    console.log("Sync clicked")
  }

  const handleEdit = (e) => {
    e.preventDefault()
    // Implement sync functionality
    console.log("Sync clicked")
  }

  const handleTalk = (e) => {
    e.preventDefault()
    // Implement talk functionality
    console.log("Talk clicked")
  }

  return (
    <Card className="w-full max-w-md hover:shadow-lg transition-shadow duration-300">
        <CardHeader>
          <div className="flex items-center space-x-4">
            
            <div className="flex-grow">
              <CardTitle className="text-sm font-semibold">{name}</CardTitle>
              <p className="text-xs text-muted-foreground">{slug}</p>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DeleteDialog onSubmit={handleDelete}>
                  <AlertDialogTrigger asChild>
                    <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                      <Trash className="mr-2 h-4 w-4" />
                      <span>Delete</span>
                    </DropdownMenuItem>
                  </AlertDialogTrigger>
                </DeleteDialog>  
                <a href={url}>
                  <DropdownMenuItem >
                    <PanelTop className="mr-2 h-4 w-4"></PanelTop>
                    <span>Go To</span>
                  </DropdownMenuItem>
                </a>
                <a href={"/chat/"+id}>
                  <DropdownMenuItem >
                      <MessageSquare className="mr-2 h-4 w-4" />
                      <span>Talk</span>
                  </DropdownMenuItem>
                </a>
                <EditRepositoryDialog repositoryId={id}>
                    <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                      <Edit className="mr-2 h-4 w-4" />
                      <span>Edit</span>
                    </DropdownMenuItem>
                </EditRepositoryDialog>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>
        
        <CardFooter>
            <div className="space-y-2">
              <span className="text-sm text-muted-foreground">Ignore:</span>
              <div className="flex flex-wrap gap-2">
                {ignore.split(",").map((item, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {item}
                  </Badge>
                ))}
              </div>
            </div>
        </CardFooter>
    </Card>
  )
}

