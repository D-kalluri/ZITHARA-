CREATE TABLE customers (
    sno SERIAL PRIMARY KEY,
    customer_name VARCHAR(100),
    age INTEGER,
    phone VARCHAR(15),
    location VARCHAR(100),
    created_at TIMESTAMP,
    created_date DATE,
    created_time TIME
);

INSERT INTO customers (customer_name, age, phone, location, created_at)
SELECT
    (ARRAY['John', 'Jane', 'Alice', 'Bob', 'Emily', 'Michael', 'Sophia', 'William', 'Olivia', 'James'])[floor(random() * 10) + 1] ||
    ' ' ||
    (ARRAY['Smith', 'Johnson', 'Brown', 'Taylor', 'Williams', 'Jones', 'Davis', 'Miller', 'Wilson', 'Moore'])[floor(random() * 10) + 1]
    AS customer_name,
    floor(random() * 80) + 18 as age,
    CONCAT('555-', floor(random() * 900) + 100, '-', floor(random() * 9000) + 1000) as phone,
    (ARRAY['New York', 'London', 'Tokyo', 'Paris', 'Sydney'])[floor(random() * 5) + 1] as location,
    NOW() - (floor(random() * 365) || ' days')::INTERVAL - (floor(random() * 86400) || ' seconds')::INTERVAL as created_at
FROM
    generate_series(1, 50);

UPDATE customers
SET created_date = DATE(created_at),
    created_time = created_at::TIME;



