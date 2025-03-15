import client from "../../../infrastructure/supabase/client.js";
import OrganizationRepository from "../../../infrastructure/repositories/OrganizationRepository.js";
import { GithubRepoLoader } from "@langchain/community/document_loaders/web/github";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { OpenAIEmbeddings } from "@langchain/openai";
import { SupabaseVectorStore } from "@langchain/community/vectorstores/supabase";
import dotenv from "dotenv";
dotenv.config({ path: "../../../.env" });

async function detectProgrammingLanguage(doc) {
  let extension = doc.metadata.source.split('.').pop();
  const mapping = {
    html: "html",
    cpp: "cpp",
    go: "go",
    java: "java",
    js: "js",
    php: "php",
    proto: "proto",
    py: "python",
    rst: "rst",
    rb: "ruby",
    rust: "rust",
    scala: "scala",
    swift: "swift",
    md: "markdown",
    latex: "latex",
    sol: "sol",
  };
  return mapping[extension] || undefined;
}

async function processRepository(data) {
  // Determine the API key
  let apiKey = data.apiKey;
  if (!apiKey) {
    const organizationRepository = new OrganizationRepository();
    const organization = await organizationRepository.getOrganizationById(data.organizationId);
    apiKey = organization.apiKey;
  }
  console.log("Using API key:", apiKey);

  // Initialize the GitHub repo loader with the desired options.
  const loader = new GithubRepoLoader(data.url, {
    accessToken: apiKey,
    ignorePaths: data.ignore.split(","),
    branch: "master", // LOAD ALL BRANCHES
    unknown: "warn",
    recursive: true,
    maxConcurrency: 3,
  });

  // Collect all documents from the loader stream.
  const docs = [];
  for await (let doc of loader.loadAsStream()) {
    docs.push(doc);
  }

  // Create embeddings and vector store once per repository.
  const embeddings = new OpenAIEmbeddings({
    apiKey: process.env.OPENAI_API_KEY,
    model: "text-embedding-3-large",
    dimensions: 1536,
  });
  const vectorStore = new SupabaseVectorStore(embeddings, {
    client: client,
    tableName: "documents",
    queryName: "match_documents",
  });

  // Process each document in parallel.
  await Promise.all(
    docs.map(async (doc) => {
      const programmingLanguage = await detectProgrammingLanguage(doc);
      console.log(programmingLanguage)
      if (programmingLanguage) {
        const splitter = RecursiveCharacterTextSplitter.fromLanguage(programmingLanguage, {
          chunkSize: 1000,
          chunkOverlap: 20,
        });
        const splittedDocs = await splitter.createDocuments([doc.pageContent]);
        const documents = splittedDocs.map((splittedDoc) => ({
          pageContent: splittedDoc.pageContent,
          metadata: {
            ...doc.metadata,
            ...splittedDoc.metadata,
            programmingLanguage,
            repositoryId: data.id,
          },
        }));
        if (documents.length > 0) {
          await vectorStore.addDocuments(documents);
        }
      }
    })
  );
}

async function RepositoryQueue() {
  const { data: repositoryData, error } = await client
    .schema("pgmq_public")
    .rpc("pop", {
      queue_name: "repository_queue",
    });

  if (error) {
    console.log("Error popping from queue:", error);
    return;
  }
  if (repositoryData == null || repositoryData.length === 0) {
    return;
  }

  const data = repositoryData[0].message;
  await processRepository(data);
}

while (true) {
  await RepositoryQueue();
  // Adjust the delay as needed.
  console.log("Finished...");
  await new Promise((resolve) => setTimeout(resolve, 1000));
}
