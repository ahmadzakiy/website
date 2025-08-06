-- Create tables for notes data
CREATE TABLE IF NOT EXISTS categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS notes (
  id SERIAL PRIMARY KEY,
  href TEXT NOT NULL,
  title TEXT NOT NULL,
  category_id INTEGER REFERENCES categories(id),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Insert categories
INSERT INTO categories (name) VALUES
  ('articles'),
  ('websites'),
  ('tools')
ON CONFLICT (name) DO NOTHING;

-- Insert articles
INSERT INTO notes (href, title, category_id) VALUES
  ('https://about.google/company-info/philosophy/', 'Ten Things We Know to be True', (SELECT id FROM categories WHERE name = 'articles')),

-- Insert websites
INSERT INTO notes (href, title, category_id) VALUES
  ('https://www.nissan-global.com/EN/HERITAGE_COLLECTION/', 'Nissan Heritage Collection', (SELECT id FROM categories WHERE name = 'websites')),

-- Insert tools
INSERT INTO notes (href, title, category_id) VALUES
  ('https://v0.dev/', 'v0', (SELECT id FROM categories WHERE name = 'tools'));