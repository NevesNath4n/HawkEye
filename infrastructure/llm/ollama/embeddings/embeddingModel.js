 //TODO FIX THIS TO USE IT AS A SINGLE INSTANCE FOR THE ENTIRE PROJECT
 
 const embeddings = new OllamaEmbeddings({
        model: "all-minilm",
        baseUrl:"http://192.168.1.79:8080"
    });