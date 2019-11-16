DROP DATABASE IF EXISTS casebycase;

CREATE DATABASE casebycase;

USE casebycase;

CREATE TABLE user (
item_id INTEGER AUTO_INCREMENT NOT NULL,

user_name VARCHAR(100),

user_email VARCHAR(100),

user_password VARCHAR(10),

PRIMARY KEY (item_id)
);