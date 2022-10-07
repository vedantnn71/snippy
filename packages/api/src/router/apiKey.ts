import { t } from "../trpc";
import { z } from "zod";
import { getUserId } from "../utils";
import cuid from "cuid";

export const apiKeyRouter = t.router({
  byId: t.procedure
    .input(
      z.object({
        apiKey: z.string(),
      })
    )
    .query(({ ctx, input }) => {
      const { apiKey } = input;
      return ctx.prisma.user.findUnique({ where: { apiKey } });
    }),

  byUserId: t.procedure.query(async ({ ctx }) => {
    const userId = await getUserId(ctx);
    const user = await ctx.prisma.user.findUnique({
      where: { id: userId },
    });

    return user?.apiKey;
  }),

  regenerate: t.procedure.mutation(async ({ ctx }) => {
    const user = await getUserId(ctx);
    const apiKey = cuid();

    await ctx.prisma.user.update({
      where: { id: user },
      data: { apiKey },
    });

    return apiKey;
  }),
});
