/*
  Warnings:

  - You are about to drop the column `enrollmentId` on the `payment` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `payment` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updatedAt` to the `payment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `payment` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "payment" DROP CONSTRAINT "payment_enrollmentId_fkey";

-- DropIndex
DROP INDEX "payment_enrollmentId_key";

-- AlterTable
ALTER TABLE "payment" DROP COLUMN "enrollmentId",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "userId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "payment_userId_key" ON "payment"("userId");

-- AddForeignKey
ALTER TABLE "payment" ADD CONSTRAINT "payment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
