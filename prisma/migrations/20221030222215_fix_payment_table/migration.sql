/*
  Warnings:

  - You are about to drop the column `userId` on the `payment` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[enrollmentId]` on the table `payment` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `enrollmentId` to the `payment` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "payment" DROP CONSTRAINT "payment_userId_fkey";

-- DropIndex
DROP INDEX "payment_userId_key";

-- AlterTable
ALTER TABLE "payment" DROP COLUMN "userId",
ADD COLUMN     "enrollmentId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "payment_enrollmentId_key" ON "payment"("enrollmentId");

-- AddForeignKey
ALTER TABLE "payment" ADD CONSTRAINT "payment_enrollmentId_fkey" FOREIGN KEY ("enrollmentId") REFERENCES "enrollment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
