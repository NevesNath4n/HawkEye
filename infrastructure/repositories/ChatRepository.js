import client from "../supabase/client.js";


export default class ChatRepository{
    
    async deleteThread(threadId){
        const {data,error} = await client
            .from("thread")
            .delete()
            .eq("id",threadId);


        if(error){
            throw error;
        }

        return data;
    }
    
    
    async createThread(chat){
        const {data,error} = await client
            .from("thread")
            .insert(chat)
            .select("*")
            .single();
    
        if(error){
            throw error;
        }
    
        return data;
    }

    async getChatHistory(repositoryId,userId){
        const {data,error} = await client
            .from("thread")
            .select("*")
            .eq("repository_id",repositoryId)
            .eq("created_by",userId);
    
        if(error){
            throw error;
        }
    
        return data;
    }

    async getThread(threadId){
        const {data,error} = await client
            .from("thread_message")
            .select("content,id,created_at,role")
            .order("created_at", {ascending:true})
            .eq("thread_id",threadId);
        
        if(error){
            throw error;
        }
        
        return data;
    }

    async createThreadMessage(message,threadId){
        const {data,error} = await client
            .from("thread_message")
            .insert({...message,thread_id:threadId})
            .select("*")
            .single();
        
        if(error){
            throw error;
        }
        
        return data;
    }

}