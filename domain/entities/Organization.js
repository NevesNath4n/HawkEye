export default class Organization {

    /**
     * Generate an organization provider
     */
    constructor(name,url,key,apiKey,id = "") {
        
        this.name = name;
        this.url = url
        this.apiKey = apiKey
        this.id = id
        this.key = key
        this.repositories = []
    }

    /**
     * Load the repositories of the organization
     * @param {Array} repositoriesData 
     * 
     */

    loadRepositories(repositoriesData){
        this.repositories.push(...repositoriesData);
    }

    /**
     * Check if an given url is from github 
     */
    isGithub() {
        return this.url.includes('github');
    }

    /**
     * Check if an given url is from  azure
     * @returns 
     * 
     */
    isAzure() {
        return this.url.includes('azure');
    }

    /**
     * Check if an given url is valid
     * @param {*} url 
     * @returns boolean
     */
    isValidUrl(url) {
        const urlPattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|'+ // domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
            '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
        return !!urlPattern.test(url);
    }
    


}