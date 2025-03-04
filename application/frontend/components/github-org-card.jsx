"use client"

import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MoreVertical, Trash, RefreshCw, MessageSquare, Edit } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import DeleteDialog from "@/components/delete-dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export default function GithubOrgCard({ name, description, avatarUrl, url }) {
  const handleDelete = (e) => {
    e.preventDefault()
    console.log("Delete confirmed")
    // Add your delete logic here
  }

  const handleSync = (e) => {
    e.preventDefault()
    console.log("Sync clicked")
  }

  const handleTalk = (e) => {
    e.preventDefault()
    console.log("Talk clicked")
  }

  const handleEdit = (e) => {
    e.preventDefault()
    console.log("Edit clicked")
  }

  return (
    <Card className="w-full max-w-full hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage src={avatarUrl} alt={`${name}'s avatar`} />
              <AvatarFallback>{name.slice(0, 1)}</AvatarFallback>
            </Avatar>
            <CardTitle className="text-lg font-semibold">{name}</CardTitle>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DeleteDialog>
                <AlertDialogTrigger asChild>
                  <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                    <Trash className="mr-2 h-4 w-4" />
                    <span>Delete</span>
                  </DropdownMenuItem>
                </AlertDialogTrigger>
              </DeleteDialog>  
              <DropdownMenuItem onClick={handleTalk}>
                <a href="/chat">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  <span>Talk</span>
                </a>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleEdit}>
                <Edit className="mr-2 h-4 w-4" />
                <span>Edit</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <p className="text-sm text-muted-foreground mt-2">{description}</p>
      </CardHeader>
    </Card>
  )
}