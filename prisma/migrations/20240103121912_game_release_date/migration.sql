/*
  Warnings:

  - You are about to drop the column `createdAt` on the `game` table. All the data in the column will be lost.
  - Added the required column `releaseDate` to the `Game` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `game` DROP COLUMN `createdAt`,
    ADD COLUMN `releaseDate` DATETIME(3) NOT NULL;
