import Engine from "../Engine/engine.js";
import RagTool from "../Tools/RagTool.js";
import { createOllama } from "ollama-ai-provider";
import { openai } from "@ai-sdk/openai";
import dotenv from "dotenv";


export default class AgentController {

    constructor(model) {
        this.model = model
        this.engine = new Engine();
    }

    async checkForFalsePositives(req,res) {
       
        let {repositoryId,sarifContent} = req.body;
        
        // const vulnerabilities = sarifContent.runs.flatMap(run => run.results || []);

        // if (vulnerabilities.length === 0) {
        //     return res.status(200).json({ message: 'No vulnerabilities found.', repositoryId });
        // }

        let answer = await this.engine.setTool(RagTool)
            //.setModel(openai('gpt-4o-mini'))
            //.setModel(ollama.languageModel('mistral:latest'))
            .setModel(this.model)
            .setSystem('You are an experienced secure code reviewer bot called Marc.ia. ' +
                'Reason step by step. ' +
                'Search code patterns using the RagTool. ' +
                'When you give the final answer, ' +
                'provide a step-by-step explanation for how you arrived at it and where the vulnerabilities in the files and lines are.')
            .setPrompt(JSON.stringify(sarifContent)+`.This is a result from a SAST tool in the repository with id ${repositoryId} check if the result is a false positive or not you can explore the entire repository if needed, provide a remediation solution`)
            .setMaxSteps(20)
            .generateText();
        return res.status(200).send({answer});
    }


   

}