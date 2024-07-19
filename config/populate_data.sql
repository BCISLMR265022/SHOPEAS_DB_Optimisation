INSERT INTO customers (name, email, address, phone_number, date_of_birth)
VALUES 
('John Doe', 'john@example.com', '123 Elm St', '555-1234', '1980-01-01'),
('Jane Smith', 'jane@example.com', '456 Oak St', '555-5678', '1990-02-02'),
('Alice Johnson', 'alice@example.com', '789 Pine St', '555-9012', '2000-03-03');

-- Repeat similar inserts to populate at least 10,000 records
INSERT INTO products (name, description, price, stock)
VALUES 
('Product A', 'Description A', 19.99, 100),
('Product B', 'Description B', 29.99, 150),
('Product C', 'Description C', 39.99, 200);

-- Repeat similar inserts to populate at least 10,000 records
INSERT INTO orders (customer_id, order_date, total_amount)
VALUES 
(1, '2024-07-10', 59.97),
(2, '2024-07-11', 89.97),
(3, '2024-07-12', 29.99);

-- Repeat similar inserts to populate at least 10,000 records

INSERT INTO order_items (order_id, product_id, product_name, product_price, quantity)
VALUES 
(1, 1, 'Product A', 19.99, 1),
(1, 2, 'Product B', 29.99, 1),
(1, 3, 'Product C', 39.99, 1),
(2, 1, 'Product A', 19.99, 2),
(2, 2, 'Product B', 29.99, 2),
(3, 3, 'Product C', 39.99, 1);
