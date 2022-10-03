# snippy App

This is the monorepo for snippy which contains the whole source code for the app.

## Project structure

This turborepo uses [pnpm](https://pnpm.io) as a package manager. It contains:

```
apps
 |- web (next.js)
 |- cli (rust)
 |- chrome (extension for chrome in nextjs)
 |- vsc (extension for vscode)

packages
 |- api
     |- tRPC v10 router definition
 |- db
     |- typesafe db-calls using Prisma
 |- config
     |- config for tailwind and radix
 |- primitives
     |- custom components for react

```

## Building

### Prerequisites:

1. Node
1. Docker
1. Pnpm

---

```bash
$ pnpm db:up
$ pnpm db:push
$ pnpm db:generate
```

The command above starts the database (postgres). Pushes the schema and generates the typescript client to be used.

Finally, to start up the web app. Run `pnpm dev` and you're good to go.
