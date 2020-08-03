DROP SCHEMA IF EXISTS auth;
CREATE DATABASE `auth` /*!40100 DEFAULT CHARACTER SET latin1 */;

connect auth;

CREATE TABLE `user` (
  `username` varchar(16) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(32) NOT NULL,
  `create_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `user_status` varchar(45) DEFAULT NULL,
  `user_id` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


INSERT INTO `auth`.`user`
(`username`,
`email`,
`password`,
`create_time`,
`user_status`,
`user_id`)
VALUES
('user1',
'user1@gmail.com',
'password',
now(),
true,
'1');

INSERT INTO `auth`.`user`
(`username`,
`email`,
`password`,
`create_time`,
`user_status`,
`user_id`)
VALUES
('user2',
'user2@gmail.com',
'password1',
now(),
false,
'1');
