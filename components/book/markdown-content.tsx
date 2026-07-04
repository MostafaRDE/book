"use client"

import ReactMarkdown from "react-markdown"
import { Link2 } from "lucide-react"
import remarkGfm from "remark-gfm"
import {
  isValidElement,
  useMemo,
  type ReactNode,
} from "react"

import { CodeBlock } from "@/components/book/code-block"
import { MarkdownImage } from "@/components/book/markdown-image"
import { MermaidDiagram } from "@/components/book/mermaid-diagram"
import { stripFirstH1 } from "@/lib/content/strip-first-h1"
import { slugify } from "@/lib/content/slugify"
import { cn } from "@/lib/utils"

type MarkdownContentProps = {
  content: string
  className?: string
  /** Skip the first h1 — use when the page already renders the chapter title */
  skipFirstH1?: boolean
}

function getTextContent(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") {
    return String(node)
  }
  if (Array.isArray(node)) {
    return node.map(getTextContent).join("")
  }
  if (isValidElement<{ children?: ReactNode }>(node)) {
    return getTextContent(node.props.children)
  }
  return ""
}

function HeadingAnchor({ id }: { id: string }) {
  return (
    <a
      href={`#${id}`}
      className="text-muted-foreground/0 hover:text-muted-foreground ms-2 inline-flex align-middle transition-colors group-hover/heading:text-muted-foreground/60"
      aria-label="Link to section"
    >
      <Link2 className="size-4" />
    </a>
  )
}

function useHeadingIds(content: string) {
  return useMemo(() => {
    const seen = new Map<string, number>()
    const ids = new Map<string, string>()

    for (const line of content.split("\n")) {
      const match = line.match(/^#{1,3}\s+(.+)$/)
      if (!match) continue
      const text = match[1].replace(/\s*#+\s*$/, "").trim()
      const base = slugify(text)
      const count = seen.get(base) ?? 0
      const id = count > 0 ? `${base}-${count}` : base
      seen.set(base, count + 1)
      ids.set(text, id)
    }

    return ids
  }, [content])
}

function extractCodeLanguage(className?: string): string | null {
  if (!className) return null
  const match = className.match(/language-([\w-]+)/)
  return match?.[1] ?? null
}

function findCodeElement(node: ReactNode): React.ReactElement<{
  className?: string
  children?: ReactNode
}> | null {
  if (Array.isArray(node)) {
    for (const child of node) {
      const found = findCodeElement(child)
      if (found) return found
    }
    return null
  }

  if (!isValidElement<{ className?: string; children?: ReactNode }>(node)) {
    return null
  }

  if (extractCodeLanguage(node.props.className)) {
    return node
  }

  return findCodeElement(node.props.children)
}

function isMermaidPre(children: ReactNode): string | null {
  const codeEl = findCodeElement(children)
  if (!codeEl) return null
  if (extractCodeLanguage(codeEl.props.className) !== "mermaid") return null
  return getTextContent(codeEl.props.children).replace(/\n$/, "")
}

export function MarkdownContent({
  content,
  className,
  skipFirstH1 = false,
}: MarkdownContentProps) {
  const processedContent = useMemo(
    () => (skipFirstH1 ? stripFirstH1(content) : content),
    [content, skipFirstH1]
  )
  const headingIds = useHeadingIds(processedContent)

  function resolveId(children: ReactNode) {
    const text = getTextContent(children).trim()
    return headingIds.get(text) ?? slugify(text)
  }

  return (
    <article className={cn("prose-book text-foreground max-w-none", className)}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => {
            const id = resolveId(children)
            return (
              <h1
                id={id}
                className="group/heading scroll-m-24 font-display text-3xl font-normal tracking-tight text-balance sm:text-4xl"
              >
                {children}
                <HeadingAnchor id={id} />
              </h1>
            )
          },
          h2: ({ children }) => {
            const id = resolveId(children)
            return (
              <h2
                id={id}
                className="group/heading scroll-m-24 mt-12 border-b border-border/60 pb-2 font-display text-2xl font-normal tracking-tight first:mt-0"
              >
                {children}
                <HeadingAnchor id={id} />
              </h2>
            )
          },
          h3: ({ children }) => {
            const id = resolveId(children)
            return (
              <h3
                id={id}
                className="group/heading scroll-m-24 mt-8 font-heading text-xl font-semibold tracking-tight"
              >
                {children}
                <HeadingAnchor id={id} />
              </h3>
            )
          },
          h4: ({ children }) => (
            <h4 className="mt-6 text-lg font-semibold tracking-tight">
              {children}
            </h4>
          ),
          p: ({ children }) => (
            <p className="leading-8 text-[1.05rem] [&:not(:first-child)]:mt-5">
              {children}
            </p>
          ),
          ul: ({ children }) => (
            <ul className="my-6 ms-6 list-disc space-y-2 marker:text-primary/70">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="my-6 ms-6 list-decimal space-y-2 marker:text-muted-foreground">
              {children}
            </ol>
          ),
          li: ({ children }) => (
            <li className="leading-7 ps-1">{children}</li>
          ),
          blockquote: ({ children }) => (
            <blockquote className="border-s-2 border-primary/30 bg-muted/30 my-6 rounded-e-xl ps-5 py-1 italic [&:not(:first-child)]:mt-6">
              {children}
            </blockquote>
          ),
          code: ({ className: codeClassName, children, ...props }) => {
            const isBlock = Boolean(codeClassName)
            if (isBlock) {
              return (
                <code className={cn("font-mono", codeClassName)} {...props}>
                  {children}
                </code>
              )
            }
            return (
              <code
                className="bg-muted/80 relative rounded-md border border-border/50 px-1.5 py-0.5 font-mono text-[0.9em] font-medium"
                {...props}
              >
                {children}
              </code>
            )
          },
          pre: ({ children }) => {
            const mermaidChart = isMermaidPre(children)
            if (mermaidChart) {
              return <MermaidDiagram chart={mermaidChart} />
            }
            return <CodeBlock>{children}</CodeBlock>
          },
          img: ({ src, alt, title }) => (
            <MarkdownImage
              src={typeof src === "string" ? src : undefined}
              alt={alt}
              title={title}
            />
          ),
          table: ({ children }) => (
            <div className="my-8 w-full overflow-x-auto rounded-xl border">
              <table className="w-full border-collapse text-sm">{children}</table>
            </div>
          ),
          th: ({ children }) => (
            <th className="bg-muted/50 border-b px-4 py-3 text-start font-medium">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="border-b border-border/50 px-4 py-3 last:border-0">
              {children}
            </td>
          ),
          a: ({ href, children }) => (
            <a
              href={href}
              className="text-primary decoration-primary/30 font-medium underline-offset-4 transition-colors hover:underline"
              target={href?.startsWith("http") ? "_blank" : undefined}
              rel={
                href?.startsWith("http") ? "noopener noreferrer" : undefined
              }
            >
              {children}
            </a>
          ),
          hr: () => <hr className="my-10 border-border/60" />,
          strong: ({ children }) => (
            <strong className="font-semibold text-foreground">{children}</strong>
          ),
        }}
      >
        {processedContent}
      </ReactMarkdown>
    </article>
  )
}
