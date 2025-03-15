import { openai } from '@ai-sdk/openai';
import dotenv from 'dotenv';
import { generateText } from 'ai';
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



    async generateText() {
        const { text: answer } = await generateText(this.object);
        return answer;
    }

    
}
