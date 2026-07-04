---
title: Frontend Tooling Choices
description: shadcn/ui, TanStack Query, Zustand, and markdown-first content.
order: 3
tags: [frontend, tooling]
published: true
---

# Frontend Tooling Choices

This library is intentionally boring in the best way: **Next.js**, **markdown files**, and a small set of libraries that stay out of the way.

## Stack

- **shadcn/ui** — accessible components I own in the repo
- **TanStack Query** — server state for catalogs and search
- **Zustand** — lightweight UI state (sidebar, last-read chapter)
- **react-markdown** — render chapters without a heavy CMS

## Why markdown?

Markdown diffs cleanly in Git. I do not need a database login to publish. CI can validate links and frontmatter.

## Multi-book structure

Books live under `content/books/`. Some have **parts** (like this one). Others are flat collections of chapters — both are first-class.

The goal is a site that feels like a **library**, not a blog theme — calm typography, clear navigation, and content that ages well.
