# Airline-Booking

**#Schema**

CREATE DATABASE FLIGHT_BOOKING;
USE FLIGHT_BOOKING;

CREATE TABLE userswithrole (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'user') DEFAULT 'user'
);

INSERT INTO userswithrole (email, password, role)
VALUES ('admin@test.com', '$2a$04$pwrAs2fRFYDFmuCmkrof/OnMB/t9YGfGNM8htkFf4VNhfkmFv9ZE.', 'admin');

select * from userswithrole;

-- Table for storing user login information
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);
INSERT INTO users (email, password)
VALUES ('admin@test.com', 'test');

UPDATE users
SET password = '$2a$04$pwrAs2fRFYDFmuCmkrof/OnMB/t9YGfGNM8htkFf4VNhfkmFv9ZE.'
WHERE email = 'admin@test.com';

SELECT * from users;

-- Table for defining user roles
CREATE TABLE roles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    role_name VARCHAR(50) NOT NULL UNIQUE
);

-- Populate roles table with admin and staff roles
INSERT INTO roles (role_name) VALUES ('admin'), ('staff');

select * from roles;

-- Mapping table to associate users with roles
CREATE TABLE user_roles (
    user_id INT,
    role_id INT,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (role_id) REFERENCES roles(id),
    PRIMARY KEY (user_id, role_id)
);

SELECT * FROM user_roles;

ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';
flush privileges;

SELECT user,authentication_string,plugin,host FROM mysql.user;
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'Current-Root-Password';
FLUSH PRIVILEGES;
SHOW GLOBAL VARIABLES LIKE 'PORT';
