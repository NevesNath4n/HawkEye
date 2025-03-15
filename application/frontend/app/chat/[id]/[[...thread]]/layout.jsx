"use client";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { ChatSidebar } from "@/components/chat-sidebar"
import { useState,useEffect } from "react";
import axios from "@/lib/axios";
import { useParams } from "next/navigation"
import React,{createContext} from "react";

export const ThreadContext = createContext();

export const ThreadProvider = ({ children }) => {
  const [threadId, setThreadId] = useState(null);
  const [newThread,setnewThread] = useState(false);

  const {thread} = useParams();
  
  useEffect(()=>{
    if(thread){
      setThreadId(thread)
    }
  },[thread])
  return (
    <ThreadContext.Provider value={{ threadId, setThreadId,newThread,setnewThread }}>
      {children}
    </ThreadContext.Provider>
  );
};


export default function ChatLayout({
  children
}){

  const {id} = useParams()
  let [repositories,setRepositories] = useState([])
  let [chatHistory,setChatHistory] = useState([])
    let loadRepositories = async () => {
      let response = await axios.get("/repository/get")
      setRepositories(response.data)
    }

    
    useEffect(()=>{
      loadRepositories();

    },[])

    
  return (
    <ThreadProvider>
      <SidebarProvider>
        <ChatSidebar repositories={repositories}  repositoryId={id} setChatHistory={setChatHistory} chatHistory={chatHistory} />
        <SidebarInset className="flex flex-col">
          <header className="w-full">
            <SidebarTrigger className="p-4"></SidebarTrigger>
          </header>
          {children}
        </SidebarInset>
      </SidebarProvider>
    </ThreadProvider>
  );
}

