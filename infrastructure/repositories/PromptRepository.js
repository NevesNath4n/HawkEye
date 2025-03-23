import client from "../supabase/client.js";


export default class PromptRepository{
    async createPrompt(prompt){
        const {data, error} = await client
            .from("prompt")
            .insert(prompt);
        if(error){
            throw error;
        }
        return data;
    }

    async getPrompts(teamId){
        const {data, error} = await client
            .from("prompt")
            .select("*")
            .eq("team_id", teamId);
        if(error){
            throw error;
        }
        return data;
    }

    async getPromptById(id){
        const {data, error} = await client
            .from("prompt")
            .select("*")
            .eq("id", id);
        if(error){
            throw error;
        }
        return data;
    }

    async updatePrompt(id, prompt){
        const {data, error} = await client
            .from("prompt")
            .update(prompt)
            .eq("id", id);
        if(error){
            throw error;
        }
        return data;
    }

    async deletePrompt(id){
        const {data, error} = await client
            .from("prompt")
            .delete()
            .eq("id", id);
        if(error){
            throw error;
        }
        return data;
    }

    async  changePromptStatus(id, promptStatus){
        const {data, error} = await client
            .from("prompt")
            .update({isActive: promptStatus})
            .eq("id", id);
        if(error){
            console.log(error);
            throw error;
        }
        return data;
    }



}