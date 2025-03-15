"use client";

import React, { useState, useEffect, useCallback, memo } from "react";
import Markdown from "react-markdown";
import { Card, CardContent, CardHeader } from "./ui/card";
import darkTheme from "@/lib/darkTheme";
import { useHighlighter } from "@/lib/context/highlighter/highlighterProvider";
import dynamic from "next/dynamic";
import { Copy, Edit, Check, X } from "lucide-react";
import { Button } from "./ui/button";
import { Sidebar, SidebarContent, SidebarHeader, SidebarProvider } from "@/components/ui/sidebar";

const MonacoEditor = dynamic(() => import("@monaco-editor/react"), {
  ssr: false,
  loading: () => <p className="p-4">Loading editor...</p>,
});

// Extract EditorSidebar as a separate, memoized component.
const EditorSidebar = memo(({ language, editorContent, onChange, isOpen, onClose }) => {
  if (!isOpen) return null;
  return (
    <SidebarProvider defaultOpen={true}>
      <div
        className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
        onClick={onClose}
      />
      <Sidebar
        side="right"
        className="fixed right-0 top-0 z-50 h-full w-[70vw] border-l shadow-xl"
        collapsible="none"
      >
        <SidebarHeader className="flex items-end justify-between p-4 border-b">
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="h-8 w-8"
          >
            <X className="h-4 w-4" />
          </Button>
        </SidebarHeader>
        <SidebarContent className="p-0">
          <div className="h-[calc(100vh-4rem)]">
            <MonacoEditor
              height="100%"
              language={language}
              theme="vs-dark"
              value={editorContent}
              onChange={(value) => onChange(value || "")}
              options={{
                minimap: { enabled: false },
                scrollBeyondLastLine: false,
                fontSize: 14,
              }}
            />
          </div>
        </SidebarContent>
      </Sidebar>
    </SidebarProvider>
  );
});

const CodeBlock = ({ node, inline, className, children, ...props }) => {
  const [html, setHtml] = useState("");
  const [copied, setCopied] = useState(false);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editorContent, setEditorContent] = useState("");
  const [code, setCode] = useState(String(children).replace(/\n$/, ""));
  // Extract language from className, e.g., language-js or language-python.
  const match = /language-(\w+)/.exec(className || "");
  const language = match ? match[1] : "plaintext";
  const highlighter = useHighlighter();

  // If language is plaintext, simply render inline.
  if (language === "plaintext") {
    return <span>{children}</span>;
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  // Effect for generating highlighted HTML.
  useEffect(() => {
    if (!inline && highlighter) {
      async function loadHighlighter() {
        try {
          // Load theme if necessary
          await highlighter.loadTheme(darkTheme);
          const highlighted = await highlighter.codeToHtml(code, {
            theme: "shadcn-dark",
            lang: language,
          });
          setHtml(highlighted);
        } catch (error) {
          console.error("Error loading Shiki highlighter:", error);
        }
      }
      loadHighlighter();
    }
  }, [code, language, inline, highlighter]);

  // Set the initial editor content only once when the source code changes.
  useEffect(() => {
    setEditorContent(code);
  }, [code]);

  // Fallback for inline code.
  if (inline) {
    return (
      <code className={className} {...props}>
        {children}
      </code>
    );
  }

  // While the highlighter is loading, fallback to a simple preformatted block.
  if (!html) {
    return (
      <pre className="bg-gray-800 text-white p-4 rounded overflow-x-auto">
        <code>{code}</code>
      </pre>
    );
  }

  return (
    <>
      <Card className="m-4" style={{ backgroundColor: "#111827" }}>
        <CardHeader className="flex flex-row items-center justify-between py-2 px-4">
          <div className="text-xs text-gray-400">{language}</div>
          <div className="flex space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={copyToClipboard}
              className="h-8 w-8 text-gray-400 hover:text-white"
            >
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsEditorOpen(true)}
              className="h-8 w-8 text-gray-400 hover:text-white"
            >
              <Edit className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="">
          <div
            className="overflow-x-auto overflow-y-auto  text-xs"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </CardContent>
      </Card>
      <EditorSidebar
        language={language}
        editorContent={editorContent}
        onChange={setEditorContent}
        isOpen={isEditorOpen}
        onClose={() =>{setIsEditorOpen(false);setCode(editorContent)}}
      />
    </>
  );
};

const MarkdownRenderer = ({ children }) => {
  return (
    <div className="markdown-content">
      <Markdown
        components={{
          code: CodeBlock,
        }}
      >
        {children}
      </Markdown>
    </div>
  );
};

export default MarkdownRenderer;
