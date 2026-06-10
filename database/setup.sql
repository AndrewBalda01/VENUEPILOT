CREATE DATABASE IF NOT EXISTS venuepilot CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE venuepilot;

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  full_name VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS events (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  category VARCHAR(80) NOT NULL,
  location VARCHAR(200) NOT NULL,
  event_date DATETIME NOT NULL,
  capacity INT NOT NULL DEFAULT 0,
  status ENUM('Draft', 'Scheduled', 'Sold Out', 'Completed') DEFAULT 'Draft',
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Demo admin user (password: admin123)
INSERT INTO users (full_name, email, password_hash) VALUES
('Marco Rossi', 'admin@venuepilot.com', '$2b$10$fOAJfLVupsOxDDgmhgK7lOjUhqMeyyv7fEOzF4pMpHDnuM71jdZoC');

-- Sample events
INSERT INTO events (title, category, location, event_date, capacity, status, description) VALUES
('Jazz & Wine Evening', 'Music', 'Main Hall', '2026-07-15 20:00:00', 350, 'Scheduled', 'An intimate evening of smooth jazz paired with premium wine selections.'),
('Tech Startup Pitch Night', 'Business', 'Conference Room A', '2026-07-22 18:00:00', 120, 'Scheduled', 'Monthly startup pitch event. 10 startups present to investors.'),
('Summer Rooftop Party', 'Social', 'Rooftop Terrace', '2026-08-05 21:00:00', 200, 'Sold Out', 'Annual summer rooftop party with live DJ and cocktails.'),
('Comedy Night: Open Mic', 'Entertainment', 'Lounge Bar', '2026-06-28 20:30:00', 80, 'Completed', 'Open mic comedy night featuring local and touring comedians.'),
('Art Gallery Opening', 'Art', 'Gallery Wing', '2026-09-10 19:00:00', 150, 'Draft', 'Opening night for contemporary art exhibition featuring 12 local artists.'),
('Charity Gala Dinner', 'Charity', 'Grand Ballroom', '2026-10-20 19:30:00', 400, 'Draft', 'Annual charity fundraising gala with dinner, auction, and live entertainment.');
