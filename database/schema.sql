CREATE DATABASE IF NOT EXISTS guvi_ecommerce;
USE guvi_ecommerce;

DROP TABLE IF EXISTS order_items;
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS cart;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS categories;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(120) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    phone VARCHAR(15) NOT NULL,
    role ENUM('BUYER', 'SELLER', 'ADMIN') DEFAULT 'BUYER',
    status ENUM('ACTIVE', 'SUSPENDED') DEFAULT 'ACTIVE',
    address_street VARCHAR(255),
    address_city VARCHAR(100),
    address_state VARCHAR(100),
    address_pincode VARCHAR(10),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);



CREATE TABLE categories (
    category_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    slug VARCHAR(100) NOT NULL UNIQUE,
    description VARCHAR(255)
);



CREATE TABLE products (
    product_id INT AUTO_INCREMENT PRIMARY KEY,
    seller_id INT NOT NULL,
    category_id INT NOT NULL,
    name VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    short_specs VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    mrp DECIMAL(10, 2) NOT NULL,
    stock_quantity INT NOT NULL DEFAULT 0,
    rating DECIMAL(2, 1) DEFAULT 4.0,
    review_count INT DEFAULT 0,
    image_url VARCHAR(255),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (seller_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (category_id) REFERENCES categories(category_id) ON DELETE RESTRICT
);



CREATE TABLE cart (
    cart_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL DEFAULT 1,
    added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(product_id) ON DELETE CASCADE,
    UNIQUE KEY unique_user_product (user_id, product_id)
);



CREATE TABLE orders (
    order_id INT AUTO_INCREMENT PRIMARY KEY,
    order_number VARCHAR(30) NOT NULL UNIQUE,
    user_id INT NOT NULL,
    total_amount DECIMAL(10, 2) NOT NULL,
    discount_amount DECIMAL(10, 2) DEFAULT 0.00,
    tax_amount DECIMAL(10, 2) NOT NULL,
    shipping_fee DECIMAL(10, 2) DEFAULT 0.00,
    final_amount DECIMAL(10, 2) NOT NULL,
    payment_method ENUM('COD', 'UPI', 'NET_BANKING', 'CARD') DEFAULT 'COD',
    payment_status ENUM('PENDING', 'COMPLETED', 'FAILED') DEFAULT 'PENDING',
    order_status ENUM('PLACED', 'CONFIRMED', 'SHIPPED', 'OUT_FOR_DELIVERY', 'DELIVERED', 'CANCELLED') DEFAULT 'PLACED',
    shipping_name VARCHAR(100) NOT NULL,
    shipping_phone VARCHAR(15) NOT NULL,
    shipping_address TEXT NOT NULL,
    shipping_pincode VARCHAR(10) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE RESTRICT
);



CREATE TABLE order_items (
    item_id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    product_name VARCHAR(200) NOT NULL,
    unit_price DECIMAL(10, 2) NOT NULL,
    quantity INT NOT NULL,
    line_total DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(order_id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(product_id) ON DELETE RESTRICT
);



INSERT INTO users (full_name, email, password_hash, phone, role, status, address_street, address_city, address_state, address_pincode) VALUES
('System Administrator', 'admin@guvi.in', 'admin123', '9876543210', 'ADMIN', 'ACTIVE', 'GUVI Tech Park, IITM Research Park', 'Chennai', 'Tamil Nadu', '600113'),

('Campus Tech Store', 'seller.tech@guvi.in', 'seller123', '9876543211', 'SELLER', 'ACTIVE', 'Academic Block 3, Student Mart', 'Chennai', 'Tamil Nadu', '600113'),

('Stationery & Books Hub', 'seller.books@guvi.in', 'seller123', '9876543212', 'SELLER', 'ACTIVE', 'Hostel Zone Commercial Complex', 'Chennai', 'Tamil Nadu', '600113'),

('Rahul Sharma', 'rahul.s@student.guvi.in', 'student123', '9876543220', 'BUYER', 'ACTIVE', 'Room 204, Kaveri Hostel', 'Chennai', 'Tamil Nadu', '600113'),

('Ananya Iyer', 'ananya.i@student.guvi.in', 'student123', '9876543221', 'BUYER', 'ACTIVE', 'Room 112, Ganga Hostel', 'Chennai', 'Tamil Nadu', '600113');



INSERT INTO categories (category_id, name, slug, description) VALUES
(1, 'Computer Peripherals', 'peripherals', 'Mice, keyboards, flash drives, cables, and adapters for lab work'),
(2, 'Audio & Wearables', 'audio', 'Headphones, earphones, and smart bands for study and daily use'),
(3, 'CS & Engineering Books', 'books', 'Core computer science textbooks, coding guides, and reference material'),
(4, 'Lab & DIY Hardware', 'hardware', 'Microcontrollers, sensors, breadboards, and robotics components'),
(5, 'Campus & Stationery', 'stationery', 'Notebooks, scientific calculators, technical pens, and exam essentials'),
(6, 'Casual Wear', 'casual-wear', 'Everyday minimalist t-shirts, jeans, and relaxed streetwear'),
(7, 'Formal & Evening', 'formal-wear', 'Sharp tailored shirts, blazers, and presentation attire'),
(8, 'Outerwear & Jackets', 'outerwear', 'Coats, jackets, fleece hoodies, and layering essentials');

INSERT INTO products (seller_id, category_id, name, description, short_specs, price, mrp, stock_quantity, rating, review_count, image_url) VALUES
(2, 1, 'Logitech B100 Optical USB Mouse', 'Reliable wired optical mouse with 800 DPI tracking and ambidextrous shape. Ideal for programming and lab workstations.', 'Wired USB • 800 DPI • 3-Button', 349.00, 499.00, 28, 4.4, 86, 'mouse.jpg'),

(2, 1, 'SanDisk Ultra 128GB USB 3.0 Flash Drive', 'High-speed flash drive with up to 130MB/s transfer speed. Durable sliding design for OS boots and code backups.', '128GB • USB 3.0 • Up to 130MB/s', 799.00, 1150.00, 42, 4.5, 114, 'pendrive.jpg'),

(2, 1, 'TVS-e Bharat Gold Mechanical Keyboard', 'Long-lasting mechanical keyboard with genuine mechanical switches for tactile coding experience and typing comfort.', 'Mechanical Switches • USB • 104 Keys', 2499.00, 3199.00, 12, 4.7, 53, 'keyboard.jpg'),

(2, 1, 'Portronics 4-Port USB 3.0 Hub with Switch', 'Compact 4-port USB hub with individual power switches and LED indicators. Connect multiple flash drives and lab boards.', '4 Ports • 5Gbps • Individual Switches', 499.00, 899.00, 19, 4.2, 41, 'usbhub.jpg'),

(2, 2, 'boAt Rockerz 450 Bluetooth On-Ear Headphones', 'Over-ear wireless headphones with 40mm drivers, 15 hours battery backup, and padded ear cushions for long study sessions.', 'Bluetooth 5.0 • 40mm Drivers • 15h Battery', 1299.00, 1990.00, 24, 4.3, 210, 'headphones.jpg'),

(2, 2, 'Boult Audio Bassbuds Wired In-Ear Earphones', 'In-ear earphones with noise-isolating design, in-line microphone, and braided tangle-free cable.', '3.5mm Jack • In-line Mic • Deep Bass', 349.00, 699.00, 50, 4.1, 78, 'earphones.jpg'),

(3, 3, 'Introduction to Algorithms (CLRS) 4th Edition', 'The standard reference for algorithms and data structures courses worldwide. Essential for competitive programming and CS interviews.', 'Paperback • 1312 Pages • MIT Press', 1150.00, 1499.00, 16, 4.8, 142, 'book_clrs.jpg'),

(3, 3, 'Operating System Concepts (Silberschatz)', 'Comprehensive guide on memory management, virtualization, process synchronization, and Linux/Unix kernel architecture.', 'Paperback • 10th Edition • Wiley', 890.00, 1195.00, 11, 4.6, 67, 'book_os.jpg'),

(3, 3, 'Database System Concepts (Korth & Sudarshan)', 'Fundamentals of relational databases, SQL, normalization, concurrency control, and transaction processing.', 'Paperback • 7th Edition • McGraw Hill', 820.00, 995.00, 14, 4.5, 59, 'book_db.jpg'),

(2, 4, 'Raspberry Pi 4 Model B (4GB RAM)', 'Quad-core 64-bit ARM processor, dual micro-HDMI 4K outputs, Gigabit Ethernet, and 40-pin GPIO for IoT and system programming.', 'Broadcom BCM2711 • 4GB LPDDR4 • USB-C', 5499.00, 6200.00, 8, 4.9, 95, 'raspberrypi.jpg'),

(2, 4, 'Arduino Uno R3 Starter Kit with Breadboard', 'Original ATmega328P microcontroller board bundled with breadboard, jumper wires, resistors, LEDs, and basic sensors.', 'ATmega328P • 14 Digital I/O • USB Cable', 1450.00, 1850.00, 22, 4.6, 88, 'arduino.jpg'),

(2, 4, 'ESP32 Wi-Fi + Bluetooth IoT Development Board', 'Dual-core 240MHz microcontroller with integrated 802.11 b/g/n Wi-Fi and BLE. Perfect for cloud and embedded projects.', 'ESP-WROOM-32 • Micro-USB • 30 Pins', 420.00, 599.00, 35, 4.4, 62, 'esp32.jpg'),

(3, 5, 'Casio FX-991EX ClassWiz Scientific Calculator', 'High-resolution display, 552 functions, matrix, spreadsheet, equation solver, and QR code visualization. Permitted in university exams.', '552 Functions • Dual Power • Natural Display', 1495.00, 1795.00, 30, 4.8, 310, 'calculator.jpg'),

(3, 5, 'Classmate Pulse Spiral Notebook (Pack of 4)', 'A4 size 300-page unruled spiral notebook with thick 70 GSM paper for clean lecture notes and diagram sketching.', 'A4 • 300 Pages • 70 GSM • Spiral Bound', 380.00, 480.00, 45, 4.5, 94, 'notebook.jpg'),

(3, 5, 'Parker Vector Standard CT Rollerball Pen', 'Classic student fountain/rollerball pen with stainless steel trim and smooth ink flow for university examinations.', 'Fine Nib • Blue Ink • Stainless Steel Clip', 320.00, 399.00, 18, 4.3, 49, 'parkerpen.jpg'),

(2, 6, 'Classic Casual T-Shirt', 'Premium heavyweight combed cotton t-shirt with a relaxed boxy cut, ribbed crew collar, and ultra-soft breathable feel. Perfect for daily campus wear and minimal styling.', '100% Combed Cotton • 220 GSM • Relaxed Fit', 349.00, 499.00, 38, 4.4, 86, 'tshirt_casual.jpg'),

(2, 8, 'Meridian Oversized Wool Coat', 'Architectural simplicity meets cold-weather luxury. Crafted from a premium Italian wool blend, this double-breasted oversized silhouette delivers exceptional warmth and effortless minimalism.', '70% Wool • 600G/M² • Italian Blend • Double Breasted', 4499.00, 6999.00, 14, 4.8, 124, 'wool_coat.jpg'),

(2, 6, 'One Life Graphic Streetwear T-Shirt', 'Graphic t-shirt designed in an olive earthy palette with minimalist chest typography. Bio-washed for a vintage lived-in texture and zero shrinkage.', '100% Organic Cotton • Bio-Washed • Graphic Print', 599.00, 899.00, 45, 4.5, 98, 'graphic_tshirt.jpg'),

(2, 6, 'Skinny Fit Stretch Denim Jeans', 'Modern slim taper cut crafted from 12.5 oz durable indigo stretch denim with subtle whiskering and reinforced contrast copper rivets.', '98% Cotton 2% Elastane • 12.5oz • 5-Pocket', 1299.00, 1999.00, 26, 4.6, 142, 'denim_jeans.jpg'),

(2, 6, 'Checkered Flannel Button-Down Shirt', 'Timeless heritage buffalo plaid flannel shirt in rich crimson and charcoal. Brushed twill weave keeps you warm during late-night study sessions.', '100% Brushed Cotton Flannel • Regular Fit • Dual Chest Pockets', 899.00, 1299.00, 29, 4.3, 76, 'checkered_shirt.jpg'),

(2, 7, 'Vertical Striped Oxford Collar Shirt', 'Tailored classic button-down shirt featuring crisp blue and white vertical pencil stripes. Easy-care wrinkle resistant finish ideal for presentations.', '100% Oxford Cotton • Button-Down Collar • Wrinkle-Resistant', 999.00, 1499.00, 31, 4.7, 118, 'striped_shirt.jpg');





INSERT INTO orders (order_number, user_id, total_amount, discount_amount, tax_amount, shipping_fee, final_amount, payment_method, payment_status, order_status, shipping_name, shipping_phone, shipping_address, shipping_pincode) VALUES
('ORD-2026-1001', 4, 1148.00, 100.00, 52.40, 0.00, 1100.40, 'UPI', 'COMPLETED', 'DELIVERED', 'Rahul Sharma', '9876543220', 'Room 204, Kaveri Hostel, IITM Campus', '600113'),

('ORD-2026-1002', 4, 1450.00, 0.00, 72.50, 0.00, 1522.50, 'COD', 'PENDING', 'CONFIRMED', 'Rahul Sharma', '9876543220', 'Room 204, Kaveri Hostel, IITM Campus', '600113'),

('ORD-2026-1003', 5, 2499.00, 200.00, 114.95, 0.00, 2413.95, 'NET_BANKING', 'COMPLETED', 'SHIPPED', 'Ananya Iyer', '9876543221', 'Room 112, Ganga Hostel, IITM Campus', '600113');




INSERT INTO order_items (order_id, product_id, product_name, unit_price, quantity, line_total) VALUES
(1, 1, 'Logitech B100 Optical USB Mouse', 349.00, 1, 349.00),

(1, 2, 'SanDisk Ultra 128GB USB 3.0 Flash Drive', 799.00, 1, 799.00),

(2, 11, 'Arduino Uno R3 Starter Kit with Breadboard', 1450.00, 1, 1450.00),

(3, 3, 'TVS-e Bharat Gold Mechanical Keyboard', 2499.00, 1, 2499.00);
