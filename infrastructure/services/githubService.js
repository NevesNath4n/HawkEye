import axios from 'axios';

export default class GithubService {
    constructor(baseUrl, apiKey) {
        this.baseUrl = baseUrl;
        this.apiKey = apiKey;
    }

    async getOrganizationData(organization) {
        let url = `${this.baseUrl}/orgs/${organization.key}`;
        let response = await axios.get(url, {
            headers: {
                'Authorization': `token ${this.apiKey}`
            }
        });
        return response.data;
    }

    async getOrganizationRepos(organization) {
        page = 1;
        let hasEndedAllRepositories = false;
        let repositories = [];
        while(!hasEndedAllRepositories){
            let url = `${this.baseUrl}/orgs/${organization.key}/repos?page=${page}`;
            let response = await axios.get(url, {
                headers: {
                    'Authorization': `token ${this.apiKey}`
                }
            });

            if(response.data.length === 0){
                hasEndedAllRepositories = true;
                break;
            }

            repositories.push(...response.data);
            page++;
        }

        return repositories;
    }

    async getOrganizationMembers(organization) {
        let url = `${this.baseUrl}/orgs/${organization.key}/members`;
        let response = await axios.get(url, {
            headers: {
                'Authorization': `token ${this.apiKey}`
            }
        });
        return response.data;
    }

    async getOrganizationTeams(organization) {
        let url = `${this.baseUrl}/orgs/${organization.key}/teams`;
        let response = await axios.get(url, {
            headers: {
                'Authorization': `token ${this.apiKey}`
            }
        });
        return response.data;
    }

    async getOrganizationHooks(organization) {
        let url = `${this.baseUrl}/orgs/${organization.key}/hooks`;
        let response = await axios.get(url, {
            headers: {
                'Authorization': `token ${this.apiKey}`
            }
        });
        return response.data;
    }

    async getOrganizationIssues(organization) {
        let url = `${this.baseUrl}/orgs/${organization.key}/issues`;
        let response = await axios.get(url, {
            headers: {
                'Authorization': `token ${this.apiKey}`
            }
        });
        return response.data;
    }

    async getOrganizationProjects(organization) {
        let url = `${this.baseUrl}/orgs/${organization.key}/projects`;
        let response = await axios.get(url, {
            headers: {
                'Authorization': `token ${this.apiKey}`
            }
        });
        return response.data;
    }

    async getOrganizationMilestones(organization) {
        let url = `${this.baseUrl}/orgs/${organization.key}/milestones`;
        let response = await axios.get(url, {
            headers: {
                'Authorization': `token ${this.apiKey}`
            }
        });
        return response.data;
    }

    async getOrganizationLabels(organization) {
        let url = `${this.baseUrl}/orgs/${organization.key}/labels`;
        let response = await axios.get(url, {
            headers: {
                'Authorization': `token ${this.apiKey}`
            }
        });
        return response.data;
    }

    async getOrganizationReleases(organization) {
        let url = `${this.baseUrl}/orgs/${organization.key}/releases`;
        let response = await axios.get(url, {
            headers: {
                'Authorization': `token ${this.apiKey}`
            }
        });
        return response.data;
    }

    async getOrganizationPackages(organization) {
        let url = `${this.baseUrl}/orgs/${organization.key}/packages`;
        let response = await axios.get(url, {
            headers: {
                'Authorization': `token ${this.apiKey}`
            }
        });
        return response.data;
    }

    async openIssue(organization, issue) {
        let url = `${this.baseUrl}/orgs/${organization.key}/issues`;
        let response = await axios.post(url, issue, {
            headers: {
                'Authorization': `token ${this.apiKey}`
            }
        });
        return response.data;
    }


    
}