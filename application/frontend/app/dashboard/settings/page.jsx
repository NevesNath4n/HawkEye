"use client";
import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Bot, ChevronLeft, Plus } from "lucide-react"
import { PromptList } from "@/components/prompt-list"
import { PromptFormModal } from "@/components/prompt-form-modal"
import { PromptTestModal } from "@/components/prompt-test-modal"

// Sample data for demonstration
const initialPrompts = [
  {
    id: "1",
    title: "Code Style Review",
    description: "Checks for code style and formatting issues",
    content:
      "Review this code for style issues. Check for consistent indentation, naming conventions, and formatting according to best practices for the language. Identify any style violations and suggest improvements.",
    isActive: true,
    createdAt: new Date("2023-01-15").toISOString(),
    updatedAt: new Date("2023-03-20").toISOString(),
  },
  {
    id: "2",
    title: "Security Vulnerabilities",
    description: "Identifies potential security issues in code",
    content:
      "Analyze this code for security vulnerabilities. Look for potential SQL injections, XSS vulnerabilities, insecure authentication, improper error handling, and other security issues. Provide detailed explanations of any vulnerabilities found and suggest secure alternatives.",
    isActive: true,
    createdAt: new Date("2023-02-10").toISOString(),
    updatedAt: new Date("2023-02-10").toISOString(),
  },
  {
    id: "3",
    title: "Performance Optimization",
    description: "Suggests performance improvements",
    content:
      "Review this code for performance issues. Identify inefficient algorithms, unnecessary computations, memory leaks, and other performance bottlenecks. Suggest optimizations that would improve the code's execution time and resource usage.",
    isActive: false,
    createdAt: new Date("2023-03-05").toISOString(),
    updatedAt: new Date("2023-04-15").toISOString(),
  },
]

export default function SettingsPage() {
  const [prompts, setPrompts] = useState(initialPrompts)
  const [selectedPrompt, setSelectedPrompt] = useState(null)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isTestModalOpen, setIsTestModalOpen] = useState(false)

  const handleCreatePrompt = (prompt) => {
    const newPrompt = {
      ...prompt,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    setPrompts([...prompts, newPrompt])
    setIsCreateModalOpen(false)
  }

  const handleUpdatePrompt = (updatedPrompt) => {
    setPrompts(prompts.map((prompt) =>
      prompt.id === updatedPrompt.id ? { ...updatedPrompt, updatedAt: new Date().toISOString() } : prompt))
    setSelectedPrompt(null)
    setIsEditModalOpen(false)
  }

  const handleDeletePrompt = (id) => {
    setPrompts(prompts.filter((prompt) => prompt.id !== id))
    if (selectedPrompt?.id === id) {
      setSelectedPrompt(null)
    }
  }

  const handleToggleActive = (id) => {
    setPrompts(prompts.map((prompt) =>
      prompt.id === id ? { ...prompt, isActive: !prompt.isActive, updatedAt: new Date().toISOString() } : prompt))
  }

  const handleEditPrompt = (prompt) => {
    setSelectedPrompt(prompt)
    setIsEditModalOpen(true)
  }

  const handleTestPrompt = (prompt) => {
    setSelectedPrompt(prompt)
    setIsTestModalOpen(true)
  }

  return (
    (<div className="flex min-h-screen flex-col">
      
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold">Prompt Settings</h1>
          </div>
          <Button onClick={() => setIsCreateModalOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Create New Prompt
          </Button>
        </div>

        <PromptList
          prompts={prompts}
          onEdit={handleEditPrompt}
          onDelete={handleDeletePrompt}
          onToggleActive={handleToggleActive}
          onTest={handleTestPrompt} />

        <PromptFormModal
          open={isCreateModalOpen}
          onOpenChange={setIsCreateModalOpen}
          onSubmit={handleCreatePrompt}
          title="Create New Prompt" />

        {selectedPrompt && (
          <>
            <PromptFormModal
              open={isEditModalOpen}
              onOpenChange={setIsEditModalOpen}
              prompt={selectedPrompt}
              onSubmit={handleUpdatePrompt}
              title={`Edit Prompt: ${selectedPrompt.title}`} />

            <PromptTestModal
              open={isTestModalOpen}
              onOpenChange={setIsTestModalOpen}
              prompt={selectedPrompt} />
          </>
        )}
    </div>)
  );
}

