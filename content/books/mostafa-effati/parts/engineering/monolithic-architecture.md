---
title: Monolithic Architecture in Practice
description: Why I still reach for monoliths first, and when to split them apart.
order: 2
tags: [architecture, backend]
published: true
---

# Monolithic Architecture in Practice

Before reaching for microservices, I start with a **well-structured monolith**. Not because distributed systems are bad — but because most products do not need distribution on day one.

## Principles I follow

1. **Clear module boundaries** inside one deployable unit
2. **Shared types** between API and workers where possible
3. **One database** until proven otherwise — with schemas that could split later
4. **Observability from the start** — logs, traces, and health checks are not optional

## When a monolith stops being enough

| Signal | What it usually means |
| --- | --- |
| Independent scaling needs | One subsystem needs 10× the capacity of others |
| Team autonomy | Teams block each other on every release |
| Technology mismatch | A workload needs a different runtime (e.g. GPU, edge) |
| Blast radius | A bug in one area takes down unrelated features |

## Closing thought

A monolith is not a mess by default. A **messy monolith** is. Structure buys you time; premature distribution buys you meetings.
