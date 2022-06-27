DROP DATABASE IF EXISTS `user_db`;
CREATE DATABASE `user_db`;
USE `user_db`;

CREATE TABLE `user`(
    `id` INTEGER AUTO_INCREMENT NOT NULL,
    `firstName` VARCHAR(45) NOT NULL,
    `lastName` VARCHAR(45) NOT NULL,
    `email` VARCHAR(45) NOT NULL,
    `phone` VARCHAR(45) NOT NULL,
    `comments` TEXT NOT NULL,
    `status` VARCHAR(10) NOT NULL DEFAULT 'active',
    PRIMARY KEY (`id`)
);

INSERT INTO `user` (`firstName`, `lastName`, `email`, `phone`, `comments`, `status`) VALUES ('KT', 'Muppet', 'hello@hello.h', '444-444-4444', 'hello', 'active');