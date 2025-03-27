import { openai } from '@ai-sdk/openai';
import dotenv from 'dotenv';
import { generateObject, generateText } from 'ai';
import RagTool from '../Tools/RagTool.js';
import { createOllama, ollama } from 'ollama-ai-provider';

dotenv.config({ path: '../../../.env' });

export default class Engine {
    constructor() {
        this.model = "gpt-4o-mini";
        this.object = {};
    }

    setTool(tool) {
        if (!this.object['tools']) {
            this.object['tools'] = { tool };
        } else {
            this.object['tools'] = { ...this.object['tools'], tool };
        }
        console.log(this.object);
        return this;
    }

    setTools(tools){
        this.object['tools'] = tools;
        return this;
    }

    setModel(model) {
        this.object['model'] = model;
        return this;
    }

    setSystem(system) {
        this.object['system'] = system;
        return this;
    }

    setPrompt(prompt) {
        this.object['prompt'] = prompt;
        return this;
    }

    setMaxSteps(maxSteps) {
        this.object['maxSteps'] = maxSteps;
        return this;
    }

    setMessages(messages) {
        this.object['messages'] = messages;
        return this;
    }

    setSchema(schema) {
        this.object['schema'] = schema;
        return this;
    }
    
    setToolChoice(){
        this.object['toolChoice'] = 'required';
        return this;
    }

    async generateObject(){
        const {object} = await generateObject(this.object);
        return object;
    }

    async generateText() {
        const { text: answer } = await generateText(this.object);
        return answer;
    }

    async generateToolCalls(){
        const {toolCalls} = await generateText(this.object);
        return toolCalls;
    }

    
}
