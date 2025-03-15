export function extractCodeBlocks(content) {
  const codeBlocks = []
  let placeholderIndex = 0
  const renderedContent = content.replace(/```(\w+)?\n([\s\S]*?)```/g, (match, language, code) => {
    const placeholder = `CODE_BLOCK_${placeholderIndex++}`
    codeBlocks.push({ code: code.trim(), language: language || "", placeholder })
    return placeholder
  })

  return { content: renderedContent, codeBlocks }
}

