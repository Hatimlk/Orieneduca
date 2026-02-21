CREATE DATABASE IF NOT EXISTS orieneduca_db;
USE orieneduca_db;

-- Users Table
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('student', 'admin') DEFAULT 'student',
    plan ENUM('Gratuit', 'Plus', 'Premium') DEFAULT 'Gratuit',
    phone VARCHAR(20),
    city VARCHAR(50),
    filiere VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Schools Table
CREATE TABLE IF NOT EXISTS schools (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    category VARCHAR(50) NOT NULL, -- Public, Privé
    type VARCHAR(20) NOT NULL, -- Post-Bac, Post-Prepa
    city VARCHAR(50) NOT NULL,
    description TEXT,
    logo_url VARCHAR(255),
    website_url VARCHAR(255),
    thresholds JSON, -- Stores historical thresholds as JSON
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Scholarships Table
CREATE TABLE IF NOT EXISTS scholarships (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    provider VARCHAR(150) NOT NULL,
    location VARCHAR(50) NOT NULL, -- Maroc, Étranger
    country VARCHAR(50),
    type ENUM('Excellence', 'Sociale', 'Recherche', 'Coopération') NOT NULL,
    value VARCHAR(100),
    description TEXT,
    deadline DATE,
    eligibility JSON, -- Array of strings
    target_levels JSON, -- Array of strings
    image_url VARCHAR(255),
    tags JSON,
    criteria JSON, -- MinGrade, Sector, Social, etc.
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Applications / Registrations Table (Simulated)
CREATE TABLE IF NOT EXISTS applications (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    school_id INT,
    scholarship_id INT,
    status ENUM('Pending', 'Accepted', 'Rejected', 'Waitlist') DEFAULT 'Pending',
    applied_date DATE DEFAULT (CURRENT_DATE),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Initial Seed Data (Optional - Examples)
INSERT INTO users (full_name, email, password_hash, role) VALUES 
('Admin User', 'admin@orieneduca.com', '$2y$10$ExampleHash...', 'admin');
