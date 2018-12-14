-- DROP DB bamazon if exists
DROP DATABASE IF EXISTS bamazon;
-- CREATE DB called bamazon
CREATE DATABASE bamazon;
-- USE bamazon
USE bamazon;

-- CREATE TABLE inside of DB called products w/ fields:
CREATE TABLE products (
  item_id INT(5) AUTO_INCREMENT NOT NULL,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(100) NOT NULL,
  price DECIMAL(8,2) NOT NULL,
  stock_quantity INT(5) NULL,
  product_sales DECIMAL(8,2) DEFAULT '0.00' NULL,
  PRIMARY KEY (item_id)
);

-- CREATE TABLE inside of DB called departments w/ fields:
CREATE TABLE departments (
  department_id INT(5) AUTO_INCREMENT NOT NULL,
  department_name VARCHAR(100) NOT NULL,
  over_head_costs DECIMAL(8,2) NOT NULL,
  PRIMARY KEY (department_id)
);

-- Seed database with ~10 different products
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Laptop', 'Computers', 1000, 500), ('Adjustable Desk', 'Furniture', 400, 200), ('Monitor', 'Accessories', 250, 500), ('Tablet', 'Mobile Device', 700, 1000), ('Phone', 'Mobile Device', 800, 2000), ('Router', 'Communications', 200, 500), ('Hotspot', 'Communications', 250, 400), ('Adjustable Chair', 'Furniture', 300, 200), ('Desktop', 'Computers', 500, 500), ('Dock', 'Accessories', 150, 250);

-- Select table
SELECT * FROM products;
SELECT * FROM departments;