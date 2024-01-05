/*
  Warnings:

  - You are about to drop the column `updatedAt` on the `game` table. All the data in the column will be lost.
  - Made the column `releaseDate` on table `game` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `game` DROP COLUMN `updatedAt`,
    MODIFY `releaseDate` DATE NOT NULL;
