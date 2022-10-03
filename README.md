<div align="center">
 <img src="https://user-images.githubusercontent.com/70624701/193498987-7685ffab-b60f-4d73-8934-90b2fedd1f49.svg" height="250" width="250">
</div>
<h2 align="center">Snippy - Organize your code snippets and commands</h2>

Snippy helps you in organizing your code snippets and commands, save snippets and commands that you use very often in snippy and then use them in your ide.

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

First of all, start the postgres database server, sync the database with the schema and generate the client to be used:

```bash
$ pnpm db:up
$ pnpm db:push
$ pnpm db:generate
```

Finally, to start web app, cli and the extension in development mode. Run `pnpm dev` and you're good to go.
