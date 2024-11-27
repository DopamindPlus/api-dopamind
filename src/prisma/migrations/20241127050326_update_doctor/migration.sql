/*
  Warnings:

  - Added the required column `experience` to the `Doctor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image` to the `Doctor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `Doctor` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `doctor` ADD COLUMN `experience` VARCHAR(191) NOT NULL,
    ADD COLUMN `image` VARCHAR(191) NOT NULL,
    ADD COLUMN `price` VARCHAR(191) NOT NULL;
