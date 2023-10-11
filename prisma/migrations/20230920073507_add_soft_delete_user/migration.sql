-- AlterTable
ALTER TABLE `User` ADD COLUMN `custom_unix_soft_delete` INTEGER NULL,
    ADD COLUMN `deleted` BOOLEAN NOT NULL DEFAULT false;
