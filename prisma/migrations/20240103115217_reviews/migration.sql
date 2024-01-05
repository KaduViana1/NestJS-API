/*
  Warnings:

  - You are about to drop the `analyze` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `analyze` DROP FOREIGN KEY `Analyze_gameId_fkey`;

-- DropForeignKey
ALTER TABLE `analyze` DROP FOREIGN KEY `Analyze_userId_fkey`;

-- DropTable
DROP TABLE `analyze`;

-- CreateTable
CREATE TABLE `Review` (
    `userId` VARCHAR(191) NOT NULL,
    `gameId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`userId`, `gameId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Review` ADD CONSTRAINT `Review_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Review` ADD CONSTRAINT `Review_gameId_fkey` FOREIGN KEY (`gameId`) REFERENCES `Game`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
