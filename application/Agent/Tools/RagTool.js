import {z} from 'zod';
import {tool} from 'ai';
import client from "../../../infrastructure/supabase/client.js";
import { SupabaseVectorStore } from "@langchain/community/vectorstores/supabase";
import embeddingModel from '../../../infrastructure/llm/ollama/embeddings/embeddingModel.js';
async function executeQuery({query,filters}){
    
    const vectorStore = new SupabaseVectorStore(embeddingModel, {
        client: client,
        tableName: "documents",
        queryName: "match_documents",
    });
    console.log(query)
    console.log(filters)
    const similaritySearchResults  = await vectorStore.similaritySearch(query,50,filters)
    console.log(similaritySearchResults)
    return similaritySearchResults;

}


let RagTool = tool({
    description: 'A tool for detecting potential vulnerabilities by searching for specific code patterns within a repository. ' +
                 'For example, you can look for patterns like ".select(" or ".innerHTML = " to pinpoint areas of risk.',
    parameters: z.object({
        query: z.string().describe('The code pattern to search for (e.g., ".select(" or ".innerHTML = ").'),
        filters: z.object({
            repositoryId: z.number().optional().describe('The unique repository ID where the search will be conducted.'),
            source: z.string().optional().describe('The file path within the repository to limit the search.'),
            programmingLanguage: z.string().optional().describe('The programming language of the source file, to refine search results.')
        }).describe('Optional filters to narrow down the search scope.')
    }),
    execute: executeQuery
})


export default RagTool; 