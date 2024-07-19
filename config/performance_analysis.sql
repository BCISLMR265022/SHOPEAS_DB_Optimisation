-- Analyze query performance before optimization
EXPLAIN ANALYZE 
SELECT * FROM orders WHERE order_date BETWEEN '2023-01-01' AND '2023-12-31';

-- Analyze query performance after optimization
EXPLAIN ANALYZE 
SELECT * FROM orders_2023 WHERE order_date BETWEEN '2023-01-01' AND '2023-12-31';

-- Example of using stored procedure
EXPLAIN ANALYZE 
SELECT calculate_total_sales('2023-01-01', '2023-12-31');
