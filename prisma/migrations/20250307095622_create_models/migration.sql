/*
  Warnings:

  - You are about to drop the column `reccomendedSkills` on the `IndustryInsight` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "IndustryInsight" DROP COLUMN "reccomendedSkills",
ADD COLUMN     "recommendedSkills" TEXT[];
