-- Stored procedure to calculate total sales for a specific period
CREATE OR REPLACE FUNCTION calculate_total_sales(start_date DATE, end_date DATE)
RETURNS NUMERIC AS $$
DECLARE
    total_sales NUMERIC;
BEGIN
    SELECT SUM(total_amount) INTO total_sales
    FROM orders
    WHERE order_date BETWEEN start_date AND end_date;
    RETURN total_sales;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update product stock after an order is placed
CREATE OR REPLACE FUNCTION update_stock() 
RETURNS TRIGGER AS $$
BEGIN
    UPDATE products
    SET stock = stock - NEW.quantity
    WHERE product_id = NEW.product_id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger on order_items table
CREATE TRIGGER update_stock_trigger
AFTER INSERT ON order_items
FOR EACH ROW
EXECUTE FUNCTION update_stock();
