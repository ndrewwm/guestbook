CREATE TABLE `events` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_id` integer,
	`name` text NOT NULL,
	`start` text NOT NULL,
	`end` text NOT NULL,
	`color` text NOT NULL
);
