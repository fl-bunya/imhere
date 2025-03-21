-- DROP TABLE IF EXISTS Customers;
-- CREATE TABLE IF NOT EXISTS Customers (CustomerId INTEGER PRIMARY KEY, CompanyName TEXT, ContactName TEXT);
-- INSERT INTO Customers (CustomerID, CompanyName, ContactName) VALUES (1, 'Alfreds Futterkiste', 'Maria Anders'), (4, 'Around the Horn', 'Thomas Hardy'), (11, 'Bs Beverages', 'Victoria Ashworth'), (13, 'Bs Beverages', 'Random Name');

-- npx wrangler d1 execute d1-imhere --local --file=./db/schema.sql
-- npx wrangler d1 execute d1-imhere --local --command="SELECT * FROM locations"
-- npx wrangler d1 execute d1-imhere --remote --file=./db/schema.sql


DROP TABLE IF EXISTS locations;

CREATE TABLE IF NOT EXISTS locations (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  browser_lat REAL,
  browser_lng REAL,
  browser_pref TEXT,
  browser_city TEXT,
  browser_town TEXT,
  ip_lat REAL,
  ip_lng REAL,
  ip_city TEXT,
  cf_lat REAL,
  cf_lng REAL,
  cf_city TEXT,
  cf_colo TEXT,
  client_ip TEXT,
  emoji TEXT,
  message TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);