export default class RepositoryController {
    
    /**
     *
     */
    constructor(repositoryService) {
        
        this.repositoryService = repositoryService;
    }

    /**
     * @param req
     * @param res
     */
    async createRepository(req, res) {
        try {
            const repository = await this.repositoryService.createRepository(req.body);
            res.status(201).json(repository);
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: error.message });
        }
    }

    async getRepositories(req, res) {
        try {
            const repositories = await this.repositoryService.getAllRepositories();
            res.status(200).json(repositories);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getRepositoriesByTeamId(req, res) {
        try {
            const repositories = await this.repositoryService.getRepositoriesByTeamId(req.params.teamId);
            res.status(200).json(repositories);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getRepository(req, res) {
        try {
            const repository = await this.repositoryService.getRepository(req.params.id);
            res.status(200).json(repository);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async updateRepository(req, res) {
        try {
            const repository = await this.repositoryService.updateRepository(req.body);
            res.status(200).json(repository);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async syncRepository(req,res){
        try{
            const repositoryResult = await this.repositoryService.syncRepository(req.params.id);
            if(!repositoryResult){
                res.status(500).json({ error: "Error syncing repository" });
            }
        
            res.status(200).json({message:"Repository synced sucessfully"});
        
        }catch(e){
            res.status(500).json({ error: error.message });
        }
    }

    async deleteRepository(req, res) {
        try {
            await this.repositoryService.deleteRepository(req.params.id);
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}