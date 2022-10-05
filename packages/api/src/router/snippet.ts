import { t } from "../trpc";
import { z } from "zod";
import { getUserId } from "../utils";

export const snippetRouter = t.router({
  all: t.procedure.input(z.string()).query(({ ctx, input }) => {
    return ctx.prisma.snippet.findMany({ where: { listId: input } });
  }),

  byId: t.procedure.input(z.string()).query(({ ctx, input }) => {
    return ctx.prisma.snippet.findUnique({ where: { id: input } });
  }),

  add: t.procedure
    .input(
      z.object({
        name: z.string(),
        icon: z.string(),
        mode: z.enum(["snippet", "command"]).optional().default("snippet"),
        description: z.string().optional(),
        code: z.string(),
        listId: z.string(),
        language: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { name, icon, mode, description, code, listId, language } = input;
      const userId = (await getUserId(ctx)) as string;
      const isCommand = mode === "command";

      return ctx.prisma.snippet.create({
        data: {
          name,
          icon,
          description,
          code,
          isCommand,
          listId,
          userId,
          language,
        },
      });
    }),

  update: t.procedure
    .input(
      z.object({
        id: z.string(),
        name: z.string().optional(),
        icon: z.string().optional(),
        mode: z.enum(["snippet", "command"]).optional().default("snippet").optional(),
        description: z.string().optional(),
        code: z.string().optional(),
        listId: z.string().optional(),
        language: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id, name, icon, mode, description, code, listId, language } = input;
      const userId = (await getUserId(ctx)) as string;
      const isCommand = mode === "command";

      return ctx.prisma.snippet.update({
        where: { id },
        data: {
          name,
          icon,
          description,
          code,
          isCommand,
          listId,
          userId,
          language,
        },
      });
    }),

  delete: t.procedure.input(z.string()).mutation(async ({ ctx, input }) => {
    const userId = (await getUserId(ctx)) as string;
    return ctx.prisma.snippet.delete({ where: { id: input } });
  }),

});