"use client";
import { useRef, useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { CodeBlock } from "./code-block"
import { Clipboard, X } from "lucide-react"
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard"
import { Resizable } from "re-resizable"

export function CodeBlockModal({
  isOpen,
  onClose,
  code,
  language
}) {
  const { copy, isCopied } = useCopyToClipboard()
  const [size, setSize] = useState({ width: "90vw", height: "80vh" })
  const isMobile = useRef(false)

  useEffect(() => {
    const checkMobile = () => {
      isMobile.current = window.innerWidth < 768
      if (isMobile.current) {
        setSize({ width: "95vw", height: "70vh" })
      } else {
        setSize({ width: "90vw", height: "80vh" })
      }
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile);
  }, [])

  const handleCopy = () => {
    copy(code)
  }

  return (
    (<Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="p-0 max-w-[95vw] w-auto max-h-[95vh] h-auto">
        <Resizable
          size={size}
          minWidth="300px"
          minHeight="300px"
          maxWidth="95vw"
          maxHeight="95vh"
          onResizeStop={(e, direction, ref, d) => {
            setSize({
              width: size.width + d.width,
              height: size.height + d.height,
            })
          }}
          enable={{
            top: !isMobile.current,
            right: !isMobile.current,
            bottom: !isMobile.current,
            left: !isMobile.current,
            topRight: !isMobile.current,
            bottomRight: !isMobile.current,
            bottomLeft: !isMobile.current,
            topLeft: !isMobile.current,
          }}
          className="overflow-hidden flex flex-col">
          <DialogHeader className="flex flex-row items-center justify-between p-4 border-b">
            <DialogTitle className="text-lg">{language || "Code"}</DialogTitle>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleCopy}
                className="flex items-center gap-1">
                <Clipboard className="h-4 w-4" />
                {isCopied ? "Copied!" : "Copy"}
              </Button>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </DialogHeader>
          <div className="flex-1 overflow-auto">
            <CodeBlock code={code} language={language} />
          </div>
        </Resizable>
      </DialogContent>
    </Dialog>)
  );
}

