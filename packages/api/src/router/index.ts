import { t } from "../trpc";
import { listRouter } from "./list";
import { snippetRouter } from "./snippet";

export const appRouter = t.router({
  list: listRouter,
  snippet: snippetRouter,
});

export type AppRouter = typeof appRouter;
