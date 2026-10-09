-- ==============================================================
-- GUVI E-Commerce Platform - Additional Catalog Seed Data
-- 38 Realistic Products across All 8 System Categories
-- Compatible with MySQL 8.0 InnoDB Schema
-- ==============================================================

USE guvi_ecommerce;

INSERT INTO products (seller_id, category_id, name, description, short_specs, price, mrp, stock_quantity, rating, review_count, image_url) VALUES
-- Category 1: Computer Peripherals (Seller: 2 - Campus Tech Store)
(2, 1, 'Dell Pro 1080p FHD USB Webcam', 'Full HD 1080p plug-and-play webcam with built-in noise-reducing microphone and privacy shutter for lab meetings and online lectures.', '1080p 30FPS • Dual Mic • Privacy Shutter', 1899.00, 2499.00, 25, 4.5, 72, 'webcam.jpg'),
(2, 1, 'Seagate Expansion 1TB External Hard Drive', 'Portable 2.5-inch USB 3.0 external hard drive for comprehensive code repositories, virtual machine disks, and system images.', '1TB • USB 3.0 • 2.5-inch Bus Powered', 4299.00, 5499.00, 18, 4.6, 110, 'external_hdd.jpg'),
(2, 1, 'Cosmic Byte Meteoroid RGB Laptop Cooling Pad', 'Six silent cooling fans with dynamic RGB lighting and adjustable ergonomic height levels for prolonged compilation sessions.', '6 Fans • Dual USB • 7 Height Levels', 1199.00, 1799.00, 30, 4.3, 64, 'cooling_pad.jpg'),
(2, 1, 'TP-Link Nano USB Wi-Fi Adapter (TL-WN725N)', 'Ultra-compact 150Mbps wireless N nano adapter with soft AP mode support, compatible with Linux, Windows, and Raspberry Pi.', '150Mbps • 2.4GHz • Miniature Plug-in', 499.00, 799.00, 45, 4.4, 153, 'wifi_adapter.jpg'),
(2, 1, 'AmazonBasics Ergonomic Vertical Mouse', 'Ergonomic vertical wireless mouse engineered to promote neutral wrist alignment and reduce strain during long programming marathons.', 'Wireless 2.4GHz • Ergonomic 60° Angle • 1600 DPI', 899.00, 1399.00, 7, 4.2, 38, 'vertical_mouse.jpg'),

-- Category 2: Audio & Wearables (Seller: 2 - Campus Tech Store)
(2, 2, 'Noise ColorFit Pulse 2 Smartwatch', '1.8-inch bright TFT display with 24/7 heart rate and SpO2 tracking, sleep analysis, and 10-day battery life for active student schedules.', '1.8" Display • SpO2 & HRM • 10-Day Battery', 1499.00, 2999.00, 35, 4.3, 180, 'smartwatch.jpg'),
(2, 2, 'Sony WH-CH520 Wireless Bluetooth Headphones', 'Lightweight on-ear wireless headset featuring 50-hour battery life, DSEE audio enhancement, and multipoint Bluetooth connection.', '50h Battery • DSEE • Multipoint Pairing', 4490.00, 4990.00, 14, 4.7, 95, 'sony_headphones.jpg'),
(2, 2, 'JBL Go 3 Portable Waterproof Bluetooth Speaker', 'Compact IP67 dustproof and waterproof speaker with punchy JBL Pro Sound and integrated carry loop for hostel rooms and study groups.', 'IP67 Waterproof • 5h Playtime • Bluetooth 5.1', 2999.00, 3999.00, 22, 4.6, 140, 'bluetooth_speaker.jpg'),
(2, 2, 'Realme Buds Air 3 Neo ANC Earbuds', 'True wireless earbuds featuring 30-hour total playback, AI environmental noise cancellation for crystal clear lab calls, and 10mm bass drivers.', 'AI ENC Mic • 30h Playback • IPX5 Splashproof', 1999.00, 3499.00, 40, 4.4, 115, 'tws_earbuds.jpg'),
(2, 2, 'Mi Smart Band 6 Fitness Tracker', 'Vibrant AMOLED touch screen with 30 fitness tracking modes, continuous blood oxygen monitoring, and 50m water resistance.', '1.56" AMOLED • 5ATM Water Resistant • 14-Day Battery', 2499.00, 3999.00, 5, 4.5, 220, 'fitness_band.jpg'),

-- Category 3: CS & Engineering Books (Seller: 3 - Stationery & Books Hub)
(3, 3, 'Computer Networks (Tanenbaum & Wetherall) 5th Edition', 'The authoritative textbook covering OSI models, TCP/IP protocol suite, routing algorithms, network security, and modern wireless protocols.', 'Paperback • 960 Pages • Pearson Education', 875.00, 1099.00, 15, 4.7, 88, 'book_networks.jpg'),
(3, 3, 'Designing Data-Intensive Applications (Martin Kleppmann)', 'The definitive guide to storage engines, distributed consensus, data modeling, batch processing, and streaming architectures.', 'Paperback • 616 Pages • O\'Reilly Media', 1450.00, 1850.00, 20, 4.9, 165, 'book_ddia.jpg'),
(3, 3, 'Clean Code: A Handbook of Agile Software Craftsmanship', 'Robert C. Martin\'s legendary guide on clean code principles, refactoring patterns, unit testing paradigms, and meaningful naming conventions.', 'Paperback • 464 Pages • Prentice Hall', 799.00, 999.00, 28, 4.8, 210, 'book_cleancode.jpg'),
(3, 3, 'Artificial Intelligence: A Modern Approach (Russell & Norvig)', 'Comprehensive coverage of search algorithms, probabilistic reasoning, machine learning, deep neural networks, and reinforcement learning.', 'Paperback • 4th Edition • 1152 Pages • Pearson', 1250.00, 1599.00, 6, 4.8, 74, 'book_ai.jpg'),
(3, 3, 'Computer Organization and Architecture (William Stallings)', 'Deep dive into CPU pipelining, cache memory hierarchies, instruction set architecture, RISC-V, and parallel processor designs.', 'Paperback • 11th Edition • 880 Pages • Pearson', 920.00, 1195.00, 13, 4.6, 52, 'book_coa.jpg'),

-- Category 4: Lab & DIY Hardware (Seller: 2 - Campus Tech Store)
(2, 4, 'Soldron 25W High Quality Soldering Iron Kit', 'Ergonomic 25W heating element with nickel-plated pointed bit, safety stand, resin core solder wire, and desoldering wick for lab prototyping.', '25W • Pointed Copper Bit • Safety Stand Included', 480.00, 650.00, 26, 4.5, 93, 'soldering_iron.jpg'),
(2, 4, 'Digital Multimeter DT830D with Test Probes', 'Compact digital multimeter for measuring DC/AC voltage, DC current, resistance, diode forward drop, and continuity buzzer testing.', 'LCD Display • Continuity Buzzer • Transistor hFE', 320.00, 499.00, 38, 4.2, 112, 'multimeter.jpg'),
(2, 4, 'Ultrasonic Sensor HC-SR04 with Mount Bracket', 'High-precision sonar distance measuring module (2cm to 400cm) with 5V trigger and echo pins for robotics and obstacle avoidance projects.', '2cm–400cm Range • 5V DC • Acrylic Bracket', 149.00, 250.00, 60, 4.4, 82, 'sensor_ultrasonic.jpg'),
(2, 4, 'Raspberry Pi Pico RP2040 Microcontroller Board', 'High-performance dual-core ARM Cortex-M0+ development board supporting MicroPython, C/C++ SDK, and flexible programmable I/O.', 'Dual-Core RP2040 • 2MB Flash • 26 Multi-function GPIO', 420.00, 550.00, 4, 4.7, 145, 'pico_rp2040.jpg'),
(2, 4, 'SG90 9g Micro Servo Motor (Pack of 2)', 'Miniature 180-degree rotation servomotors with nylon gear set and control horns for robotic arms, pan-tilt mounts, and IoT mechanisms.', 'Pack of 2 • 1.6 kg/cm Torque • 4.8V–6V Operating', 280.00, 399.00, 32, 4.3, 68, 'servo_motor.jpg'),

-- Category 5: Campus & Stationery (Seller: 3 - Stationery & Books Hub)
(3, 5, 'Staedtler Mars Lumograph Technical Drawing Pencils (Set of 6)', 'Premium break-resistant graphite sketching and drafting pencils (2H, HB, B, 2B, 4B, 6B) for engineering graphics and design sketches.', 'Set of 6 Degrees • Super-bonded Lead • German Made', 399.00, 520.00, 24, 4.8, 76, 'pencils_set.jpg'),
(3, 5, 'Deli Heavy Duty Mesh Desk Organizer Caddy', 'Sturdy powder-coated metal mesh desktop organizer with 6 divided compartments and pull-out drawer for student pens, sticky notes, and flash drives.', '6 Compartments + Drawer • Powder-Coated Steel Mesh', 549.00, 799.00, 20, 4.6, 58, 'desk_organizer.jpg'),
(3, 5, 'Milton Thermosteel 750ml Insulated Water Bottle', 'Double-walled vacuum insulated 18/8 stainless steel bottle keeping beverages hot or cold for 24 hours during long college lecture days.', '750ml • 24h Hot/Cold • 18/8 Food Grade Steel', 799.00, 1090.00, 34, 4.7, 190, 'water_bottle.jpg'),
(3, 5, 'Wipro Garnet 6W Rechargeable LED Desk Lamp', 'Touch-controlled flexible gooseneck study lamp with 3 color temperatures (warm, natural, white) and dimmable brightness for late-night dorm study.', '3 Color Modes • Rechargeable Battery • Eye-Care Diffuser', 949.00, 1499.00, 16, 4.5, 84, 'desk_lamp.jpg'),
(3, 5, 'Post-it Notes Cube & Color Index Flags Combo', 'Self-adhesive 400-sheet pastel note cube with 100 colorful index tabs for marking critical textbook chapters, exam notes, and formula sheets.', '400 Sheets Cube + 100 Index Flags • Repositionable', 249.00, 349.00, 8, 4.4, 110, 'sticky_notes.jpg'),

-- Category 6: Casual Wear (Seller: 2 - Campus Style Studio)
(2, 6, 'Washed Cotton Cargo Joggers', 'Relaxed-fit utility cargo pants crafted from durable stretch cotton twill with six functional pockets and elasticated cuffs for daily campus wear.', '97% Cotton 3% Spandex • 6 Utility Pockets • Relaxed Cut', 1399.00, 1999.00, 27, 4.5, 92, 'cargo_joggers.jpg'),
(2, 6, 'Vintage Heavyweight Boxy Hoodie', 'Thick 380 GSM fleece hoodie with double-layer drawstring hood, kangaroo pouch pocket, and drop-shoulder relaxed silhouette.', '380 GSM Brushed Fleece • Drop Shoulder • Double Hood', 1699.00, 2499.00, 19, 4.7, 134, 'heavy_hoodie.jpg'),
(2, 6, 'Classic Pique Knit Polo T-Shirt', 'Breathable combed cotton pique polo shirt with two-button placket, ribbed collar, and side vents for effortless weekend and club styling.', '100% Combed Pique Cotton • Ribbed Collar • Regular Fit', 699.00, 999.00, 33, 4.4, 78, 'polo_shirt.jpg'),
(2, 6, 'Minimalist Campus Canvas Backpack', 'Water-repellent 24L canvas backpack with padded 15.6-inch laptop compartment, hidden anti-theft back pocket, and reinforced shoulder straps.', '24L Capacity • 15.6" Laptop Sleeve • Water-Repellent', 1299.00, 1899.00, 5, 4.6, 115, 'canvas_backpack.jpg'),
(2, 6, 'Relaxed Linen Blend Casual Shorts', 'Lightweight breathable linen-cotton blend shorts with an adjustable elastic drawstring waistband and dual slash pockets for summer comfort.', '55% Linen 45% Cotton • Elastic Drawstring • 7-Inch Inseam', 799.00, 1199.00, 25, 4.3, 49, 'linen_shorts.jpg'),

-- Category 7: Formal & Evening (Seller: 2 - Campus Style Studio)
(2, 7, 'Tailored Slim Fit Navy Blazer', 'Single-breasted two-button blazer woven from wrinkle-resistant poly-viscose blend with notch lapels and interior passport pocket for campus placements.', 'Poly-Viscose Blend • Notch Lapel • Placement Ready', 3299.00, 4999.00, 11, 4.8, 86, 'navy_blazer.jpg'),
(2, 7, 'Crisp White Formal Dress Shirt', 'Semi-spread collar formal shirt crafted from 100% long-staple cotton with a natural luster, mother-of-pearl buttons, and stain-resistant finish.', '100% Long-Staple Cotton • Semi-Spread Collar • Easy Iron', 1199.00, 1699.00, 29, 4.6, 104, 'white_formal_shirt.jpg'),
(2, 7, 'Flat-Front Tailored Formal Trousers', 'Modern flat-front dress trousers with active stretch waistband, clean pressed crease, and concealed coin pocket for corporate interviews.', 'Stretch Poly-Wool Touch • Active Flex Waist • Pressed Crease', 1499.00, 2199.00, 22, 4.5, 67, 'formal_trousers.jpg'),
(2, 7, 'Silk Jacquard Classic Necktie & Pocket Square Set', 'Hand-stitched micro-pattern silk tie paired with a matching pocket square, designed to accent formal suits for conferences and valedictory dinners.', '100% Jacquard Silk • 3-Inch Width • Matching Pocket Square', 599.00, 999.00, 9, 4.7, 42, 'silk_tie_set.jpg'),

-- Category 8: Outerwear & Jackets (Seller: 2 - Campus Style Studio)
(2, 8, 'Vintage Washed Denim Trucker Jacket', 'Classic 13 oz rugged blue denim trucker jacket with buttoned flap chest pockets, adjustable waist tabs, and vintage brass hardware.', '100% Cotton Denim • 13 oz Heavyweight • Brass Shank Buttons', 2299.00, 3299.00, 15, 4.7, 98, 'denim_jacket.jpg'),
(2, 8, 'Urban Windproof Lightweight Bomber Jacket', 'Water-resistant matte nylon shell with ribbed collar and cuffs, contrast orange inner lining, and utility zippered sleeve pocket.', 'Water-Resistant Nylon • Rib-Knit Trim • Utility Sleeve Pocket', 1899.00, 2699.00, 21, 4.5, 73, 'bomber_jacket.jpg'),
(2, 8, 'Thermal Quilted Puffer Vest', 'Sleeveless lightweight insulated puffer vest with stand collar, fleece-lined hand pockets, and water-repellent micro-ripstop exterior.', 'Faux Down Insulation • Stand Collar • Ultra Lightweight', 1599.00, 2299.00, 18, 4.4, 54, 'puffer_vest.jpg'),
(2, 8, 'Waterproof Hooded Softshell Rain Jacket', 'Breathable 5000mm waterproof softshell jacket with taped seams, adjustable storm hood, and zippered ventilation pockets for monsoon campus walks.', '5000mm Waterproof • Breathable Membrane • Taped Seams', 2499.00, 3499.00, 6, 4.6, 61, 'rain_jacket.jpg');
