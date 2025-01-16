import { openai } from "@ai-sdk/openai";
import dotenv from "dotenv";
dotenv.config({path:'../../../.env'})
export default openai('gpt-4o-mini')