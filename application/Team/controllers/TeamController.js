import z from 'zod';
import createTeamRequestParser from '../requests/createTeamRequest.js';
import updateTeamRequestParser from '../requests/updateTeamRequest.js';
export default class TeamController {
    
    /**
     *
     */
    constructor(teamService) {
        
        this.teamService = teamService;
    }

    async __checkUserRole(req){
        try {
            const user = req.user;
            const teamId = req.params.id;
            const role = await this.teamService.checkUserRole(teamId,user.sub);
            return role;
        } catch (error) {
            console.log(error);
            return null;
        }
    }


    /**
     * @param req
     * @param res
     */
    async createTeam(req, res) {
        try {
           
            createTeamRequestParser.parse(req.body);
            const team = await this.teamService.createTeam(req.body);
            res.status(201).json(team);
        } catch (error) {
            console.log(error)
            if(error instanceof z.ZodError){
                const errorMessage = error.errors.map((error) => error.message).join("\n")
                return res.status(400).json({ error: errorMessage });
            }
            res.status(500).json({ error: error.message });
        }
    }

    async getTeams(req, res) {
        try {
            const repositories = await this.teamService.getTeams();
            res.status(200).json(repositories);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getTeam(req, res) {
        try {
            let userRole = this.__checkUserRole(req);
            if(userRole == null){
                return res.status(403).json({ error: "You are not allowed to perform this action" });
            }
            const repository = await this.teamService.getTeamById(req.params.id);
            res.status(200).json(repository);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async updateTeam(req, res) {
        try {
            let userRole = await this.__checkUserRole(req);
            console.log(userRole);
            if(userRole == null || userRole !== "admin"){
                return res.status(403).json({ error: "You are not allowed to perform this action" });
            }

            updateTeamRequestParser.parse(req.body);
            let teamObj = req.body;
            teamObj.id = req.params.id;
            const team = await this.teamService.updateTeam(req.body);
            res.status(200).json(team);
        } catch (error) {
            if(error instanceof z.ZodError){
                console.log(error);
                const errorMessage = error.errors.map((error) => error.message).join("\n")
                return res.status(400).json({ error: errorMessage });
            }
            console.log(error)
            res.status(500).json({ error: error.message });
        }
    }

    

    async deleteTeam(req, res) {
        try {
            let userRole = this.__checkUserRole(req);
            if(userRole == null || userRole != "admin"){
                return res.status(403).json({ error: "You are not allowed to perform this action" });
            }
            await this.teamService.deleteTeam(req.params.id);
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}