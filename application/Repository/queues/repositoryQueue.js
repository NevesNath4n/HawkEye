import client from "../../../infrastructure/supabase/client.js";
import OrganizationRepository from "../../../infrastructure/repositories/OrganizationRepository.js";
import { GitbookLoader } from "@langchain/community/document_loaders/web/gitbook";
import { GithubRepoLoader } from "@langchain/community/document_loaders/web/github";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import axios from "axios";
import { OllamaEmbeddings } from "@langchain/ollama";
import { SupabaseVectorStore } from "@langchain/community/vectorstores/supabase";



async function detectProgrammingLanguage(doc){
    let extension = doc.metadata.source.split('.').pop();
    let mapping = {
        "html": "html",
        "cpp": "cpp",
        "go" : "go",
        "java" : "java",
        "js" : "js",
        "php" : "php",
        "proto" : "proto",
        "py" : "python",
        "rst" : "rst",
        "rb" : "ruby",
        "rust" : "rust",
        "scala" : "scala",
        "swift" : "swift",
        "md": "markdown",
        "latex" : "latex",
        "sol" : "sol"
    }

    return mapping[extension] || undefined;
}




async function proccessDoc(doc,data){
    let programmingLanguage = await detectProgrammingLanguage(doc);
    if(programmingLanguage){
        const splitter = RecursiveCharacterTextSplitter.fromLanguage(programmingLanguage,{
            chunkSize: 200,
            chunkOverlap:0
        });
        const embeddings = new OllamaEmbeddings({
            model: "all-minilm",
            baseUrl:"http://192.168.1.79:8080"
        });

        const vectorStore = new SupabaseVectorStore(embeddings, {
            client: client,
            tableName: "documents",
            queryName: "match_documents",
        });
        let splittedDocs = await splitter.createDocuments([doc.pageContent]);
        let documents = []
        for  (let splittedDoc of splittedDocs){
            documents.push({ pageContent: splittedDoc.pageContent,
                metadata: {...doc.metadata,...splittedDoc.metadata,programmingLanguage,repositoryId:data.id}})

        }
        await vectorStore.addDocuments(documents)
    }

}




async function RepositoryQueue(){
    let {data:repositoryData,error} = await client.schema("pgmq_public").rpc('pop',{
        queue_name:'repository_queue'
    });


    if(error){
        console.log(error)
        return;
    }

    if(repositoryData != null && repositoryData.length == 0){
        return;
    }

    let data = repositoryData[0].message;

    
    

    let apiKey = data.apiKey
    
    if(apiKey == null){
        let organizationRepository = new OrganizationRepository()
        console.log(data)
        let organization =  await organizationRepository.getOrganizationById(data.organizationId)
        apiKey = organization.apiKey
    }
    
    console.log(apiKey)
        
    const loader = new GithubRepoLoader(data.url,{
        accessToken: apiKey,
        ignorePaths:data.ignore.split(","),
        branch:'master',
        unknown: "warn",
        recursive:true,
        maxConcurrency:3
    });

    for await (let doc of loader.loadAsStream()){
        console.log(data);
        await proccessDoc(doc,data)
    }

}


while (true){
    await RepositoryQueue()
    await new Promise(r => setTimeout(r, 1000));
}