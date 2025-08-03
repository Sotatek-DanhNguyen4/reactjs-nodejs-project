-- Create table
CREATE TABLE IF NOT EXISTS countries (
    country_id INTEGER PRIMARY KEY,
    country_name VARCHAR(100) NOT NULL
);

-- Insert data
INSERT INTO countries (country_id, country_name) VALUES
(1, 'United States'),
(2, 'Canada'),
(3, 'Germany'),
(4, 'Japan'),
(5, 'Brazil');
