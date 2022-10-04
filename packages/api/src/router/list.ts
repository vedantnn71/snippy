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

  add: t.procedure.input(
    z
      .object({
        name: z.string(),
        mode: z.enum(["code", "command"]).optional().default("code"),
        icon: z.string().optional()
      })
  ).mutation(async ({ ctx, input }) => {
    const { name, icon, mode } = input;
    const userId = await getUserId(ctx) as string;

    if (name === "") {
      return new Error("Name is required");
    }

    if (icon === "") {
      return new Error("Icon is required");
    }

    const isCommandList = mode === "command";

    return ctx.prisma.list.create({
      data: {
        name,
        icon,
        userId,
        isCommandList
      }
    });
  }),

  update: t.procedure.input(
    z
      .object({
        id: z.string(),
        name: z.string(),
        icon: z.string().optional()
      })
  ).mutation(async ({ ctx, input }) => {
    const { id, name, icon } = input;
    const userId = await getUserId(ctx) as string;

    return ctx.prisma.list.update({
      where: { id },
      data: {
        name,
        icon
      }
    });
  }),

  delete: t.procedure.input(z.string()).mutation(async ({ ctx, input }) => {
    const userId = await getUserId(ctx) as string;

    return ctx.prisma.list.delete({
      where: { id: input }
    });
  }),
});