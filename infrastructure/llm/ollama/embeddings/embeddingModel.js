import {OpenAIEmbeddings} from "@langchain/openai";
import dotenv from "dotenv";
dotenv.config({path:'../../../../.env'})
let baseUrl = process.env.OLLAMA_BASE_URL;
const embeddingModel =  new OpenAIEmbeddings({
        apiKey: process.env.OPENAI_API_KEY,
        model: "text-embedding-3-large",
dimensions:1536
})

export default embeddingModel;