-- CreateTable
CREATE TABLE `Master_Product` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `uuid` VARCHAR(10000) NOT NULL,
    `user_id` VARCHAR(255) NOT NULL DEFAULT 'kosong',
    `name` VARCHAR(255) NOT NULL,
    `description` VARCHAR(255) NOT NULL DEFAULT 'kosong',
    `ingredients` VARCHAR(255) NOT NULL DEFAULT 'kosong',
    `price` INTEGER NOT NULL DEFAULT 0,
    `picture_path` VARCHAR(255) NOT NULL DEFAULT 'kosong',
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
    `deleted` BOOLEAN NOT NULL DEFAULT false,
    `custom_unix_soft_delete` INTEGER NULL,

    UNIQUE INDEX `Master_Product_uuid_key`(`uuid`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
