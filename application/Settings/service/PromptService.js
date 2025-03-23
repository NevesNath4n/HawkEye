


export default class PromptService {
    /**
     *
     */
    constructor(promptRepository) {
        this.promptRepository = promptRepository;        
    }


    async testPrompt(prompt,code){
        
    }

    async createPrompt(prompt){
        return await this.promptRepository.createPrompt(prompt);
    }

    async getPrompts(teamId){
        return await this.promptRepository.getPrompts(teamId);
    }

    async getPromptById(id){
        return await this.promptRepository.getPromptById(id);
    }

    async updatePrompt(id, prompt){
        return await this.promptRepository.updatePrompt(id, prompt);
    }

    async deletePrompt(id){
        return await this.promptRepository.deletePrompt(id);
    }

    async changePromptStatus(id,promptStatus){
        return await this.promptRepository.changePromptStatus(id,promptStatus);
    }


    

}