import client from "../supabase/client.js";


export default class ApiTokenRepository{
    async createApiToken(apiToken){
        const {data, error} = await client
            .from("api_tokens")
            .insert(apiToken);
        if(error){
            throw error;
        }
        return data;
    }

    async getApiTokens(userId){
        const {data, error} = await client
            .from("api_tokens")
            .select("*")
            .eq("created_by", userId);
        if(error){
            throw error;
        }
        return data;
    }

    async getApiTokenById(id){
        const {data, error} = await client
            .from("api_tokens")
            .select("*")
            .eq("id", id);
        if(error){
            throw error;
        }
        return data;
    }

    async updateApiToken(id, apiToken){
        const {data, error} = await client
            .from("api_tokens")
            .update(apiToken)
            .eq("id", id);
        if(error){
            throw error;
        }
        return data;
    }

    async deleteApiToken(id){
        const {data, error} = await client
            .from("api_tokens")
            .delete()
            .eq("id", id);
        if(error){
            throw error;
        }
        return data;
    }
}