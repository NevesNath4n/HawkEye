import Organization from '../../../domain/entities/Organization.js'
import OrganizationRepository from '../../../infrastructure/repositories/OrganizationRepository.js'
import GithubService from '../../../infrastructure/services/githubService.js'
import client from '../../../infrastructure/supabase/client.js'
export default class OrganizationService{
    constructor(){
        this.organizationRepository = new OrganizationRepository()
    }

    async createOrganization(organization){
        
        let savedOrganization = await this.organizationRepository.createOrganization(organization)
        await client.schema("pgmq_public").rpc('send',{
            queueName:'organization_queue',
            message:organization
        });
        return savedOrganization
    }

    async getOrganization(id){
        return await this.organizationRepository.getOrganizationById(id)
    }
    
    async getAllOrganizations(){
        return await this.organizationRepository.getOrganizations()
    }
    
    async updateOrganization(organization){
        let updatedOrganization = await this.organizationRepository.update(organization)
        await client.schema("pgmq_public").rpc('send',organization);
        return updatedOrganization
    }
    
    async deleteOrganization(id){
        return await this.organizationRepository.deleteOrganization(id)
    }

    async getOrganizationData(organization){
        if(organization.isGithub()){
            let githubService = new GithubService(organization.url,organization.apiKey)
            return await githubService.getOrganizationData(organization)
        }
    }

    async getRepositories(organization){
        if(organization.isGithub()){
            let githubService = new GithubService(organization.url,organization.apiKey)
            let repositoriesRaw = await githubService.getOrganizationRepos(organization)
            let repositories = []
            for (let repository of repositoriesRaw){
                let repositoryobj = new Repository(
                    repository.name,
                    repository.full_name,
                    repository.html_url,
                    repository.id,
                    organization.id
                )
                repositories.push(repositoryobj)
            }
            return repositories
        }
    }

    

}