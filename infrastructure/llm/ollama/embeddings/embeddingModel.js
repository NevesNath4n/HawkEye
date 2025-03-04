import { OllamaEmbeddings } from "@langchain/ollama";
import dotenv from "dotenv";
dotenv.config({path:'../../../../.env'})
let baseUrl = process.env.OLLAMA_BASE_URL;
const embeddingModel = new OllamaEmbeddings({
        model: "all-minilm",
        baseUrl
});

export default embeddingModel;