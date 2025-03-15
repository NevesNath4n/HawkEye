import React from "react";
import { Card } from "./ui/card";


export default function ChatStartPage({promptSuggestions,selectedPrompt,handlePromptClick}){
    return(
        <main className="flex-1 overflow-auto p-6 flex flex-col items-center justify-center">
            <div className="max-w-3xl w-full space-y-8">
                <div className="text-center space-y-2">
                <h1 className="text-3xl font-bold tracking-tight">Start a conversation</h1>
                <p className="text-muted-foreground">Choose a prompt suggestion or type your own message to begin</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {promptSuggestions.map((suggestion, index) => (
                    <Card
                    key={index}
                    className={`p-4 cursor-pointer transition-all hover:border-primary/50 hover:shadow-md ${
                        selectedPrompt === suggestion.prompt ? "border-primary ring-1 ring-primary" : ""
                    }`}
                    onClick={() => handlePromptClick(suggestion.prompt)}
                    >
                    <div className="flex items-start gap-3">
                        <div>
                        <h3 className="font-medium">{suggestion.title}</h3>
                        <p className="text-sm text-muted-foreground">{suggestion.description}</p>
                        </div>
                    </div>
                    </Card>
                ))}
                </div>
            </div>
        </main>
    )
}