"use client"

import type React from "react"
import { useState } from "react"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism"
import { Copy, Maximize2, Minimize2, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface CodeBlockProps {
  language: string
  value: string
}

export default function CodeBlock({ language, value }: CodeBlockProps) {
  const [isMaximized, setIsMaximized] = useState(false)
  const [isCopied, setIsCopied] = useState(false)
  const [codeValue, setCodeValue] = useState(value)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(codeValue)
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 2000)
  }

  const toggleMaximize = () => {
    setIsMaximized(!isMaximized)
  }

  const handleCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCodeValue(e.target.value)
  }

  return (
    <div
      className={cn(
        "relative rounded-md overflow-hidden my-4 transition-all duration-300",
        isMaximized ? "fixed inset-4 z-50 flex flex-col" : "w-50",
      )}
    >
      <div className="flex items-center justify-between bg-zinc-800 px-4 py-2">
        <div className="text-xs text-zinc-400">{language || "code"}</div>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-zinc-400 hover:text-white hover:bg-zinc-700"
            onClick={handleCopy}
          >
            {isCopied ? <Check size={16} /> : <Copy size={16} />}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-zinc-400 hover:text-white hover:bg-zinc-700"
            onClick={toggleMaximize}
          >
            {isMaximized ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
          </Button>
        </div>
      </div>

      {isMaximized ? (
        <textarea
          value={codeValue}
          onChange={handleCodeChange}
          className="flex-1 p-4 font-mono text-sm max-w-50 bg-zinc-900 text-zinc-100 outline-none resize-none"
          spellCheck="false"
        />
      ) : (
        <SyntaxHighlighter
          language={language || "javascript"}
          style={vscDarkPlus}
          customStyle={{ margin: 0, borderRadius: 0,width: "70%" }}
        >
          {codeValue}
        </SyntaxHighlighter>
      )}
    </div>
  )
}

