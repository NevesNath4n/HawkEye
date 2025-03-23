"use client";
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { AlertCircle } from "lucide-react"

const AVAILABLE_SCOPES = [
  { id: "read:users", label: "Read Users" },
  { id: "write:users", label: "Write Users" },
  { id: "read:projects", label: "Read Projects" },
  { id: "write:projects", label: "Write Projects" },
  { id: "read:billing", label: "Read Billing" },
  { id: "write:billing", label: "Write Billing" },
]

const EXPIRATION_OPTIONS = [
  { value: "30", label: "30 days" },
  { value: "90", label: "90 days" },
  { value: "365", label: "1 year" },
  { value: "never", label: "No expiration" },
]

export function CreateTokenDialog({
  open,
  onOpenChange,
  onCreateToken
}) {
  const [name, setName] = useState("")
  const [selectedScopes, setSelectedScopes] = useState([])
  const [expiration, setExpiration] = useState("30")
  const [nameError, setNameError] = useState("")

  const handleScopeChange = (scopeId, checked) => {
    if (checked) {
      setSelectedScopes([...selectedScopes, scopeId])
    } else {
      setSelectedScopes(selectedScopes.filter((id) => id !== scopeId))
    }
  }

  const handleSubmit = () => {
    // Validate form
    if (!name.trim()) {
      setNameError("Token name is required")
      return
    }

    if (selectedScopes.length === 0) {
      // You could add error state for scopes too
      return
    }

    onCreateToken({
      name: name.trim(),
      scopes: selectedScopes,
      expiration,
    })

    // Reset form
    setName("")
    setSelectedScopes([])
    setExpiration("30")
    setNameError("")
  }

  const handleOpenChange = (newOpen) => {
    if (!newOpen) {
      // Reset form when dialog closes
      setName("")
      setSelectedScopes([])
      setExpiration("30")
      setNameError("")
    }
    onOpenChange(newOpen)
  }

  return (
    (<Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create API Token</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="token-name">
              Token Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="token-name"
              placeholder="e.g., Production API"
              value={name}
              onChange={(e) => {
                setName(e.target.value)
                if (e.target.value.trim()) setNameError("")
              }} />
            {nameError && (
              <div className="text-sm text-red-500 flex items-center mt-1">
                <AlertCircle className="h-3 w-3 mr-1" />
                {nameError}
              </div>
            )}
          </div>

          <div className="space-y-3">
            <Label>
              Token Permissions <span className="text-red-500">*</span>
            </Label>
            <div className="grid grid-cols-2 gap-2">
              {AVAILABLE_SCOPES.map((scope) => (
                <div key={scope.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={scope.id}
                    checked={selectedScopes.includes(scope.id)}
                    onCheckedChange={(checked) => handleScopeChange(scope.id, checked)} />
                  <Label htmlFor={scope.id} className="text-sm font-normal cursor-pointer">
                    {scope.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <Label>Token Expiration</Label>
            <RadioGroup value={expiration} onValueChange={setExpiration}>
              {EXPIRATION_OPTIONS.map((option) => (
                <div key={option.value} className="flex items-center space-x-2">
                  <RadioGroupItem value={option.value} id={`expiration-${option.value}`} />
                  <Label
                    htmlFor={`expiration-${option.value}`}
                    className="text-sm font-normal cursor-pointer">
                    {option.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
            {expiration === "never" && (
              <div
                className="text-sm text-amber-600 dark:text-amber-500 flex items-center mt-1 bg-amber-50 dark:bg-amber-950/50 p-2 rounded-md">
                <AlertCircle className="h-4 w-4 mr-2 flex-shrink-0" />
                Non-expiring tokens pose a security risk. Only use when absolutely necessary.
              </div>
            )}
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Create Token</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>)
  );
}

