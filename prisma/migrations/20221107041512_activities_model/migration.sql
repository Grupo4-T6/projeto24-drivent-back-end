-- CreateEnum
CREATE TYPE "activityTypes" AS ENUM ('MAIN', 'SIDE', 'WORKSHOP');

-- CreateTable
CREATE TABLE "activities" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "slots" INTEGER NOT NULL DEFAULT 30,
    "day" TIMESTAMP(3) NOT NULL,
    "activityType" "activityTypes" NOT NULL,
    "users" INTEGER[],
    "startsAt" TEXT NOT NULL,
    "endsAt" TEXT NOT NULL,

    CONSTRAINT "activities_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "activities_day_idx" ON "activities"("day");
