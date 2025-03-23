"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { PlusIcon, KeyIcon, ClockIcon, CheckCircleIcon, AlertCircleIcon } from "lucide-react"
import { CreateTokenDialog } from "./create-token-dialog"
import { TokenActions } from "./token-actions"
import { formatDistanceToNow } from "./utils"

// This would come from your API in a real application
const mockTokens = [
  {
    id: "1",
    name: "Production API",
    prefix: "tk_prod_",
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
    lastUsed: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    scopes: ["read:users", "write:users", "read:projects"],
    expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 year from now
  },
  {
    id: "2",
    name: "Development API",
    prefix: "tk_dev_",
    createdAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000), // 60 days ago
    lastUsed: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000), // 15 days ago
    scopes: ["read:users", "read:projects"],
    expiresAt: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000), // 6 months from now
  },
]

export function TokenList({ isCreateDialogOpen, setIsCreateDialogOpen }) {
  const [tokens, setTokens] = useState(mockTokens)
  const [newToken, setNewToken] = useState(null)

  const handleCreateToken = (token) => {
    // In a real app, you would call your API to create the token
    const newTokenObj = {
      id: Math.random().toString(36).substring(7),
      name: token.name,
      prefix: `tk_${Math.random().toString(36).substring(7)}_`,
      createdAt: new Date(),
      lastUsed: null,
      scopes: token.scopes,
      expiresAt:
        token.expiration === "never"
          ? null
          : new Date(Date.now() + Number.parseInt(token.expiration) * 24 * 60 * 60 * 1000),
    }

    setTokens([newTokenObj, ...tokens])

    // In a real app, this would be the full token returned from your API
    setNewToken(
      `${newTokenObj.prefix}${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`
    )
    setIsCreateDialogOpen(false)
  }

  const handleRevokeToken = (id) => {
    // In a real app, you would call your API to revoke the token
    setTokens(tokens.filter((token) => token.id !== id))
  }

  return (<>
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle>Your API Tokens</CardTitle>
          
        </div>
      </CardHeader>
      <CardContent>
        {tokens.length === 0 ? (
          <div className="text-center py-6">
            <KeyIcon className="mx-auto h-12 w-12 text-muted-foreground opacity-50 mb-3" />
            <h3 className="text-lg font-medium mb-1">No API tokens</h3>
            <p className="text-muted-foreground mb-4">Create your first API token to get started</p>
            <Button onClick={() => setIsCreateDialogOpen(true)}>
              <PlusIcon className="mr-2 h-4 w-4" />
              Create Token
            </Button>
          </div>
        ) : (
          tokens.map((token) => (
            <div key={token.id} className="py-4 border-b last:border-0">
              <div className="flex items-center justify-between mb-2">
                <div className="font-medium">{token.name}</div>
                <TokenActions token={token} onRevoke={handleRevokeToken} />
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                <div className="flex items-center">
                  <ClockIcon className="mr-1 h-3 w-3" />
                  Created {formatDistanceToNow(token.createdAt)}
                </div>
                {token.lastUsed && (
                  <div className="flex items-center">
                    <CheckCircleIcon className="mr-1 h-3 w-3" />
                    Last used {formatDistanceToNow(token.lastUsed)}
                  </div>
                )}
                {token.expiresAt && (
                  <div className="flex items-center">
                    <AlertCircleIcon className="mr-1 h-3 w-3" />
                    Expires {formatDistanceToNow(token.expiresAt)}
                  </div>
                )}
              </div>
              <div className="flex flex-wrap gap-1 mt-2">
                {token.scopes.map((scope) => (
                  <Badge key={scope} variant="secondary" className="text-xs">
                    {scope}
                  </Badge>
                ))}
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
    <CreateTokenDialog
      open={isCreateDialogOpen}
      onOpenChange={setIsCreateDialogOpen}
      onCreateToken={handleCreateToken} />
    {newToken && (
      <Card
        className="mt-6 border-green-200 bg-green-50 dark:bg-green-950 dark:border-green-800">
        <CardContent className="pt-6">
          <div className="flex items-start mb-4">
            <CheckCircleIcon className="h-6 w-6 text-green-600 dark:text-green-400 mr-2 mt-0.5" />
            <div>
              <h3 className="font-medium text-green-800 dark:text-green-300 mb-1">Token created successfully</h3>
              <p className="text-sm text-green-700 dark:text-green-400 mb-3">
                Make sure to copy your API token now. You won't be able to see it again!
              </p>
            </div>
          </div>

          <div
            className="bg-white dark:bg-gray-950 border rounded-md p-3 font-mono text-sm mb-4 break-all">
            {newToken}
          </div>

          <div className="flex justify-end">
            <Button
              variant="outline"
              onClick={() => {
                navigator.clipboard.writeText(newToken)
                setNewToken(null)
              }}>
              Copy token and close
            </Button>
          </div>
        </CardContent>
      </Card>
    )}
  </>);
}

