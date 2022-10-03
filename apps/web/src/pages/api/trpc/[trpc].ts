import { createNextApiHandler } from "@trpc/server/adapters/next";
import { appRouter, createContext } from "@snippy/api";

// export API handler
export default createNextApiHandler({
  router: appRouter,
  createContext: createContext,
});

export const config = {
  runtime: "nodejs",
};
