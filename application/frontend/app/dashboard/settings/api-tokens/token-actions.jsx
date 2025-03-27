"use client";
import { useState } from "react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { MoreHorizontal, RefreshCw, Trash2 } from "lucide-react"

export function TokenActions({
  token,
  onRevoke,
  onRegenerate,
}) {
  const [isRevokeDialogOpen, setIsRevokeDialogOpen] = useState(false)
  const [isRegenerateDialogOpen, setIsRegenerateDialogOpen] = useState(false)
  return (<>
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm">
          <MoreHorizontal className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          className="text-amber-600 dark:text-amber-500 focus:text-amber-600 dark:focus:text-amber-500"
          onClick={() => {
            setIsRegenerateDialogOpen(true)
          }}>
          <RefreshCw className="mr-2 h-4 w-4" />
          Regenerate
        </DropdownMenuItem>
        <DropdownMenuItem
          className="text-red-600 dark:text-red-500 focus:text-red-600 dark:focus:text-red-500"
          onClick={() => setIsRevokeDialogOpen(true)}>
          <Trash2 className="mr-2 h-4 w-4" />
          Revoke
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
    <AlertDialog open={isRevokeDialogOpen} onOpenChange={setIsRevokeDialogOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Revoke API Token</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to revoke the "{token.name}" API token? This action cannot be undone and any
            applications using this token will no longer be able to access the API.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-600 hover:bg-red-700 focus:ring-red-600"
            onClick={() => onRevoke(token.id)}>
            Revoke Token
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
    <AlertDialog open={isRegenerateDialogOpen} onOpenChange={setIsRegenerateDialogOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Regenerate Toekn</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to regenerate the "{token.name}" API token? This action cannot be undone and any
            applications using this token will no longer be able to access the API.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-600 hover:bg-red-700 focus:ring-red-600"
            onClick={() => onRegenerate(token.id)}>
            Regenerate Token
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  </>);
}

