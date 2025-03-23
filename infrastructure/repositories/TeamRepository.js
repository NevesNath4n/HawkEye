import client from "../supabase/client.js";

export default class TeamRepository {
    async createTeam(team) {
        const { data, error } = await client
            .from("team")
            .insert([team]).select("*");
        if (error) {
            throw error;
        }
        return data;
    }

    async getTeams(userId) {
        const { data, error } = await client
            .from("team")
            .select("id, name, team_member!inner (user_id)")
            .eq("team_member.user_id", userId); 
        if (error) {
            console.log(error);
            throw error;
        }
        return data;
    }

    async getTeamById(id) {
        const { data, error } = await client
            .from("team")
            .select("name,description,team_member(role,profiles(id,email))")
            .eq("id", id).single();
        if (error) {
            throw error;
        }
       
        return data;
    }

    async updateTeam(team) {
       
        const { error } = await client
            .from("team")
            .update(team)
            .eq("id", team.id);
        if (error) {
            console.log("O erro vem daqui")
            throw error;
        }
        
        return team;
    }

    async deleteRepository(id) {
        const { error } = await client
            .from("team")
            .delete()
            .eq("id", id);
        if (error) {
            throw error;
        }
        return true;
    }

}