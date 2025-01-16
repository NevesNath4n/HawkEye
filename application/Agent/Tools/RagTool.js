import {z} from 'zod';
import {tool} from 'ai';
import client from "../../../infrastructure/supabase/client.js";
import axios from 'axios';
import { OllamaEmbeddings } from "@langchain/ollama";
import { SupabaseVectorStore } from "@langchain/community/vectorstores/supabase";
async function executeQuery({query,filters}){
    
    const embeddings = new OllamaEmbeddings({
        model: "all-minilm",
        baseUrl:"http://192.168.1.79:8080"
    });

    const vectorStore = new SupabaseVectorStore(embeddings, {
        client: client,
        tableName: "documents",
        queryName: "match_documents",
    });
    console.log(query)
    console.log(filters)
    const similaritySearchResults  = await vectorStore.similaritySearch(query,10,filters)
    console.log(similaritySearchResults)
    return similaritySearchResults;

}


let RagTool = tool({
    description: 'A tool for searching for code patterns in an given repository with an integer id to identify potential vulnerabilities' +
                'Example queries: '+
                "'.select(', .innerHTML = ",
    parameters: z.object({
        query: z.string().describe('The code pattern to search for'),
        filters: z.object({
            repositoryId: z.number().optional().describe('The id of the repository to search in'),
            source: z.string().optional().describe('The path to the file in the repository'),
            programmingLanguage: z.string().optional().describe('The programming language of the file'),
        }).describe('Filters to narrow down the search')
    }),
    execute:executeQuery 
})


export default RagTool; 