import React, { createContext, useContext, useState, useEffect } from "react";
import getHighlighterInstance from "@/lib/highlighter";

const HighlighterContext = createContext(null);

export const HighlighterProvider = ({ children }) => {
  const [highlighter, setHighlighter] = useState(null);

  useEffect(() => {
    async function loadHighlighter() {
      const highlighterInstance = await getHighlighterInstance();
      setHighlighter(highlighterInstance);
    }
    loadHighlighter();
  }, []);

  return (
    <HighlighterContext.Provider value={highlighter}>
      {children}
    </HighlighterContext.Provider>
  );
};

export const useHighlighter = () => {
  return useContext(HighlighterContext);
};