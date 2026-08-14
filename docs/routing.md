# Learner hub routing

## Decision

Use **Vite multi-page static HTML** at the existing directory URLs, with **relative `base: './'`**.

Do not use Admin hash routing for learner hubs.

## Compared options

| Model | Learner URLs | GitHub Pages refresh | Notes |
| --- | --- | --- | --- |
| Hash SPA (`#/weeks/week-1`) | Breaks current links | Works | Fine for Admin; wrong for public teaching URLs |
| SPA + `404.html` fallback | Can work | Fragile | Extra GitHub Pages assumption; worse for crawlers |
| Absolute `base: /repo-name/` SPA | Works if the repo name is known | Needs fallback or copies | Couples the hub to one Pages URL |
| **MPA + shared React entry + `base: './'`** | **Preserved** | **Native `index.html`** | **Chosen** |

## How it works

Each public route is a directory with `index.html` that mounts the same React application and sets `data-page`, `data-section` and `data-root`. Vite rewrites module URLs to relative asset paths. GitHub Pages serves those files with no server rewrite.

Relative `data-root` keeps nested pages self-contained (`../../content/unit-14/`) without baking the repository name into links.

## What must not change

- Week and assignment directory URLs
- Curriculum JSON fetch paths
- Auth/account routes
- Static output after `vite build`
