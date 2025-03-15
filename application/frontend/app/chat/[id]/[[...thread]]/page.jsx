"use client"

import { useChat } from "ai/react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Textarea } from "@/components/ui/textarea"
import { Send } from "lucide-react"
import { useEffect,useState,useContext } from "react"
import MarkdownRenderer from "@/components/markdown"
import axios from "@/lib/axios"
import ChatStartPage from "@/components/chat-start-page"
import { useParams,useRouter } from "next/navigation"
import {motion} from "framer-motion"
import { Skeleton } from "@/components/ui/skeleton"
import { ThreadContext } from "./layout"
import { HighlighterProvider } from "@/lib/context/highlighter/highlighterProvider";

export default function Chat() {
  const router = useRouter();
  const { threadId, setThreadId,newThread,setnewThread  } = useContext(ThreadContext);
  const [loadingMessage, setLoadingMessage] = useState(false);
  const {id} = useParams();
 

  const { messages, input, handleInputChange,setInput, handleSubmit,setMessages } = useChat({
    initialMessages: [],
    initialInput: "",
    fetch: async (message) => {
      // Send message to the server
      let newThreadId = threadId;
      if(threadId == null){
        try{
          setnewThread(false);
          console.log("Creating new thread");
          let response = await axios.post(process.env.NEXT_PUBLIC_BASE_API_URL+"/chat/create", {
            repository_id:id,
            title: input,
          });
          newThreadId = response.data.id;
          setThreadId(newThreadId);
          window.history.replaceState(null,'',"/chat/"+id+"/"+newThreadId);
        }catch(e){
          console.log(e);
        }
        
      
      }
      setLoadingMessage(true); 
      let response = await axios.put(process.env.NEXT_PUBLIC_BASE_API_URL+"/chat/update/"+newThreadId, {
        content: input,
        repository_id:id
      })
      setMessages([...messages,{role:"user",content:input},response.data]);
      setLoadingMessage(false);
      return response.data
    },
  });


  useEffect(()=>{
    if(newThread){
      setMessages([]);
      setThreadId(null);      
      window.history.replaceState(null,'',"/chat/"+id);
    }
  },[newThread])


  const getMessages = async () => {
    let response = await axios.get(process.env.NEXT_PUBLIC_BASE_API_URL+"/chat/get/"+threadId)
    setMessages(response.data)
  }
  
  useEffect(()=>{
    if(threadId){
      setnewThread(false);
      getMessages()
    } 

  },[threadId])

  const handlePromptClick = (prompt) => {
    setInput(prompt)

  }
 

  const promptSuggestions = [
    {
      prompt:"Procure exemplos de SQL Injection no meu código",
      title:"SQL Injection",
      description:"Procure exemplos de SQL Injection no meu código"
    },
    {
      prompt:"Procure funções que não são utilizadas no meu código",
      title:"Funções não utilizadas",
      description:"Procure funções que não são utilizadas no meu código"
    },
    {
      prompt:"Procure variáveis não utilizadas no meu código",
      title:"Variáveis não utilizadas",
      description:"Procure variáveis não utilizadas no meu código"
    },
    {
      prompt:"Meu código está vulnerável a ataques de Cross-Site Scripting?",
      title:"Cross-Site Scripting",
      description:"Meu código está vulnerável a ataques de Cross-Site Scripting?"
    }
  ];


  return (
    <HighlighterProvider>
    <div className="w-full max-w-full h-[85dvh]  mx-auto">
      <div className="px-4 h-full overflow-y-auto">
        {messages.length > 0 && (
          <ScrollArea className=" pr-4">
            {messages.map((message) => (
              <motion.div initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }} key={message.id} className="flex  gap-3 my-6">
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
                  <MarkdownRenderer>{message.content}</MarkdownRenderer>
                </div>
              </motion.div>
            ))}
          </ScrollArea>
        )}

        {(messages.length === 0 || newThread) && (
          <ChatStartPage promptSuggestions={promptSuggestions} handlePromptClick={handlePromptClick}/>
        )}

        {loadingMessage && (
           <motion.div initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}  className="flex  gap-3 my-6">
              <div className="flex items-center space-x-4">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[70vw]" />
                  <Skeleton className="h-4 w-[70vw]" />
                </div>
              </div>
           </motion.div>
        )}
        
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
    </HighlighterProvider>
  )
}

