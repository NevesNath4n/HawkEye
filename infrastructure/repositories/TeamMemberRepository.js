import client from "../supabase/client.js";
export default class TeamMembersRepository{

    async createTeamMember(teamId,member){
        const {data,error} = await client
            .from("team_member")
            .insert([{team_id:teamId,user_id:member.id,role:member.role}]);
        if(error){
            throw error;
        }
        return data;
    }

    async checkUserRole(teamId, userId) {
        const { data, error } = await client
            .from("team_member")
            .select("role")
            .eq("team_id", teamId)
            .eq("user_id", userId)
            .single();
            
        if (error) {
            throw error;
        }
        return data.role;
    }

    async createTeamMembers(teamId,members){
        let membersObj = members.map(member => {
            return {team_id:teamId,user_id:member.id,role:member.role}
        })
        console.log(membersObj)
        const {data,error} = await client
            .from("team_member")
            .insert(membersObj);
        if(error){
            console.log("O erro vem daqui 3")
            throw error;
        }
        return data;
    }

    async updateTeamMembers(teamId,members){
        const {data,error} = await client
            .from("team_member")
            .delete()
            .eq("team_id",teamId);
        if(error){
            console.log("O erro vem daqui 2")
            throw error;
        }
        return await this.createTeamMembers(teamId,members);
    }

    async getTeamMembers(teamId){
        const {data,error} = await client
            .from("team_member")
            .select("*")
            .eq("team_id",teamId);
        if(error){
            throw error;
        }
        return data;
    }

    async getTeamMember(teamId,userId){
        const {data,error} = await client
            .from("team_member")
            .select("*")
            .eq("team_id",teamId)
            .eq("user_id",userId)
            .single();
        if(error){
            throw error;
        }
        return data;
    }

    async getTeamsByMemberId(userId){
        const {data,error} = await client
            .from("team_member")
            .select("id,user_id,team_id,role,teams(*)")
            .eq("user_id",userId);
        if(error){
            throw error;
        }
        return data;
    }
}