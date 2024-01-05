/*
  Warnings:

  - Added the required column `reviws` to the `Review` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `review` ADD COLUMN `reviws` VARCHAR(191) NOT NULL;
