import Image from "next/image"

import { cn } from "@/lib/utils"

type MarkdownImageProps = {
  src?: string
  alt?: string
  title?: string
  className?: string
}

export function MarkdownImage({ src, alt, title, className }: MarkdownImageProps) {
  if (!src) return null

  const isExternal = src.startsWith("http://") || src.startsWith("https://")
  const isLocal = src.startsWith("/")

  return (
    <figure className="my-8">
      <div className="overflow-hidden rounded-xl border border-border/60 bg-muted/20 shadow-sm">
        {isLocal ? (
          <Image
            src={src}
            alt={alt ?? title ?? ""}
            width={1200}
            height={675}
            className={cn("h-auto w-full object-cover", className)}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 960px"
          />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={src}
            alt={alt ?? title ?? ""}
            loading="lazy"
            decoding="async"
            className={cn("h-auto w-full object-cover", className)}
            referrerPolicy={isExternal ? "no-referrer" : undefined}
          />
        )}
      </div>
      {(alt || title) && alt !== title ? (
        <figcaption className="text-muted-foreground mt-2 text-center text-sm">
          {title ?? alt}
        </figcaption>
      ) : null}
    </figure>
  )
}
