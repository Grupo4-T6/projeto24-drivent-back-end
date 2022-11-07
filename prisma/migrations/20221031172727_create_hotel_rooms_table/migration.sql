/*
  Warnings:

  - You are about to drop the column `type` on the `Hotel` table. All the data in the column will be lost.
  - You are about to drop the column `vacancies` on the `Hotel` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Hotel" DROP COLUMN "type",
DROP COLUMN "vacancies";

-- CreateTable
CREATE TABLE "HotelRooms" (
    "id" SERIAL NOT NULL,
    "hotelId" INTEGER NOT NULL,
    "maxOcupation" INTEGER NOT NULL,
    "spacesTaked" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "HotelRooms_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "HotelRooms" ADD CONSTRAINT "HotelRooms_hotelId_fkey" FOREIGN KEY ("hotelId") REFERENCES "Hotel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
