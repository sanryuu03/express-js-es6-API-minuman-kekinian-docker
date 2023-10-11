-- CreateTable
CREATE TABLE `Product_Price` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `uuid` VARCHAR(255) NOT NULL,
    `product_id` VARCHAR(255) NOT NULL DEFAULT 'kosong',
    `size_id` VARCHAR(255) NOT NULL DEFAULT 'kosong',
    `is_promo` BOOLEAN NOT NULL DEFAULT false,
    `price` INTEGER NOT NULL DEFAULT 0,
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

    UNIQUE INDEX `Product_Price_uuid_key`(`uuid`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
