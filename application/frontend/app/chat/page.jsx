"use client"

import { useChat } from "ai/react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Textarea } from "@/components/ui/textarea"
import { Send } from "lucide-react"

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat()

  return (
    <div className="w-full max-w-full h-[88dvh]  mx-auto">
      <div className="px-4 h-full">
        <ScrollArea className=" pr-4">
          {messages.map((message) => (
            <div key={message.id} className="flex gap-3 my-6">
              {message.role === "user" ? (
                <Avatar>
                  <AvatarFallback>You</AvatarFallback>
                </Avatar>
              ) : (
                <Avatar>
                  <AvatarFallback>AI</AvatarFallback>
                </Avatar>
              )}
              <div className="flex-1 overflow-hidden">
                <p className="font-semibold">{message.role === "user" ? "You" : "AI"}</p>
                <p className="text-sm">{message.content}</p>
              </div>
            </div>
          ))}
        </ScrollArea>
      </div>
      <CardFooter>
        <form onSubmit={handleSubmit} className="flex w-full gap-2">
          <Textarea value={input} onChange={handleInputChange} placeholder="Type your message..." className="flex-1" />
          <Button className="h-[8dvh]" type="submit">
            <Send />
            Send
          </Button>
        </form>
      </CardFooter>
    </div>
  )
}

