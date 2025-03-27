
export default class SettingsController{
    /**
     *
     */
    constructor(promptService, apiTokensService) {
        this.promptService = promptService;
        this.apiTokensService = apiTokensService;
        
    }

    async createPrompt(req,res){
        try{
            let prompt = req.body;
            prompt.created_by = req.user.sub;
            const response = await this.promptService.createPrompt(prompt);
            res.status(201).json(response);
        }catch(error){
            res.status(400).json(error);
        }
    }

    async getPrompts(req,res){
        try{
            const teamId = req.params.teamId;
            const response = await this.promptService.getPrompts(teamId);
            res.status(200).json(response);
        }catch(error){
            res.status(400).json(error);
        }
    }

    async getPromptById(req,res){
        try{
            const id = req.params.id;
            const response = await this.promptService.getPromptById(id);
            res.status(200).json(response);
        }catch(error){
            res.status(400).json(error);
        }
    }

    async updatePrompt(req,res){
        try{
            const id = req.params.id;
            let prompt = req.body;
            prompt.created_by = req.user.sub;
            prompt.id = id;
            prompt.updated_at = new Date().toISOString();
            const response = await this.promptService.updatePrompt(id, prompt);
            res.status(200).json(prompt);
        }catch(error){
            res.status(400).json(error);
        }
    }

    async deletePrompt(req,res){
        try{
            const id = req.params.id;
            const response = await this.promptService.deletePrompt(id);
            res.status(200).json(response);
        }catch(error){
            res.status(400).json(error);
        }
    }

    async changePromptStatus(req,res){
        try{
            const id = req.params.id;
            const promptStatus = req.body.active;
            const response = await this.promptService.changePromptStatus(id, promptStatus);
            res.status(200).json(response);
        }catch(error){
            res.status(400).json(error);
        }
    }

    async testPrompt(req,res){
        try{
            const id = req.params.id;
            const response = await this.promptService.getPromptById(id);
            res.status(200).json(response);
        }catch(error){
            res.status(400).json(error);
        }
    }

    async createApiToken(req,res){
        try{
            let apiToken = req.body;
            apiToken.created_by = req.user.sub;
            apiToken.token = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
            const response = await this.apiTokensService.createApiToken(apiToken);
            res.status(201).json(apiToken);
        }catch(error){
            res.status(400).json(error);
        }
    }

    async getApiTokens(req,res){
        try{
            const userId = req.user.sub;
            const response = await this.apiTokensService.getApiTokens(userId);
            res.status(200).json(response);
        }catch(error){
            console.log(error)
            res.status(400).json(error);
        }
    }

    async regenerateApiToken(req,res){
        try{
            const id = req.params.id;
            let newToken = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
            const response = await this.apiTokensService.updateApiToken(id, newToken);
            res.status(200).json(response);
        }catch(error){
            res.status(400).json(error);
        }
    }

    async deleteApiToken(req,res){
        try{
            const id = req.params.id;
            const response = await this.apiTokensService.deleteApiToken(id);
            res.status(200).json(response);
        }catch(error){
            res.status(400).json(error);
        }
    }

}