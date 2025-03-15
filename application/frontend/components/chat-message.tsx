import ReactMarkdown from "react-markdown"
import CodeBlock from "./code-block"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

interface ChatMessageProps {
  content: string
  sender: "user" | "assistant"
  timestamp?: string
  avatar?: string
}

export default function ChatMessage({ content, sender, timestamp, avatar }: ChatMessageProps) {
  const isUser = sender === "user"

  return (
    <div className={cn("flex w-full gap-3 p-4", isUser ? "justify-end" : "justify-start")}>
      {!isUser && (
        <Avatar className="h-8 w-8">
          <AvatarImage src={avatar || "/placeholder.svg?height=32&width=32"} alt="Assistant" />
          <AvatarFallback>AI</AvatarFallback>
        </Avatar>
      )}

      <div className={cn("flex flex-col max-w-[80%]", isUser ? "items-end" : "items-start")}>
        <div className={cn("rounded-lg p-4", isUser ? "bg-primary text-primary-foreground" : "bg-muted")}>
          <ReactMarkdown
            components={{
              code({ node, inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || "")
                const language = match ? match[1] : ""

                if (inline) {
                  return (
                    <code className="px-1 py-0.5 rounded bg-muted-foreground/20 text-sm font-mono" {...props}>
                      {children}
                    </code>
                  )
                }

                return <CodeBlock language={language} value={String(children).replace(/\n$/, "")} />
              },
            }}
          >
            {content}
          </ReactMarkdown>
        </div>

        {timestamp && <span className="text-xs text-muted-foreground mt-1">{timestamp}</span>}
      </div>

      {isUser && (
        <Avatar className="h-8 w-8">
          <AvatarImage src={avatar || "/placeholder.svg?height=32&width=32"} alt="User" />
          <AvatarFallback>You</AvatarFallback>
        </Avatar>
      )}
    </div>
  )
}

