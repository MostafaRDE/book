"use client"

import { Check, Copy } from "lucide-react"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { useTranslations } from "@/hooks/use-translations"
import { cn } from "@/lib/utils"

type CodeBlockProps = {
  children: React.ReactNode
  className?: string
}

function extractText(node: React.ReactNode): string {
  if (typeof node === "string") return node
  if (Array.isArray(node)) return node.map(extractText).join("")
  if (node && typeof node === "object" && "props" in node) {
    const props = node.props as { children?: React.ReactNode }
    return extractText(props.children)
  }
  return ""
}

export function CodeBlock({ children, className }: CodeBlockProps) {
  const t = useTranslations()
  const [copied, setCopied] = useState(false)
  const code = extractText(children).replace(/\n$/, "")

  async function handleCopy() {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="group/code relative my-6">
      <div className="absolute end-2 top-2 z-10 opacity-100 transition-opacity sm:opacity-0 sm:group-hover/code:opacity-100">
        <Button
          type="button"
          variant="secondary"
          size="icon-xs"
          onClick={handleCopy}
          aria-label={copied ? t.copied : t.copyCode}
        >
          {copied ? <Check className="size-3" /> : <Copy className="size-3" />}
        </Button>
      </div>
      <pre
        className={cn(
          "code-block overflow-x-auto rounded-xl border border-border/60 bg-muted/50 p-4 text-[0.8125rem] leading-relaxed shadow-sm backdrop-blur-sm",
          className
        )}
        dir="ltr"
      >
        {children}
      </pre>
    </div>
  )
}
