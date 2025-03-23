
export default class TeamService {

    constructor(teamRepository,teamMembersRepository,userRepository) {
        this.teamRepository = teamRepository;
        this.teamMembersRepository = teamMembersRepository;
        this.userRepository = userRepository;
    }

    async formatTeamMembers(members){
        let membersObj = await Promise.all(
            members.map(member => this.userRepository.getUserByEmail(member.email))
        );
        console.log(membersObj)
        let returnedMemberObj = membersObj.filter(memberObj => memberObj !== null);
        let formattedObj = []
        for(let memberObj of returnedMemberObj){
            let arr = members.filter(memberFilter => memberFilter.email == memberObj.email)
            if(arr.length > 0){
                formattedObj.push({...arr[0],id:memberObj.id})
                continue;
            }

        }
        return formattedObj;
    }

    async createTeam(team) {
        try {
            let members = team.members;
            delete team.members;
            let createdTeam =  await this.teamRepository.createTeam(team);
            let formattedObj = await this.formatTeamMembers(members);
            console.log(createdTeam)
            members = await this.teamMembersRepository.createTeamMembers(createdTeam[0].id,formattedObj);
            return createdTeam[0];  
        } catch (error) {
            throw error;
        }
    }

    async getTeams(userId) {
        try {
            return await this.teamRepository.getTeams(userId);
        } catch (error) {
            throw error;
        }
    }

    async getTeamById(id) {
        try {
            return await this.teamRepository.getTeamById(id);
            
        } catch (error) {
            throw error;
        }
    }

    async updateTeam(team) {
        try {
            let members = team.members;
            delete team.members;
            let updatedTeam =  await this.teamRepository.updateTeam(team);
            members = await this.formatTeamMembers(members);
            members = await this.teamMembersRepository.updateTeamMembers(team.id,members);
            return updatedTeam;
        } catch (error) {
            throw error;
        }
    }

    async checkUserRole(teamId,userId){
        try {
            return await this.teamMembersRepository.checkUserRole(teamId,userId);
        } catch (error) {
            throw error;
        }
    }


    async deleteTeam(id) {
        try {
            return await this.teamRepository.deleteTeam(id);
        } catch (error) {
            throw error;
        }
    }

}