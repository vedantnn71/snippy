import { Context } from "../context";

export const getUserId = async (ctx: Context) => {
  const { prisma } = ctx;
  const { session } = ctx;

  if (!session) {
    throw new Error("Not authenticated");
  }

  const email = session?.user?.email!;
  const user = await prisma.user.findUnique({ where: { email } });

  return user?.id;
};
