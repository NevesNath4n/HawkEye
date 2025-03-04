import client from "../supabase/client.js";


export default class UserRepository{
    async getUserByEmail(email){
        console.log(email);
        let {data,error} = await client.from("profiles").select("*").eq("email",email).single()
        
        if(data === null){
            return null;
        }

        if(error){
            throw error;
        }
        return data;
    }

}