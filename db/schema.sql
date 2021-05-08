DROP DATABASE IF EXISTS car_dealerdb;
CREATE DATABASE car_dealerdb;
USE car_dealerdb;
CREATE TABLE cars (
    carID INTEGER(255) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    make varchar(255),
    model varchar(255),
    car_year INTEGER(5),
    trim varchar(255),
    price INTEGER(255) NOT NULL,
    milage INTEGER(255) NOT NULL,
    vin varchar(255) NOT NULL,
    condition_of_car varchar(255),
    image BLOB,
    sold BOOLEAN DEFAULT FALSE
);
CREATE TABLE user (
    userID INTEGER(255) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    username varchar(255) NOT NULL,
    name varchar(255) NOT NULL,
    email varchar(255) NOT NULL,
    password varchar(255) NOT NULL,
    carID INTEGER(255),
    FOREIGN KEY (carID) REFERENCES cars(carID)
    );
