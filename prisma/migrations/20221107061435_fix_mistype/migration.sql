/*
  Warnings:

  - You are about to drop the column `enrollmentId` on the `payment` table. All the data in the column will be lost.
  - Added the required column `Total` to the `payment` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "payment" DROP CONSTRAINT "payment_enrollmentId_fkey";

-- AlterTable
ALTER TABLE "payment" DROP COLUMN "enrollmentId",
ADD COLUMN     "Total" INTEGER NOT NULL;
