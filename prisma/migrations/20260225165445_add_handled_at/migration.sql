/*
  Warnings:

  - You are about to drop the `Admin` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "ContactSubmission" ADD COLUMN     "handledAt" TIMESTAMP(3);

-- DropTable
DROP TABLE "Admin";
