/*
  Warnings:

  - You are about to drop the column `listFor` on the `lists` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "lists" DROP COLUMN "listFor",
ADD COLUMN     "isCommandList" BOOLEAN NOT NULL DEFAULT false;

-- DropEnum
DROP TYPE "ListFor";
