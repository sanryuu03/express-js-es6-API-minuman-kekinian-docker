-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `uuid` VARCHAR(191) NOT NULL,
    `referral` VARCHAR(191) NULL,
    `name` VARCHAR(191) NULL,
    `email` VARCHAR(191) NOT NULL,
    `email_verified_at` VARCHAR(191) NULL,
    `password` VARCHAR(191) NULL,
    `profile_picture_path` VARCHAR(191) NULL,
    `status` VARCHAR(191) NULL,
    `keterangan` VARCHAR(191) NULL,
    `other` VARCHAR(191) NULL,
    `alasan_ditolak` VARCHAR(191) NULL,
    `post_by` VARCHAR(191) NULL,
    `edited_by` VARCHAR(191) NULL,
    `deleted_by` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `custom_unix_createdAt` VARCHAR(191) NULL,
    `updatedAt` DATETIME(3) NOT NULL,
    `custom_unix_updatedAt` VARCHAR(191) NULL,

    UNIQUE INDEX `User_uuid_key`(`uuid`),
    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
