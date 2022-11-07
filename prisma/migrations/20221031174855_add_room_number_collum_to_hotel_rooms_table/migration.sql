/*
  Warnings:

  - Added the required column `roomNumber` to the `HotelRooms` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "HotelRooms" ADD COLUMN     "roomNumber" INTEGER NOT NULL;
