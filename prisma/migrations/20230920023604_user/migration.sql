-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `uuid` VARCHAR(10000) NOT NULL,
    `referral` VARCHAR(255) NOT NULL DEFAULT 'kosong',
    `name` VARCHAR(255) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `email_verified_at` VARCHAR(255) NOT NULL DEFAULT 'kosong',
    `password` VARCHAR(255) NOT NULL,
    `profile_picture_path` VARCHAR(255) NOT NULL DEFAULT 'kosong',
    `status` VARCHAR(255) NOT NULL DEFAULT 'kosong',
    `keterangan` VARCHAR(255) NOT NULL DEFAULT 'kosong',
    `other` VARCHAR(255) NOT NULL DEFAULT 'kosong',
    `alasan_ditolak` VARCHAR(255) NOT NULL DEFAULT 'kosong',
    `post_by` VARCHAR(255) NOT NULL DEFAULT 'kosong',
    `edited_by` VARCHAR(255) NOT NULL DEFAULT 'kosong',
    `deleted_by` VARCHAR(255) NOT NULL DEFAULT 'kosong',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `custom_unix_createdAt` INTEGER NULL,
    `updatedAt` DATETIME(3) NOT NULL,
    `custom_unix_updatedAt` INTEGER NULL,

    UNIQUE INDEX `User_uuid_key`(`uuid`),
    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
