"use client";
import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Loader2 } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const SAMPLE_CODE = `function calculateTotal(items) {
  let total = 0;
  for (var i = 0; i < items.length; i++) {
    total = total + items[i].price;
  }
  return total;
}

// Example usage
const cart = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 }
];

console.log("Total: " + calculateTotal(cart));
`

export function PromptTestModal({
  prompt,
  open,
  onOpenChange
}) {
  const [code, setCode] = useState(SAMPLE_CODE)
  const [language, setLanguage] = useState("javascript")
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState("")

  const handleTest = () => {
    setIsLoading(true)

    // Simulate API call to test the prompt
    setTimeout(() => {
      // Replace variables in the prompt
      const processedPrompt = prompt.content
        .replace("{code}", code)
        .replace("{language}", language)
        .replace("{repo_name}", "example-repo")

      // Simulate AI response
      const simulatedResponse = `
## Code Review: ${prompt.title}

I've analyzed the provided JavaScript code and found the following issues:

1. **Variable Declaration**: You're using 'var' for the loop counter which has function scope. Consider using 'let' or 'const' for block scoping.

2. **Accumulation Pattern**: Instead of \`total = total + items[i].price\`, you can use the shorthand operator \`total += items[i].price\`.

3. **Modern JavaScript**: Consider using array methods like reduce for better readability:
   \`\`\`javascript
   function calculateTotal(items) {
     return items.reduce((total, item) => total + item.price, 0);
   }
   \`\`\`

4. **String Concatenation**: Instead of using the + operator for string concatenation, consider using template literals:
   \`\`\`javascript
   console.log(\`Total: \${calculateTotal(cart)}\`);
   \`\`\`

These changes would make your code more modern, readable, and maintainable.
      `

      setResult(simulatedResponse)
      setIsLoading(false)
    }, 2000)
  }

  return (
    (<Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Test Prompt: {prompt.title}</DialogTitle>
          <DialogDescription>{prompt.description}</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Prompt Content</h3>
            <div
              className="rounded-md bg-muted p-4 font-mono text-sm overflow-auto max-h-[150px]">
              {prompt.content}
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-medium">Programming Language</h3>
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger>
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="javascript">JavaScript</SelectItem>
                <SelectItem value="typescript">TypeScript</SelectItem>
                <SelectItem value="python">Python</SelectItem>
                <SelectItem value="java">Java</SelectItem>
                <SelectItem value="csharp">C#</SelectItem>
                <SelectItem value="go">Go</SelectItem>
                <SelectItem value="rust">Rust</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-medium">Sample Code</h3>
            <Textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="font-mono min-h-[150px]"
              placeholder="Enter code to test the prompt with..." />
          </div>

          {result && (
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Test Results</h3>
              <Tabs defaultValue="preview">
                <TabsList className="mb-2">
                  <TabsTrigger value="preview">Preview</TabsTrigger>
                  <TabsTrigger value="raw">Raw Response</TabsTrigger>
                </TabsList>
                <TabsContent
                  value="preview"
                  className="rounded-md border p-4 max-h-[300px] overflow-auto">
                  <div
                    className="prose max-w-none dark:prose-invert"
                    dangerouslySetInnerHTML={{
                      __html: result.replace(/\n/g, "<br>").replace(/```(.+?)```/gs, "<pre><code>$1</code></pre>"),
                    }} />
                </TabsContent>
                <TabsContent value="raw">
                  <Textarea value={result} readOnly className="font-mono min-h-[200px]" />
                </TabsContent>
              </Tabs>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
          <Button onClick={handleTest} disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Testing Prompt...
              </>
            ) : (
              "Test Prompt"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>)
  );
}

