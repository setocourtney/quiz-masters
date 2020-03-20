DROP DATABASE IF EXISTS pokequizDB;

CREATE DATABASE pokequizDB;

USE pokequizDB;

CREATE TABLE questions (
id int NOT NULL AUTO_INCREMENT,
daily_double BOOLEAN,
category VARCHAR(30),
question VARCHAR(300),
answer VARCHAR(300),
type_id INTEGER,
PRIMARY KEY (id)
-- FOREIGN KEY (type_id) REFERENCES pokemon(id)
);
