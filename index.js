import express from "express";
import OrganizationController from "./application/Organization/controllers/OrganizationController.js";
import RepositoryController from "./application/Repository/controllers/RepositoryController.js";
import OrganizationService from "./application/Organization/service/OrganizationService.js";
import RepositoryService from "./application/Repository/service/RepositoryService.js";
import AgentController from "./application/Agent/controllers/AgentController.js";
import dotenv from "dotenv";
import model from "./infrastructure/llm/model.js";
dotenv.config({path:'.env'})
const app = express();
app.use(express.json())
let organizationService = new OrganizationService()
let repositoryService = new RepositoryService()
let organizationController = new OrganizationController(organizationService)
let repositoryController = new RepositoryController(repositoryService)
let agentController = new AgentController(model)

//Organization
app.post("/organization/create",organizationController.createOrganization.bind(organizationController))
app.get("/organization/get",organizationController.getOrganizations.bind(organizationController))
app.get("/organization/get/:id",organizationController.getOrganization.bind(organizationController))
app.put("/organization/update/:id",organizationController.updateOrganization.bind(organizationController))
app.delete("/organization/delete/:id",organizationController.deleteOrganization.bind(organizationController))


//Repository
app.post("/repository/create",repositoryController.createRepository.bind(repositoryController))
app.get("/repository/get",repositoryController.getRepositories.bind(repositoryController))
app.get("/repository/get/:id",repositoryController.getRepository.bind(repositoryController))
app.put("/repository/update/:id",repositoryController.updateRepository.bind(repositoryController))
app.put("/repository/sync/:id",repositoryController.syncRepository.bind(repositoryController))
app.delete("/repository/delete/:id",repositoryController.deleteRepository.bind(repositoryController))

//Agent
app.post("/agent/checkForFalsePositives",agentController.checkForFalsePositives.bind(agentController))


app.listen(3500,()=>{
    console.log("Started on 3500")
})



