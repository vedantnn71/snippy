import { t } from "../trpc";
import { apiKeyRouter } from "./apiKey";
import { listRouter } from "./list";
import { snippetRouter } from "./snippet";

export const appRouter = t.router({
  list: listRouter,
  snippet: snippetRouter,
  apiKey: apiKeyRouter,
});

export type AppRouter = typeof appRouter;
