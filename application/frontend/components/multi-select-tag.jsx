"use client"

import { useState, useRef, useEffect } from "react"
import { X } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

export default function MultiSelectTags({ items, selectedItems, onChange }) {
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState([])
  const [inputValue, setInputValue] = useState("")
  const inputRef = useRef(null)

  const handleUnselect = (option) => {
    const newSelected = selected.filter((item) => item.value !== option.value)
    setSelected(newSelected)
    onChange(newSelected)
  }

  useEffect(() => {
    setSelected(selectedItems)
  }, [selectedItems])

  const handleKeyDown = (e) => {
    const input = inputRef.current
    if (input) {
      if (e.key === "Delete" || e.key === "Backspace") {
        if (input.value === "") {
          setSelected((prev) => {
            const newSelected = [...prev]
            newSelected.pop()
            onChange(newSelected)
            return newSelected
          })
        }
      }
      // This prevents the page from scrolling when pressing the space key
      if (e.key === " " && input.value === "") {
        e.preventDefault()
      }
    }
  }

  const selectables = items.filter((item) => !selected.includes(item))

  const addCustomOption = () => {
    if (inputValue && !items.find((item) => item.value === inputValue.toLowerCase())) {
      const newOption = { value: inputValue.toLowerCase(), label: inputValue }
      const newSelected = [...selected, newOption]
      setSelected(newSelected)
      onChange(newSelected)
      setInputValue("")
    }
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" aria-expanded={open} className="w-full justify-between">
          Select items...
          <X className="h-4 w-4 opacity-50" onClick={() => setSelected([])} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command onKeyDown={handleKeyDown}>
          <CommandInput
            ref={inputRef}
            placeholder="Search items..."
            value={inputValue}
            onValueChange={setInputValue}
          />
          <CommandList>
            <CommandEmpty>No items found.</CommandEmpty>
            <CommandGroup className="max-h-64 overflow-auto">
              {selectables.map((option) => (
                <CommandItem
                  key={option.value}
                  onSelect={() => {
                    const newSelected = [...selected, option]
                    setSelected(newSelected)
                    onChange(newSelected)
                    setInputValue("")
                  }}
                >
                  {option.label}
                </CommandItem>
              ))}
              {inputValue && !items.find((item) => item.value === inputValue.toLowerCase()) && (
                <CommandItem onSelect={addCustomOption}>Add "{inputValue}"</CommandItem>
              )}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
      <div className="flex flex-wrap gap-1 mt-2">
        {selected.map((option) => (
          <Badge key={option.value} variant="secondary" className="mr-1 mb-1">
            {option.label}
            <button
              className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleUnselect(option)
                }
              }}
              onMouseDown={(e) => {
                e.preventDefault()
                e.stopPropagation()
              }}
              onClick={() => handleUnselect(option)}
            >
              <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
            </button>
          </Badge>
        ))}
      </div>
    </Popover>
  )
}