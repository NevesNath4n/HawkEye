"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { PlusIcon, KeyIcon, ClockIcon, CheckCircleIcon, AlertCircleIcon } from "lucide-react"
import { CreateTokenDialog } from "./create-token-dialog"
import { TokenActions } from "./token-actions"
import { useEffect } from "react"
import { formatDistanceToNow } from "./utils"
import axios from "@/lib/axios"
import { toast } from "sonner"

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
  }
 
]

export function TokenList({ isCreateDialogOpen, setIsCreateDialogOpen }) {
  const [tokens, setTokens] = useState(mockTokens)
  const [newToken, setNewToken] = useState(null)

  const getApiTokens = async () => {
    let response = await axios.get("/settings/token/get")
    setTokens(response.data)
  }


  useEffect(()=>{
    getApiTokens()
  },[])




  const handleCreateToken = async (token) => {
    // Create the new token object
    const newTokenObj = {
      name: token.name,
      // scopes: token.scopes,       
    };
  
    if (token.expiration && token.expiration !== "never") {
      newTokenObj.expires_at = new Date(Date.now() + Number.parseInt(token.expiration) * 24 * 60 * 60 * 1000);
    }
  
    if (token.expires_at) {
      newTokenObj.expires_at = token.expires_at;
    }
  
    if (token.expiration && token.expiration === "never") {
      newTokenObj.expires_at = "never";
    }
  
    // Make API request to create the token
    let response = await axios.post("/settings/token/create", newTokenObj);
    
    if (response.status === 201) {
      // Ensure no duplicate tokens are added
      setTokens((prevTokens) => {
        // Filter out the token if it's already in the list
        const filteredTokens = prevTokens.filter((existingToken) => existingToken.name !== newTokenObj.name);
        return [newTokenObj, ...filteredTokens]; // Add the new token at the beginning
      });
  
      setNewToken(response.data.token);
      toast.success("Token created successfully");
    }
  
    setIsCreateDialogOpen(false);
  };
  




  const handleRevokeToken = async (id) => {
    // In a real app, you would call your API to revoke the token
    let response = await axios.delete(`/settings/token/${id}/delete`)
    if(response.status === 200){
      setTokens(tokens.filter((token) => token.id !== id))
      toast.success("Token revoked successfully")
    }
  }


  const handleRegenerateToken = async (id) => {
    console.log("teste")
    let token = tokens.filter((token) => token.id === id)
    await setTokens(tokens.filter((token) => token.id !== id))
    await handleRevokeToken(id)
    await handleCreateToken(token[0])
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
                <TokenActions onRegenerate={handleRegenerateToken} token={token} onRevoke={handleRevokeToken} />
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                <div className="flex items-center">
                  <ClockIcon className="mr-1 h-3 w-3" />
                  Created {formatDistanceToNow(token.inserted_at)}
                </div>
                {/*token.lastUsed && (
                  <div className="flex items-center">
                    <CheckCircleIcon className="mr-1 h-3 w-3" />
                    Last used {formatDistanceToNow(token.lastUsed)}
                  </div>
                )*/}
                {token.expires_at && (
                  <div className="flex items-center">
                    <AlertCircleIcon className="mr-1 h-3 w-3" />
                    Expires {formatDistanceToNow(token.expires_at)}
                  </div>
                )}
              </div>
              <div className="flex flex-wrap gap-1 mt-2">
                {/*token.scopes.map((scope) => (
                  <Badge key={scope} variant="secondary" className="text-xs">
                    {scope}
                  </Badge>
                ))*/}
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

