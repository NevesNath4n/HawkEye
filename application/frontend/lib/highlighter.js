import { createHighlighter,bundledLanguages } from 'shiki'
import shadcnDarkTheme from './darkTheme';
let highlighter = null; 

export default async function getHighlighterInstance() {
    if (!highlighter) {
      highlighter = await createHighlighter({
        theme: [shadcnDarkTheme],
        langs:Object.keys(bundledLanguages),

      });
    }
    return highlighter;
}