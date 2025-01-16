export default class Repository{
    /**
     * A class to represent repository entity
     */
    constructor(name,slug,url,repositoryId,organization,ignore = [],id = "") {
        
        this.name = name;
        this.slug = slug;
        this.url = url;
        this.id = id;
        this.repositoryId = repositoryId;
        this.organization = organization;
        this.ignore = ignore;
        this.files = [];
    }


    /**
     * Load the files of the repository
     * @param {Array} filesData 
     */

    loadFiles(filesData){
        this.files.push(...filesData);

    }


}