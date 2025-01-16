import OrganizationService from "../service/OrganizationService.js";

export default class OrganizationController {

    /**
     *
     */
    constructor(organizationService) {
        console.log(organizationService)
        this.organizationService = organizationService;
    }


    /**
     * @param req
     * @param res
     */

    async createOrganization(req, res) {
        try {
            const organization = await this.organizationService.createOrganization(req.body);
            res.status(201).json({msg:"Organization created successfully"});
        } catch (error) {
            console.log("erro final"+error)
            res.status(500).json({ error: error.message });
        }
    }

    async getOrganizations(req, res) {
        try {
            const organizations = await this.organizationService.getAllOrganizations();
            res.status(200).json(organizations);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getOrganization(req, res) {
        try {
            const organization = await this.organizationService.getOrganization(req.params.id);
            res.status(200).json(organization);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async updateOrganization(req, res) {
        try {
            const organization = await this.organizationService.updateOrganization(req.params.id, req.body);
            res.status(200).json(organization);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async deleteOrganization(req, res) {
        try {
            await this.organizationService.deleteOrganization(req.params.id);
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async ingestRepository(req, res) {
        try {
            const organization = await this.organizationService.ingestRepository(req.body);
            res.status(201).json(organization);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }


    async syncOrganization(req, res) {
        try {
            const organization = await this.organizationService.syncOrganization(req.params.id);
            res.status(200).json(organization);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }



}