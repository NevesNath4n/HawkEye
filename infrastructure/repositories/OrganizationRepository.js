import client from "../supabase/client.js";


export default class OrganizationRepository {

    async createOrganization(organization) {
        console.log(organization)
        const { data, error } = await client
            .from("organization")
            .insert(organization);
        if (error) {
            console.log("error"+error)
            throw error;
        }
        
        return data;
    }

    async getOrganizations() {
        const { data, error } = await client
            .from("organization")
            .select("*");
        if (error) {
            throw error;
        }
        return data;
    }

    async getOrganizationById(id) {
        const { data, error } = await client
            .from("organization")
            .select("*")
            .eq("id", id);
        if (error) {
            throw error;
        }
        return data;
    }

    async updateOrganization(id, organization) {
        const { data, error } = await client
            .from("organization")
            .update(organization)
            .eq("id", id);
        if (error) {
            throw error;
        }
        return data;
    }

    async deleteOrganization(id) {
        const { data, error } = await client
            .from("organization")
            .delete()
            .eq("id", id);
        if (error) {
            throw error;
        }
        return data;
    }

    async getRepositories(id){
        const { data, error } = await client
            .from("repositories")
            .select("*")
            .eq("organization_id", id);
        if (error) {
            throw error;
        }
        return data;
    }
}