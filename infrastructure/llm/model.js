import dotenv from 'dotenv';
import openai from './openai/openai.js';
import ollama from './ollama/ollama.js';
dotenv.config({ path: '../../.env' });
let model = openai
if(process.env.MODEL_TYPE == "ollama"){
    model = ollama
}
export default model
