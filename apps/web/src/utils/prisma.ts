import { prisma } from "@dive/db";
import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

if (process.env.NODE_ENV !== "production") globalThis.prisma = prisma;

export default prisma;
