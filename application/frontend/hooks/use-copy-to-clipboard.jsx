"use client"

import { useState, useCallback, useEffect } from "react"

export function useCopyToClipboard(resetInterval = 2000) {
  const [isCopied, setIsCopied] = useState(false)

  const copy = useCallback(async (text) => {
    if (!navigator?.clipboard) {
      console.warn("Clipboard not supported")
      return false
    }

    try {
      await navigator.clipboard.writeText(text)
      setIsCopied(true)
      return true
    } catch (error) {
      console.warn("Copy failed", error)
      setIsCopied(false)
      return false
    }
  }, [])

  useEffect(() => {
    if (isCopied) {
      const timer = setTimeout(() => {
        setIsCopied(false)
      }, resetInterval)
      return () => clearTimeout(timer);
    }
  }, [isCopied, resetInterval])

  return { isCopied, copy }
}

