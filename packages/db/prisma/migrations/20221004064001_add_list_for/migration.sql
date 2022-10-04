-- CreateEnum
CREATE TYPE "ListFor" AS ENUM ('CODE', 'COMMAND');

-- AlterTable
ALTER TABLE "lists" ADD COLUMN     "listFor" "ListFor" NOT NULL DEFAULT 'CODE';
