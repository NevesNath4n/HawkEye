import Repository from '../../../domain/entities/Repository.js'
import RepositoryRepository from '../../../infrastructure/repositories/RepositoryRepository.js'
import client from '../../../infrastructure/supabase/client.js'

export default class RepositoryService{
    
    constructor(){
        this.repositoryRepository = new RepositoryRepository()
    }

    async createRepository(repository){

        let createdRepository =  await this.repositoryRepository.createRepository(repository)
        createdRepository = createdRepository[0];
        if(createdRepository.apiKey !== null){
            await this.syncRepository(createdRepository.id)
        }
        return createdRepository
    }

    async getRepositoriesByTeamId(teamId){
        return await this.repositoryRepository.getRepositoryByTeamId(teamId)
    }

    async getRepository(id){
        return await this.repositoryRepository.getRepositoryById(id)
    }
    
    async getAllRepositories(){
        return await this.repositoryRepository.getRepositories()
    }

    async linkRepositoryToOrganization(repositoryId,organizationId){
        return await this.repositoryRepository.linkRepositoryToOrganization(repositoryId,organizationId)
    }



    async syncRepository(repositoryId){
        console.log(repositoryId)
        let repository = await this.repositoryRepository.getRepositoryById(repositoryId)
        
        let { data: queueData, error: errorQueue } = await client.schema("pgmq_public").rpc('send', {
            queue_name: 'repository_queue',
            message: repository,
        });

        console.log(queueData)
        
        if(errorQueue){
            console.log(errorQueue)
            return false;
        }

        return true;
    }


    
    
    async updateRepository(repository){
        
        let updatedRepository = await this.repositoryRepository.updateRepository(repository.id,repository)
        if(updatedRepository.apiKey){
            console.log("id:"+updatedRepository.id)
            await this.syncRepository(updatedRepository.id)
        }
        return updatedRepository;
    }
    
    async deleteRepository(id){
        return await this.repositoryRepository.deleteRepository(id)
    }
}