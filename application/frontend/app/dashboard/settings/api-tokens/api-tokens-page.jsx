"use client";
import { Suspense } from "react"
import { TokenList } from "./token-list"
import { TokenListSkeleton } from "./token-list-skeleton"
import { Button } from "@/components/ui/button"
import { PlusIcon } from "lucide-react"
import { useState } from "react"
export const metadata = {
  title: "API Tokens | Settings",
  description: "Manage your API tokens",
}

export default function ApiTokensPage() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  
  return (
    (<div className="">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight mb-2">API Tokens</h1>
          <p className="text-muted-foreground">Create and manage API tokens to access our API programmatically.</p>
        </div>
        <Button onClick={() => setIsCreateDialogOpen(true)}>
          <PlusIcon className="mr-2 h-4 w-4" />
          Create Token
        </Button>
      </div>
      <Suspense fallback={<TokenListSkeleton />}>
        <TokenList isCreateDialogOpen={isCreateDialogOpen} setIsCreateDialogOpen={setIsCreateDialogOpen} />
      </Suspense>
    </div>)
  );
}

