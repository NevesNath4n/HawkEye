import Engine from "../Engine/engine.js";
import RagTool from "../Tools/RagTool.js";
import { createOllama } from "ollama-ai-provider";
import { openai } from "@ai-sdk/openai";
import dotenv from "dotenv";
import {z} from "zod";
import FalsePositiveAnswer from "../Tools/FalsePositiveTool.js";
import Marcia from "../Engine/Marcia.js";

export default class AgentController {

    constructor(model) {
        this.model = model
        this.engine = new Engine();
        this.marcia = new Marcia();
    }


    async receivePullRequest(req, res) {
        
    }

    async checkForFalsePositives(req,res) {
       
        let {repositoryId,sarifContent} = req.body;
        
        // const vulnerabilities = sarifContent.runs.flatMap(run => run.results || []);

        // if (vulnerabilities.length === 0) {
        //     return res.status(200).json({ message: 'No vulnerabilities found.', repositoryId });
        // }

        console.log(sarifContent);


       

        let answer = await this.marcia.getStructuredResponse([{content:JSON.stringify(sarifContent)+`. Descubra se essa vulnerabilidade reportada pelo semgrep é ou não um falso positivo.

            Análise Detalhada de Potencial Vulnerabilidade de Segurança
            Objetivo
            Realizar uma avaliação técnica e abrangente para determinar a real exploitabilidade de um padrão de código potencialmente vulnerável.

            Escopo da Análise de Segurança
            1. Análise de Sanitização e Validação
            Investigar exaustivamente todas as ocorrências de sanitização ou validação de entrada
            Mapear pontos de entrada e tratamento da variável no código fonte
            Identificar mecanismos de filtragem, escape ou validação existentes
            2. Análise Contextual do Repositório
            Examinar o contexto arquitetural e de segurança do projeto
            Identificar controles de segurança implementados
            Avaliar mecanismos de defesa em camadas adjacentes
            3. Correlação de Padrões
            Realizar busca por padrões correlatos de código potencialmente vulnerável
            Estabelecer relações entre diferentes trechos de código
            Validar consistência dos potenciais pontos de risco
            Metodologia de Avaliação
            Desenvolver uma pontuação de risco percentual (0-100%)
            Fundamentar avaliação em evidências concretas
            Detalhar critérios utilizados na pontuação
            Entregável Esperado
            Relatório técnico composto por:
            Descrição técnica da vulnerabilidade
            Evidências encontradas
            Pontuação percentual de exploitabilidade
            Recomendações de mitigação (se aplicável)
            Observações Importantes
            Priorizar análise técnica objetiva
            Considerar contexto específico do repositório
            Evitar especulações sem base técnica`,role:"user"}],repositoryId);
        return res.status(200).send({answer});
    }


   

}