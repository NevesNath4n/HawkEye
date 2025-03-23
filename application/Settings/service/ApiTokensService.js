


export default class ApiTokensService {
    /**
     *
     */
    constructor(apiTokensRepository) {
        this.apiTokensRepository = apiTokensRepository;        
    }

    async createApiToken(apiToken){
        return await this.apiTokensRepository.createApiToken(apiToken);
    }

    async getApiTokens(userId){
        return await this.apiTokensRepository.getApiTokens(userId);
    }

    async getApiTokenById(id){
        return await this.apiTokensRepository.getApiTokenById(id);
    }

    async updateApiToken(id, apiToken){
        return await this.apiTokensRepository.updateApiToken(id, apiToken);
    }

    async deleteApiToken(id){
        return await this.apiTokensRepository.deleteApiToken(id);
    }

   
}