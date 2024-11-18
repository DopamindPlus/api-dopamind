-- DropForeignKey
ALTER TABLE `activity` DROP FOREIGN KEY `Activity_id_fkey`;

-- AddForeignKey
ALTER TABLE `Activity` ADD CONSTRAINT `Activity_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
