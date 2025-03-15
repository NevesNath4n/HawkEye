import express from "express";
import OrganizationController from "./application/Organization/controllers/OrganizationController.js";
import RepositoryController from "./application/Repository/controllers/RepositoryController.js";
import OrganizationService from "./application/Organization/service/OrganizationService.js";
import RepositoryService from "./application/Repository/service/RepositoryService.js";
import AgentController from "./application/Agent/controllers/AgentController.js";
import TeamController from "./application/Team/controllers/TeamController.js";
import ChatController from "./application/Chat/controllers/ChatController.js";
import ChatService from "./application/Chat/service/ChatService.js";
import ChatRepository from "./infrastructure/repositories/ChatRepository.js";
import TeamService from './application/Team/service/TeamService.js'
import TeamRepository from './infrastructure/repositories/TeamRepository.js'
import TeamMembersRepository from './infrastructure/repositories/TeamMemberRepository.js';
import UserRepository from "./infrastructure/repositories/UserRepository.js";
import dotenv from "dotenv";
import authorizeUser from "./application/Middlewares/authorizeUser.js";
import model from "./infrastructure/llm/model.js";
import cors from "cors"
dotenv.config({path:'.env'})
const app = express();
app.use(express.json())
app.use(cors({
    origin: '*' //TODO change this before production
}))

let chatService = new ChatService(new ChatRepository())
let chatController = new ChatController(chatService)
let organizationService = new OrganizationService()
let repositoryService = new RepositoryService()
let teamService = new TeamService(new TeamRepository(),new TeamMembersRepository(),new UserRepository());
let organizationController = new OrganizationController(organizationService)
let repositoryController = new RepositoryController(repositoryService)
let agentController = new AgentController(model)
let teamController = new TeamController(teamService)

//Organization
app.post("/organization/create",organizationController.createOrganization.bind(organizationController))
app.get("/organization/get",organizationController.getOrganizations.bind(organizationController))
app.get("/organization/get/:id",organizationController.getOrganization.bind(organizationController))
app.put("/organization/update/:id",organizationController.updateOrganization.bind(organizationController))
app.delete("/organization/delete/:id",organizationController.deleteOrganization.bind(organizationController))

//Repository
app.post("/repository/create",repositoryController.createRepository.bind(repositoryController))
app.get("/repository/:teamId/get",authorizeUser,repositoryController.getRepositoriesByTeamId.bind(repositoryController))
app.get("/repository/get/:id",authorizeUser,repositoryController.getRepository.bind(repositoryController))
app.get("/repository/get",authorizeUser,repositoryController.getRepositories.bind(repositoryController))
app.put("/repository/update/:id",authorizeUser,repositoryController.updateRepository.bind(repositoryController))
app.put("/repository/sync/:id",authorizeUser,repositoryController.syncRepository.bind(repositoryController))
app.delete("/repository/delete/:id",authorizeUser,repositoryController.deleteRepository.bind(repositoryController))

//Team
app.post("/team/create",authorizeUser,teamController.createTeam.bind(teamController))
app.get("/team/get",authorizeUser,teamController.getTeams.bind(teamController))
app.get("/team/get/:id",authorizeUser,teamController.getTeam.bind(teamController))
app.put("/team/update/:id",authorizeUser,teamController.updateTeam.bind(teamController))
app.delete("/team/delete/:id",authorizeUser,teamController.deleteTeam.bind(teamController))

//ChatHistory
app.post("/chat/create",authorizeUser,chatController.createThread.bind(chatController))
app.get("/chat/get",authorizeUser,chatController.getChatHistory.bind(chatController))
app.get("/chat/get/:id",authorizeUser,chatController.getThread.bind(chatController))
app.put("/chat/update/:id",authorizeUser,chatController.createThreadMessage.bind(chatController))
app.delete("/chat/delete/:id",authorizeUser,chatController.deleteThread.bind(chatController))

//Agent
app.post("/agent/checkForFalsePositives",authorizeUser,agentController.checkForFalsePositives.bind(agentController))


app.listen(3500,()=>{
    console.log("Started on 3500")
})



