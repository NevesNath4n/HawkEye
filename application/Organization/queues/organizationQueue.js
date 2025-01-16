import RepositoryRepository from "../../../infrastructure/repositories/RepositoryRepository.js";
import client from "../../../infrastructure/supabase/client.js";



async function organizationQueue(){
   let {data,error} = await client.schema("pgmq_public").rpc('pop',{
        queue_name:'organization_queue'
    });

   if(data){
        let organization = data.payload;
        organization = new Organization(organization.name,organization.url,organization.key,organization.apiKey,"")
        let organizationService = new OrganizationService()
        let repositoryArray = await organizationService.getRepositories(organization);
        for await (let repository of repositoryArray){
            let repositoryRepository = new RepositoryRepository()
            await repositoryRepository.createRepository(repository)
            
        }        
    }

}


while(true){
    await organizationQueue()
    await new Promise(r => setTimeout(r, 1000));
}