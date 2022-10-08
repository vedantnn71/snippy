import { t } from "../trpc";
import { z } from "zod";
import { getUserId } from "../utils";

export const listRouter = t.router({
  all: t.procedure.query(({ ctx }) => {
    return ctx.prisma.list.findMany();
  }),

  byId: t.procedure.input(z.string()).query(({ ctx, input }) => {
    return ctx.prisma.list.findUnique({ where: { id: input } });
  }),

  add: t.procedure
    .input(
      z.object({
        name: z.string(),
        mode: z.enum(["snippets", "commands"]).optional().default("snippets"),
        icon: z.string().optional(),
        alias: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { name, icon, mode, alias } = input;
      const userId = (await getUserId(ctx)) as string;

      if (name === "") {
        return new Error("Name is required");
      }

      if (icon === "") {
        return new Error("Icon is required");
      }

      const isCommandList = mode === "commands";

      return ctx.prisma.list.create({
        data: {
          name,
          icon,
          userId,
          isCommandList,
          alias,
        },
      });
    }),

  update: t.procedure
    .input(
      z.object({
        id: z.string(),
        name: z.string().optional(),
        icon: z.string().optional(),
        alias: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id, name, icon, alias } = input;
      const toUpdate: {
        name?: string;
        icon?: string;
        alias?: string;
      } = {};

      if (name) {
        toUpdate["name"] = name;
      }

      if (icon) {
        toUpdate["icon"] = icon;
      }

      if (alias) {
        toUpdate["alias"] = alias;
      }

      return ctx.prisma.list.update({
        where: { id },
        data: toUpdate,
      });
    }),

  delete: t.procedure.input(z.string()).mutation(async ({ ctx, input }) => {
    return ctx.prisma.list.delete({
      where: { id: input },
    });
  }),
});
