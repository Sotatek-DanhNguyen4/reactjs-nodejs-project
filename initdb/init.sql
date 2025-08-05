
-- Create database if it doesn't exist
CREATE DATABASE IF NOT EXISTS NodeTest;

-- Create new user and grant privileges
CREATE USER IF NOT EXISTS 'test'@'%' IDENTIFIED BY 'test';
GRANT ALL PRIVILEGES ON NodeTest.* TO 'test'@'%';
FLUSH PRIVILEGES;

-- Optional: insert data
USE NodeTest;
CREATE TABLE IF NOT EXISTS countries (country_id INT PRIMARY KEY,country_name VARCHAR(100) NOT NULL);

INSERT INTO countries (country_id, country_name) VALUES(1, 'United States'),(2, 'Canada'),(3, 'Germany'),(4, 'Japan'),(5, 'Brazil');
