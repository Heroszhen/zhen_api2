-- CreateTable
CREATE TABLE `user` (
    `id` CHAR(36) NOT NULL,
    `email` VARCHAR(180) NOT NULL,
    `roles` JSON NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `api_key` VARCHAR(255) NULL,
    `created` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated` DATETIME(0) NULL,

    UNIQUE INDEX `user_email_key`(`email`),
    UNIQUE INDEX `user_api_key_key`(`api_key`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
