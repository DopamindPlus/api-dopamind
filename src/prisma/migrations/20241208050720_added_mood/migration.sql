-- CreateTable
CREATE TABLE `Mood` (
    `mood_id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `predictions` VARCHAR(191) NOT NULL,
    `texts` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`mood_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Mood` ADD CONSTRAINT `Mood_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;
