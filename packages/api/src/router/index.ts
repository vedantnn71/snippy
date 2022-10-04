import { t } from "../trpc";
import { listRouter } from "./list";

export const appRouter = t.router({
  list: listRouter,
});

export type AppRouter = typeof appRouter;
