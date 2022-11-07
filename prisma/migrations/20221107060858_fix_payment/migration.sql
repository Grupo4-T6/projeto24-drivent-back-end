/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `payment` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `payment` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "payment" DROP CONSTRAINT "payment_enrollmentId_fkey";

-- DropIndex
DROP INDEX "payment_enrollmentId_key";

-- AlterTable
ALTER TABLE "payment" ADD COLUMN     "userId" INTEGER NOT NULL,
ALTER COLUMN "enrollmentId" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "payment_userId_key" ON "payment"("userId");

-- AddForeignKey
ALTER TABLE "payment" ADD CONSTRAINT "payment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payment" ADD CONSTRAINT "payment_enrollmentId_fkey" FOREIGN KEY ("enrollmentId") REFERENCES "enrollment"("id") ON DELETE SET NULL ON UPDATE CASCADE;
