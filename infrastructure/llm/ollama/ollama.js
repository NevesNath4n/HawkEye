import { createOllama } from "ollama-ai-provider";
import dotenv from "dotenv";
dotenv.config({path:'../../../.env'})
export default createOllama({baseURL:process.env.OLLAMA_BASE_URL+"/api"})
