import client from "../supabase/client.js";


export default class RepositoryRepository {

    async createRepository(repository) {
        const { data, error } = await client
            .from("repository")
            .insert([repository]).select("*");
        if (error) {
            throw error;
        }
        return data;
    }

    async linkRepositoryToOrganization(repositoryId, organizationId) {
        const { data, error } = await client
            .from("organization_repositories")
            .insert([{ repository_id: repositoryId, organization_id: organizationId }]);
        if (error) {
            throw error;
        }
        return data;
    }

    async getRepositories() {
        const { data, error } = await client
            .from("repository")
            .select("*");
        if (error) {
            throw error;
        }
        return data;
    }

    async getRepositoryById(id) {
        const { data, error } = await client
            .from("repository")
            .select("*")
            .eq("id", id).single();
        if (error) {
            throw error;
        }
        console.log("retornando simples repositorio"+id)
        console.log("repositorio: "+ data)
        return data;
    }

    async updateRepository(id, repository) {
        const { data, error } = await client
            .from("repository")
            .update(repository)
            .eq("id", id);
        if (error) {
            throw error;
        }
        return data;
    }

    async deleteRepository(id) {
        const { data, error } = await client
            .from("repository")
            .delete()
            .eq("id", id);
        if (error) {
            throw error;
        }
        return data;
    }
}