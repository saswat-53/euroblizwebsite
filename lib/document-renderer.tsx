import React from "react"

type TextLeaf = {
  text: string
  bold?: boolean
  italic?: boolean
  underline?: boolean
  strikethrough?: boolean
  code?: boolean
}

type LinkNode = {
  type: "link"
  href: string
  children: InlineNode[]
}

type InlineNode = TextLeaf | LinkNode

type BlockNode =
  | { type: "paragraph"; children: InlineNode[] }
  | { type: "heading"; level: 1 | 2 | 3 | 4 | 5 | 6; children: InlineNode[] }
  | { type: "unordered-list"; children: BlockNode[] }
  | { type: "ordered-list"; children: BlockNode[] }
  | { type: "list-item"; children: BlockNode[] }
  | { type: "list-item-content"; children: InlineNode[] }
  | { type: "blockquote"; children: BlockNode[] }
  | { type: "divider" }
  | { type: string; children?: (InlineNode | BlockNode)[] }

function renderInline(node: InlineNode, key: number): React.ReactNode {
  if ("text" in node) {
    let el: React.ReactNode = node.text
    if (node.bold) el = <strong key={key}>{el}</strong>
    if (node.italic) el = <em key={key}>{el}</em>
    if (node.underline) el = <u key={key}>{el}</u>
    if (node.code) el = <code key={key}>{el}</code>
    return el
  }
  if (node.type === "link") {
    const href = /^(https?:|mailto:|tel:|\/\/)/i.test(node.href)
      ? node.href
      : `https://${node.href}`
    return (
      <a key={key} href={href} target="_blank" rel="noopener noreferrer">
        {node.children.map(renderInline)}
      </a>
    )
  }
  return null
}

function renderBlock(node: BlockNode, key: number): React.ReactNode {
  switch (node.type) {
    case "paragraph":
      return <p key={key}>{(node.children as InlineNode[]).map(renderInline)}</p>
    case "heading":
      return React.createElement(
        `h${node.level}`,
        { key },
        (node.children as InlineNode[]).map(renderInline)
      )
    case "unordered-list":
      return <ul key={key}>{(node.children as BlockNode[]).map(renderBlock)}</ul>
    case "ordered-list":
      return <ol key={key}>{(node.children as BlockNode[]).map(renderBlock)}</ol>
    case "list-item":
      return <li key={key}>{(node.children as BlockNode[]).map(renderBlock)}</li>
    case "list-item-content":
      return <>{(node.children as InlineNode[]).map(renderInline)}</>
    case "blockquote":
      return <blockquote key={key}>{node.children?.map((c, i) => renderBlock(c as BlockNode, i))}</blockquote>
    case "divider":
      return <hr key={key} />
    default:
      return null
  }
}

export function DocumentNodes({ document }: { document: BlockNode[] }) {
  return <>{document.map(renderBlock)}</>
}
