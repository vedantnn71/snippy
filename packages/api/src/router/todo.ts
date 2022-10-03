import { t } from "../trpc";
import { z } from "zod";

export const todoRouter = t.router({
  all: t.procedure.query(({ ctx }) => {
    return ctx.prisma.todo.findMany();
  }),
  byId: t.procedure.input(z.string()).query(({ ctx, input }) => {
    return ctx.prisma.todo.findFirst({ where: { id: input } });
  }),
});
