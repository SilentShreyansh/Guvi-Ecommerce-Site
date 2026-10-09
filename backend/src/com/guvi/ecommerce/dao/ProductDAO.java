package com.guvi.ecommerce.dao;

import com.guvi.ecommerce.model.Product;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.stream.Collectors;

public class ProductDAO {

    private static final Map<Integer, Product> memoryProducts = new ConcurrentHashMap<>();
    private static final AtomicInteger idGen = new AtomicInteger(100);

    static {
        seed(1, 2, "Campus Tech Store", 1, "Computer Peripherals", "Logitech B100 Optical USB Mouse",
             "Reliable wired optical mouse with 800 DPI tracking and ambidextrous shape. Ideal for programming and lab workstations.",
             "Wired USB • 800 DPI • 3-Button", 349.00, 499.00, 28, 4.4, 86, "mouse.jpg");

        seed(2, 2, "Campus Tech Store", 1, "Computer Peripherals", "SanDisk Ultra 128GB USB 3.0 Flash Drive",
             "High-speed flash drive with up to 130MB/s transfer speed. Durable sliding design for OS boots and code backups.",
             "128GB • USB 3.0 • Up to 130MB/s", 799.00, 1150.00, 42, 4.5, 114, "pendrive.jpg");

        seed(3, 2, "Campus Tech Store", 1, "Computer Peripherals", "TVS-e Bharat Gold Mechanical Keyboard",
             "Long-lasting mechanical keyboard with genuine mechanical switches for tactile coding experience and typing comfort.",
             "Mechanical Switches • USB • 104 Keys", 2499.00, 3199.00, 12, 4.7, 53, "keyboard.jpg");

        seed(4, 2, "Campus Tech Store", 1, "Computer Peripherals", "Portronics 4-Port USB 3.0 Hub with Switch",
             "Compact 4-port USB hub with individual power switches and LED indicators. Connect multiple flash drives and lab boards.",
             "4 Ports • 5Gbps • Individual Switches", 499.00, 899.00, 19, 4.2, 41, "usbhub.jpg");

        seed(5, 2, "Campus Tech Store", 2, "Audio & Wearables", "boAt Rockerz 450 Bluetooth On-Ear Headphones",
             "Over-ear wireless headphones with 40mm drivers, 15 hours battery backup, and padded ear cushions for long study sessions.",
             "Bluetooth 5.0 • 40mm Drivers • 15h Battery", 1299.00, 1990.00, 24, 4.3, 210, "headphones.jpg");

        seed(6, 2, "Campus Tech Store", 2, "Audio & Wearables", "Boult Audio Bassbuds Wired In-Ear Earphones",
             "In-ear earphones with noise-isolating design, in-line microphone, and braided tangle-free cable.",
             "3.5mm Jack • In-line Mic • Deep Bass", 349.00, 699.00, 50, 4.1, 78, "earphones.jpg");

        seed(7, 3, "Stationery & Books Hub", 3, "CS & Engineering Books", "Introduction to Algorithms (CLRS) 4th Edition",
             "The standard reference for algorithms and data structures courses worldwide. Essential for competitive programming and CS interviews.",
             "Paperback • 1312 Pages • MIT Press", 1150.00, 1499.00, 16, 4.8, 142, "book_clrs.jpg");

        seed(8, 3, "Stationery & Books Hub", 3, "CS & Engineering Books", "Operating System Concepts (Silberschatz)",
             "Comprehensive guide on memory management, virtualization, process synchronization, and Linux/Unix kernel architecture.",
             "Paperback • 10th Edition • Wiley", 890.00, 1195.00, 11, 4.6, 67, "book_os.jpg");

        seed(9, 3, "Stationery & Books Hub", 3, "CS & Engineering Books", "Database System Concepts (Korth & Sudarshan)",
             "Fundamentals of relational databases, SQL, normalization, concurrency control, and transaction processing.",
             "Paperback • 7th Edition • McGraw Hill", 820.00, 995.00, 14, 4.5, 59, "book_db.jpg");

        seed(10, 2, "Campus Tech Store", 4, "Lab & DIY Hardware", "Raspberry Pi 4 Model B (4GB RAM)",
             "Quad-core 64-bit ARM processor, dual micro-HDMI 4K outputs, Gigabit Ethernet, and 40-pin GPIO for IoT and system programming.",
             "Broadcom BCM2711 • 4GB LPDDR4 • USB-C", 5499.00, 6200.00, 8, 4.9, 95, "raspberrypi.jpg");

        seed(11, 2, "Campus Tech Store", 4, "Lab & DIY Hardware", "Arduino Uno R3 Starter Kit with Breadboard",
             "Original ATmega328P microcontroller board bundled with breadboard, jumper wires, resistors, LEDs, and basic sensors.",
             "ATmega328P • 14 Digital I/O • USB Cable", 1450.00, 1850.00, 22, 4.6, 88, "arduino.jpg");

        seed(12, 2, "Campus Tech Store", 4, "Lab & DIY Hardware", "ESP32 Wi-Fi + Bluetooth IoT Development Board",
             "Dual-core 240MHz microcontroller with integrated 802.11 b/g/n Wi-Fi and BLE. Perfect for cloud and embedded projects.",
             "ESP-WROOM-32 • Micro-USB • 30 Pins", 420.00, 599.00, 35, 4.4, 62, "esp32.jpg");

        seed(13, 3, "Stationery & Books Hub", 5, "Campus & Stationery", "Casio FX-991EX ClassWiz Scientific Calculator",
             "High-resolution display, 552 functions, matrix, spreadsheet, equation solver, and QR code visualization. Permitted in university exams.",
             "552 Functions • Dual Power • Natural Display", 1495.00, 1795.00, 30, 4.8, 310, "calculator.jpg");

        seed(14, 3, "Stationery & Books Hub", 5, "Campus & Stationery", "Classmate Pulse Spiral Notebook (Pack of 4)",
             "A4 size 300-page unruled spiral notebook with thick 70 GSM paper for clean lecture notes and diagram sketching.",
             "A4 • 300 Pages • 70 GSM • Spiral Bound", 380.00, 480.00, 45, 4.5, 94, "notebook.jpg");

        seed(15, 3, "Stationery & Books Hub", 5, "Campus & Stationery", "Parker Vector Standard CT Rollerball Pen",
             "Classic student fountain/rollerball pen with stainless steel trim and smooth ink flow for university examinations.",
             "Fine Nib • Blue Ink • Stainless Steel Clip", 320.00, 399.00, 18, 4.3, 49, "parkerpen.jpg");

        seed(16, 2, "Campus Style Studio", 6, "Casual Wear", "Classic Casual T-Shirt",
             "Premium heavyweight combed cotton t-shirt with a relaxed boxy cut, ribbed crew collar, and ultra-soft breathable feel. Perfect for daily campus wear and minimal styling.",
             "100% Combed Cotton • 220 GSM • Relaxed Fit", 349.00, 499.00, 38, 4.4, 86, "tshirt_casual.jpg");

        seed(17, 2, "Campus Style Studio", 8, "Outerwear & Jackets", "Meridian Oversized Wool Coat",
             "Architectural simplicity meets cold-weather luxury. Crafted from a premium Italian wool blend, this double-breasted oversized silhouette delivers exceptional warmth and effortless minimalism.",
             "70% Wool • 600G/M² • Italian Blend • Double Breasted", 4499.00, 6999.00, 14, 4.8, 124, "wool_coat.jpg");

        seed(18, 2, "Campus Style Studio", 6, "Casual Wear", "One Life Graphic Streetwear T-Shirt",
             "Graphic t-shirt designed in an olive earthy palette with minimalist chest typography. Bio-washed for a vintage lived-in texture and zero shrinkage.",
             "100% Organic Cotton • Bio-Washed • Graphic Print", 599.00, 899.00, 45, 4.5, 98, "graphic_tshirt.jpg");

        seed(19, 2, "Campus Style Studio", 6, "Casual Wear", "Skinny Fit Stretch Denim Jeans",
             "Modern slim taper cut crafted from 12.5 oz durable indigo stretch denim with subtle whiskering and reinforced contrast copper rivets.",
             "98% Cotton 2% Elastane • 12.5oz • 5-Pocket", 1299.00, 1999.00, 26, 4.6, 142, "denim_jeans.jpg");

        seed(20, 2, "Campus Style Studio", 6, "Casual Wear", "Checkered Flannel Button-Down Shirt",
             "Timeless heritage buffalo plaid flannel shirt in rich crimson and charcoal. Brushed twill weave keeps you warm during late-night study sessions.",
             "100% Brushed Cotton Flannel • Regular Fit • Dual Chest Pockets", 899.00, 1299.00, 29, 4.3, 76, "checkered_shirt.jpg");

        seed(21, 2, "Campus Style Studio", 7, "Formal & Evening", "Vertical Striped Oxford Collar Shirt",
             "Tailored classic button-down shirt featuring crisp blue and white vertical pencil stripes. Easy-care wrinkle resistant finish ideal for presentations.",
             "100% Oxford Cotton • Button-Down Collar • Wrinkle-Resistant", 999.00, 1499.00, 31, 4.7, 118, "striped_shirt.jpg");

        // Category 1: Computer Peripherals
        seed(22, 2, "Campus Tech Store", 1, "Computer Peripherals", "Dell Pro 1080p FHD USB Webcam",
             "Full HD 1080p plug-and-play webcam with built-in noise-reducing microphone and privacy shutter for lab meetings and online lectures.",
             "1080p 30FPS • Dual Mic • Privacy Shutter", 1899.00, 2499.00, 25, 4.5, 72, "webcam.jpg");

        seed(23, 2, "Campus Tech Store", 1, "Computer Peripherals", "Seagate Expansion 1TB External Hard Drive",
             "Portable 2.5-inch USB 3.0 external hard drive for comprehensive code repositories, virtual machine disks, and system images.",
             "1TB • USB 3.0 • 2.5-inch Bus Powered", 4299.00, 5499.00, 18, 4.6, 110, "external_hdd.jpg");

        seed(24, 2, "Campus Tech Store", 1, "Computer Peripherals", "Cosmic Byte Meteoroid RGB Laptop Cooling Pad",
             "Six silent cooling fans with dynamic RGB lighting and adjustable ergonomic height levels for prolonged compilation sessions.",
             "6 Fans • Dual USB • 7 Height Levels", 1199.00, 1799.00, 30, 4.3, 64, "cooling_pad.jpg");

        seed(25, 2, "Campus Tech Store", 1, "Computer Peripherals", "TP-Link Nano USB Wi-Fi Adapter (TL-WN725N)",
             "Ultra-compact 150Mbps wireless N nano adapter with soft AP mode support, compatible with Linux, Windows, and Raspberry Pi.",
             "150Mbps • 2.4GHz • Miniature Plug-in", 499.00, 799.00, 45, 4.4, 153, "wifi_adapter.jpg");

        seed(26, 2, "Campus Tech Store", 1, "Computer Peripherals", "AmazonBasics Ergonomic Vertical Mouse",
             "Ergonomic vertical wireless mouse engineered to promote neutral wrist alignment and reduce strain during long programming marathons.",
             "Wireless 2.4GHz • Ergonomic 60° Angle • 1600 DPI", 899.00, 1399.00, 7, 4.2, 38, "vertical_mouse.jpg");

        // Category 2: Audio & Wearables
        seed(27, 2, "Campus Tech Store", 2, "Audio & Wearables", "Noise ColorFit Pulse 2 Smartwatch",
             "1.8-inch bright TFT display with 24/7 heart rate and SpO2 tracking, sleep analysis, and 10-day battery life for active student schedules.",
             "1.8\" Display • SpO2 & HRM • 10-Day Battery", 1499.00, 2999.00, 35, 4.3, 180, "smartwatch.jpg");

        seed(28, 2, "Campus Tech Store", 2, "Audio & Wearables", "Sony WH-CH520 Wireless Bluetooth Headphones",
             "Lightweight on-ear wireless headset featuring 50-hour battery life, DSEE audio enhancement, and multipoint Bluetooth connection.",
             "50h Battery • DSEE • Multipoint Pairing", 4490.00, 4990.00, 14, 4.7, 95, "sony_headphones.jpg");

        seed(29, 2, "Campus Tech Store", 2, "Audio & Wearables", "JBL Go 3 Portable Waterproof Bluetooth Speaker",
             "Compact IP67 dustproof and waterproof speaker with punchy JBL Pro Sound and integrated carry loop for hostel rooms and study groups.",
             "IP67 Waterproof • 5h Playtime • Bluetooth 5.1", 2999.00, 3999.00, 22, 4.6, 140, "bluetooth_speaker.jpg");

        seed(30, 2, "Campus Tech Store", 2, "Audio & Wearables", "Realme Buds Air 3 Neo ANC Earbuds",
             "True wireless earbuds featuring 30-hour total playback, AI environmental noise cancellation for crystal clear lab calls, and 10mm bass drivers.",
             "AI ENC Mic • 30h Playback • IPX5 Splashproof", 1999.00, 3499.00, 40, 4.4, 115, "tws_earbuds.jpg");

        seed(31, 2, "Campus Tech Store", 2, "Audio & Wearables", "Mi Smart Band 6 Fitness Tracker",
             "Vibrant AMOLED touch screen with 30 fitness tracking modes, continuous blood oxygen monitoring, and 50m water resistance.",
             "1.56\" AMOLED • 5ATM Water Resistant • 14-Day Battery", 2499.00, 3999.00, 5, 4.5, 220, "fitness_band.jpg");

        // Category 3: CS & Engineering Books
        seed(32, 3, "Stationery & Books Hub", 3, "CS & Engineering Books", "Computer Networks (Tanenbaum & Wetherall) 5th Edition",
             "The authoritative textbook covering OSI models, TCP/IP protocol suite, routing algorithms, network security, and modern wireless protocols.",
             "Paperback • 960 Pages • Pearson Education", 875.00, 1099.00, 15, 4.7, 88, "book_networks.jpg");

        seed(33, 3, "Stationery & Books Hub", 3, "CS & Engineering Books", "Designing Data-Intensive Applications (Martin Kleppmann)",
             "The definitive guide to storage engines, distributed consensus, data modeling, batch processing, and streaming architectures.",
             "Paperback • 616 Pages • O'Reilly Media", 1450.00, 1850.00, 20, 4.9, 165, "book_ddia.jpg");

        seed(34, 3, "Stationery & Books Hub", 3, "CS & Engineering Books", "Clean Code: A Handbook of Agile Software Craftsmanship",
             "Robert C. Martin's legendary guide on clean code principles, refactoring patterns, unit testing paradigms, and meaningful naming conventions.",
             "Paperback • 464 Pages • Prentice Hall", 799.00, 999.00, 28, 4.8, 210, "book_cleancode.jpg");

        seed(35, 3, "Stationery & Books Hub", 3, "CS & Engineering Books", "Artificial Intelligence: A Modern Approach (Russell & Norvig)",
             "Comprehensive coverage of search algorithms, probabilistic reasoning, machine learning, deep neural networks, and reinforcement learning.",
             "Paperback • 4th Edition • 1152 Pages • Pearson", 1250.00, 1599.00, 6, 4.8, 74, "book_ai.jpg");

        seed(36, 3, "Stationery & Books Hub", 3, "CS & Engineering Books", "Computer Organization and Architecture (William Stallings)",
             "Deep dive into CPU pipelining, cache memory hierarchies, instruction set architecture, RISC-V, and parallel processor designs.",
             "Paperback • 11th Edition • 880 Pages • Pearson", 920.00, 1195.00, 13, 4.6, 52, "book_coa.jpg");

        // Category 4: Lab & DIY Hardware
        seed(37, 2, "Campus Tech Store", 4, "Lab & DIY Hardware", "Soldron 25W High Quality Soldering Iron Kit",
             "Ergonomic 25W heating element with nickel-plated pointed bit, safety stand, resin core solder wire, and desoldering wick for lab prototyping.",
             "25W • Pointed Copper Bit • Safety Stand Included", 480.00, 650.00, 26, 4.5, 93, "soldering_iron.jpg");

        seed(38, 2, "Campus Tech Store", 4, "Lab & DIY Hardware", "Digital Multimeter DT830D with Test Probes",
             "Compact digital multimeter for measuring DC/AC voltage, DC current, resistance, diode forward drop, and continuity buzzer testing.",
             "LCD Display • Continuity Buzzer • Transistor hFE", 320.00, 499.00, 38, 4.2, 112, "multimeter.jpg");

        seed(39, 2, "Campus Tech Store", 4, "Lab & DIY Hardware", "Ultrasonic Sensor HC-SR04 with Mount Bracket",
             "High-precision sonar distance measuring module (2cm to 400cm) with 5V trigger and echo pins for robotics and obstacle avoidance projects.",
             "2cm–400cm Range • 5V DC • Acrylic Bracket", 149.00, 250.00, 60, 4.4, 82, "sensor_ultrasonic.jpg");

        seed(40, 2, "Campus Tech Store", 4, "Lab & DIY Hardware", "Raspberry Pi Pico RP2040 Microcontroller Board",
             "High-performance dual-core ARM Cortex-M0+ development board supporting MicroPython, C/C++ SDK, and flexible programmable I/O.",
             "Dual-Core RP2040 • 2MB Flash • 26 Multi-function GPIO", 420.00, 550.00, 4, 4.7, 145, "pico_rp2040.jpg");

        seed(41, 2, "Campus Tech Store", 4, "Lab & DIY Hardware", "SG90 9g Micro Servo Motor (Pack of 2)",
             "Miniature 180-degree rotation servomotors with nylon gear set and control horns for robotic arms, pan-tilt mounts, and IoT mechanisms.",
             "Pack of 2 • 1.6 kg/cm Torque • 4.8V–6V Operating", 280.00, 399.00, 32, 4.3, 68, "servo_motor.jpg");

        // Category 5: Campus & Stationery
        seed(42, 3, "Stationery & Books Hub", 5, "Campus & Stationery", "Staedtler Mars Lumograph Technical Drawing Pencils (Set of 6)",
             "Premium break-resistant graphite sketching and drafting pencils (2H, HB, B, 2B, 4B, 6B) for engineering graphics and design sketches.",
             "Set of 6 Degrees • Super-bonded Lead • German Made", 399.00, 520.00, 24, 4.8, 76, "pencils_set.jpg");

        seed(43, 3, "Stationery & Books Hub", 5, "Campus & Stationery", "Deli Heavy Duty Mesh Desk Organizer Caddy",
             "Sturdy powder-coated metal mesh desktop organizer with 6 divided compartments and pull-out drawer for student pens, sticky notes, and flash drives.",
             "6 Compartments + Drawer • Powder-Coated Steel Mesh", 549.00, 799.00, 20, 4.6, 58, "desk_organizer.jpg");

        seed(44, 3, "Stationery & Books Hub", 5, "Campus & Stationery", "Milton Thermosteel 750ml Insulated Water Bottle",
             "Double-walled vacuum insulated 18/8 stainless steel bottle keeping beverages hot or cold for 24 hours during long college lecture days.",
             "750ml • 24h Hot/Cold • 18/8 Food Grade Steel", 799.00, 1090.00, 34, 4.7, 190, "water_bottle.jpg");

        seed(45, 3, "Stationery & Books Hub", 5, "Campus & Stationery", "Wipro Garnet 6W Rechargeable LED Desk Lamp",
             "Touch-controlled flexible gooseneck study lamp with 3 color temperatures (warm, natural, white) and dimmable brightness for late-night dorm study.",
             "3 Color Modes • Rechargeable Battery • Eye-Care Diffuser", 949.00, 1499.00, 16, 4.5, 84, "desk_lamp.jpg");

        seed(46, 3, "Stationery & Books Hub", 5, "Campus & Stationery", "Post-it Notes Cube & Color Index Flags Combo",
             "Self-adhesive 400-sheet pastel note cube with 100 colorful index tabs for marking critical textbook chapters, exam notes, and formula sheets.",
             "400 Sheets Cube + 100 Index Flags • Repositionable", 249.00, 349.00, 8, 4.4, 110, "sticky_notes.jpg");

        // Category 6: Casual Wear
        seed(47, 2, "Campus Style Studio", 6, "Casual Wear", "Washed Cotton Cargo Joggers",
             "Relaxed-fit utility cargo pants crafted from durable stretch cotton twill with six functional pockets and elasticated cuffs for daily campus wear.",
             "97% Cotton 3% Spandex • 6 Utility Pockets • Relaxed Cut", 1399.00, 1999.00, 27, 4.5, 92, "cargo_joggers.jpg");

        seed(48, 2, "Campus Style Studio", 6, "Casual Wear", "Vintage Heavyweight Boxy Hoodie",
             "Thick 380 GSM fleece hoodie with double-layer drawstring hood, kangaroo pouch pocket, and drop-shoulder relaxed silhouette.",
             "380 GSM Brushed Fleece • Drop Shoulder • Double Hood", 1699.00, 2499.00, 19, 4.7, 134, "heavy_hoodie.jpg");

        seed(49, 2, "Campus Style Studio", 6, "Casual Wear", "Classic Pique Knit Polo T-Shirt",
             "Breathable combed cotton pique polo shirt with two-button placket, ribbed collar, and side vents for effortless weekend and club styling.",
             "100% Combed Pique Cotton • Ribbed Collar • Regular Fit", 699.00, 999.00, 33, 4.4, 78, "polo_shirt.jpg");

        seed(50, 2, "Campus Style Studio", 6, "Casual Wear", "Minimalist Campus Canvas Backpack",
             "Water-repellent 24L canvas backpack with padded 15.6-inch laptop compartment, hidden anti-theft back pocket, and reinforced shoulder straps.",
             "24L Capacity • 15.6\" Laptop Sleeve • Water-Repellent", 1299.00, 1899.00, 5, 4.6, 115, "canvas_backpack.jpg");

        seed(51, 2, "Campus Style Studio", 6, "Casual Wear", "Relaxed Linen Blend Casual Shorts",
             "Lightweight breathable linen-cotton blend shorts with an adjustable elastic drawstring waistband and dual slash pockets for summer comfort.",
             "55% Linen 45% Cotton • Elastic Drawstring • 7-Inch Inseam", 799.00, 1199.00, 25, 4.3, 49, "linen_shorts.jpg");

        // Category 7: Formal & Evening
        seed(52, 2, "Campus Style Studio", 7, "Formal & Evening", "Tailored Slim Fit Navy Blazer",
             "Single-breasted two-button blazer woven from wrinkle-resistant poly-viscose blend with notch lapels and interior passport pocket for campus placements.",
             "Poly-Viscose Blend • Notch Lapel • Placement Ready", 3299.00, 4999.00, 11, 4.8, 86, "navy_blazer.jpg");

        seed(53, 2, "Campus Style Studio", 7, "Formal & Evening", "Crisp White Formal Dress Shirt",
             "Semi-spread collar formal shirt crafted from 100% long-staple cotton with a natural luster, mother-of-pearl buttons, and stain-resistant finish.",
             "100% Long-Staple Cotton • Semi-Spread Collar • Easy Iron", 1199.00, 1699.00, 29, 4.6, 104, "white_formal_shirt.jpg");

        seed(54, 2, "Campus Style Studio", 7, "Formal & Evening", "Flat-Front Tailored Formal Trousers",
             "Modern flat-front dress trousers with active stretch waistband, clean pressed crease, and concealed coin pocket for corporate interviews.",
             "Stretch Poly-Wool Touch • Active Flex Waist • Pressed Crease", 1499.00, 2199.00, 22, 4.5, 67, "formal_trousers.jpg");

        seed(55, 2, "Campus Style Studio", 7, "Formal & Evening", "Silk Jacquard Classic Necktie & Pocket Square Set",
             "Hand-stitched micro-pattern silk tie paired with a matching pocket square, designed to accent formal suits for conferences and valedictory dinners.",
             "100% Jacquard Silk • 3-Inch Width • Matching Pocket Square", 599.00, 999.00, 9, 4.7, 42, "silk_tie_set.jpg");

        // Category 8: Outerwear & Jackets
        seed(56, 2, "Campus Style Studio", 8, "Outerwear & Jackets", "Vintage Washed Denim Trucker Jacket",
             "Classic 13 oz rugged blue denim trucker jacket with buttoned flap chest pockets, adjustable waist tabs, and vintage brass hardware.",
             "100% Cotton Denim • 13 oz Heavyweight • Brass Shank Buttons", 2299.00, 3299.00, 15, 4.7, 98, "denim_jacket.jpg");

        seed(57, 2, "Campus Style Studio", 8, "Outerwear & Jackets", "Urban Windproof Lightweight Bomber Jacket",
             "Water-resistant matte nylon shell with ribbed collar and cuffs, contrast orange inner lining, and utility zippered sleeve pocket.",
             "Water-Resistant Nylon • Rib-Knit Trim • Utility Sleeve Pocket", 1899.00, 2699.00, 21, 4.5, 73, "bomber_jacket.jpg");

        seed(58, 2, "Campus Style Studio", 8, "Outerwear & Jackets", "Thermal Quilted Puffer Vest",
             "Sleeveless lightweight insulated puffer vest with stand collar, fleece-lined hand pockets, and water-repellent micro-ripstop exterior.",
             "Faux Down Insulation • Stand Collar • Ultra Lightweight", 1599.00, 2299.00, 18, 4.4, 54, "puffer_vest.jpg");

        seed(59, 2, "Campus Style Studio", 8, "Outerwear & Jackets", "Waterproof Hooded Softshell Rain Jacket",
             "Breathable 5000mm waterproof softshell jacket with taped seams, adjustable storm hood, and zippered ventilation pockets for monsoon campus walks.",
             "5000mm Waterproof • Breathable Membrane • Taped Seams", 2499.00, 3499.00, 6, 4.6, 61, "rain_jacket.jpg");
    }

    private static void seed(int id, int sellerId, String sellerName, int catId, String catName, String name,
                             String desc, String specs, double price, double mrp, int stock, double rating, int reviews, String img) {
        Product p = new Product();
        p.setProductId(id);
        p.setSellerId(sellerId);
        p.setSellerName(sellerName);
        p.setCategoryId(catId);
        p.setCategoryName(catName);
        p.setName(name);
        p.setDescription(desc);
        p.setShortSpecs(specs);
        p.setPrice(price);
        p.setMrp(mrp);
        p.setStockQuantity(stock);
        p.setRating(rating);
        p.setReviewCount(reviews);
        p.setImageUrl(img);
        p.setActive(true);
        p.setCreatedAt(new Timestamp(System.currentTimeMillis()));
        memoryProducts.put(id, p);
    }

    public List<Product> getProducts(Integer categoryId, String search, Double minPrice, Double maxPrice, Boolean inStockOnly, String sort) {
        Connection conn = DBConnection.getConnection();
        if (conn != null) {
            List<Product> list = new ArrayList<>();
            StringBuilder sql = new StringBuilder(
                "SELECT p.*, c.name as category_name, u.full_name as seller_name " +
                "FROM products p " +
                "JOIN categories c ON p.category_id = c.category_id " +
                "JOIN users u ON p.seller_id = u.user_id " +
                "WHERE p.is_active = TRUE "
            );
            List<Object> params = new ArrayList<>();

            if (categoryId != null && categoryId > 0) {
                sql.append("AND p.category_id = ? ");
                params.add(categoryId);
            }
            if (search != null && !search.trim().isEmpty()) {
                sql.append("AND (LOWER(p.name) LIKE ? OR LOWER(p.short_specs) LIKE ? OR LOWER(p.description) LIKE ?) ");
                String term = "%" + search.trim().toLowerCase() + "%";
                params.add(term);
                params.add(term);
                params.add(term);
            }
            if (minPrice != null && minPrice >= 0) {
                sql.append("AND p.price >= ? ");
                params.add(minPrice);
            }
            if (maxPrice != null && maxPrice > 0) {
                sql.append("AND p.price <= ? ");
                params.add(maxPrice);
            }
            if (inStockOnly != null && inStockOnly) {
                sql.append("AND p.stock_quantity > 0 ");
            }

            if ("price_asc".equalsIgnoreCase(sort)) {
                sql.append("ORDER BY p.price ASC");
            } else if ("price_desc".equalsIgnoreCase(sort)) {
                sql.append("ORDER BY p.price DESC");
            } else if ("rating".equalsIgnoreCase(sort)) {
                sql.append("ORDER BY p.rating DESC");
            } else {
                sql.append("ORDER BY p.product_id ASC");
            }

            try (PreparedStatement stmt = conn.prepareStatement(sql.toString())) {
                for (int i = 0; i < params.size(); i++) {
                    stmt.setObject(i + 1, params.get(i));
                }
                try (ResultSet rs = stmt.executeQuery()) {
                    while (rs.next()) {
                        list.add(mapResultSetToProduct(rs));
                    }
                    return list;
                }
            } catch (SQLException e) {
                System.err.println("JDBC Error in getProducts: " + e.getMessage());
            } finally {
                DBConnection.closeConnection(conn);
            }
        }

        return memoryProducts.values().stream()
            .filter(Product::isActive)
            .filter(p -> categoryId == null || categoryId == 0 || p.getCategoryId() == categoryId)
            .filter(p -> {
                if (search == null || search.trim().isEmpty()) return true;
                String term = search.toLowerCase().trim();
                return p.getName().toLowerCase().contains(term) ||
                       p.getShortSpecs().toLowerCase().contains(term) ||
                       p.getDescription().toLowerCase().contains(term);
            })
            .filter(p -> minPrice == null || p.getPrice() >= minPrice)
            .filter(p -> maxPrice == null || maxPrice <= 0 || p.getPrice() <= maxPrice)
            .filter(p -> inStockOnly == null || !inStockOnly || p.getStockQuantity() > 0)
            .sorted((a, b) -> {
                if ("price_asc".equalsIgnoreCase(sort)) return Double.compare(a.getPrice(), b.getPrice());
                if ("price_desc".equalsIgnoreCase(sort)) return Double.compare(b.getPrice(), a.getPrice());
                if ("rating".equalsIgnoreCase(sort)) return Double.compare(b.getRating(), a.getRating());
                return Integer.compare(a.getProductId(), b.getProductId());
            })
            .collect(Collectors.toList());
    }

    public Product getProductById(int productId) {
        Connection conn = DBConnection.getConnection();
        if (conn != null) {
            String sql = "SELECT p.*, c.name as category_name, u.full_name as seller_name " +
                         "FROM products p " +
                         "JOIN categories c ON p.category_id = c.category_id " +
                         "JOIN users u ON p.seller_id = u.user_id " +
                         "WHERE p.product_id = ?";
            try (PreparedStatement stmt = conn.prepareStatement(sql)) {
                stmt.setInt(1, productId);
                try (ResultSet rs = stmt.executeQuery()) {
                    if (rs.next()) return mapResultSetToProduct(rs);
                }
            } catch (SQLException e) {
                System.err.println("JDBC Error in getProductById: " + e.getMessage());
            } finally {
                DBConnection.closeConnection(conn);
            }
        }
        return memoryProducts.get(productId);
    }

    public boolean addProduct(Product p) {
        Connection conn = DBConnection.getConnection();
        if (conn != null) {
            String sql = "INSERT INTO products (seller_id, category_id, name, description, short_specs, price, mrp, stock_quantity, rating, review_count, image_url, is_active) " +
                         "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
            try (PreparedStatement stmt = conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)) {
                stmt.setInt(1, p.getSellerId());
                stmt.setInt(2, p.getCategoryId());
                stmt.setString(3, p.getName());
                stmt.setString(4, p.getDescription());
                stmt.setString(5, p.getShortSpecs());
                stmt.setDouble(6, p.getPrice());
                stmt.setDouble(7, p.getMrp());
                stmt.setInt(8, p.getStockQuantity());
                stmt.setDouble(9, p.getRating() > 0 ? p.getRating() : 4.0);
                stmt.setInt(10, p.getReviewCount());
                stmt.setString(11, p.getImageUrl());
                stmt.setBoolean(12, true);

                int affected = stmt.executeUpdate();
                if (affected > 0) {
                    try (ResultSet rs = stmt.getGeneratedKeys()) {
                        if (rs.next()) p.setProductId(rs.getInt(1));
                    }
                    return true;
                }
            } catch (SQLException e) {
                System.err.println("JDBC Error in addProduct: " + e.getMessage());
            } finally {
                DBConnection.closeConnection(conn);
            }
        }

        int newId = idGen.incrementAndGet();
        p.setProductId(newId);
        p.setActive(true);
        p.setCreatedAt(new Timestamp(System.currentTimeMillis()));
        memoryProducts.put(newId, p);
        return true;
    }

    public synchronized boolean updateStock(int productId, int quantityDeduction) {
        if (quantityDeduction <= 0) return false;
        Connection conn = DBConnection.getConnection();
        if (conn != null) {
            String sql = "UPDATE products SET stock_quantity = stock_quantity - ? WHERE product_id = ? AND stock_quantity >= ?";
            try (PreparedStatement stmt = conn.prepareStatement(sql)) {
                stmt.setInt(1, quantityDeduction);
                stmt.setInt(2, productId);
                stmt.setInt(3, quantityDeduction);
                return stmt.executeUpdate() > 0;
            } catch (SQLException e) {
                System.err.println("JDBC Error in updateStock: " + e.getMessage());
            } finally {
                DBConnection.closeConnection(conn);
            }
        }

        Product p = memoryProducts.get(productId);
        if (p != null) {
            synchronized (p) {
                if (p.getStockQuantity() >= quantityDeduction) {
                    p.setStockQuantity(p.getStockQuantity() - quantityDeduction);
                    return true;
                }
            }
        }
        return false;
    }

    public synchronized boolean addStock(int productId, int quantityToAdd) {
        return adjustStock(productId, quantityToAdd);
    }

    public synchronized boolean adjustStock(int productId, int delta) {
        Connection conn = DBConnection.getConnection();
        if (conn != null) {
            String sql = "UPDATE products SET stock_quantity = GREATEST(0, stock_quantity + ?) WHERE product_id = ?";
            try (PreparedStatement stmt = conn.prepareStatement(sql)) {
                stmt.setInt(1, delta);
                stmt.setInt(2, productId);
                return stmt.executeUpdate() > 0;
            } catch (SQLException e) {
                System.err.println("JDBC Error in adjustStock: " + e.getMessage());
            } finally {
                DBConnection.closeConnection(conn);
            }
        }
        Product p = memoryProducts.get(productId);
        if (p != null) {
            synchronized (p) {
                p.setStockQuantity(Math.max(0, p.getStockQuantity() + delta));
                return true;
            }
        }
        return false;
    }

    public synchronized boolean setStock(int productId, int newStock) {
        if (newStock < 0) newStock = 0;
        Connection conn = DBConnection.getConnection();
        if (conn != null) {
            String sql = "UPDATE products SET stock_quantity = ? WHERE product_id = ?";
            try (PreparedStatement stmt = conn.prepareStatement(sql)) {
                stmt.setInt(1, newStock);
                stmt.setInt(2, productId);
                return stmt.executeUpdate() > 0;
            } catch (SQLException e) {
                System.err.println("JDBC Error in setStock: " + e.getMessage());
            } finally {
                DBConnection.closeConnection(conn);
            }
        }
        Product p = memoryProducts.get(productId);
        if (p != null) {
            synchronized (p) {
                p.setStockQuantity(newStock);
                return true;
            }
        }
        return false;
    }

    public boolean updateProduct(Product p) {
        if (p == null || p.getProductId() <= 0) return false;
        Connection conn = DBConnection.getConnection();
        if (conn != null) {
            String sql = "UPDATE products SET name = ?, description = ?, short_specs = ?, price = ?, mrp = ?, " +
                         "stock_quantity = ?, category_id = ?, image_url = ? WHERE product_id = ?";
            try (PreparedStatement stmt = conn.prepareStatement(sql)) {
                stmt.setString(1, p.getName());
                stmt.setString(2, p.getDescription());
                stmt.setString(3, p.getShortSpecs());
                stmt.setDouble(4, p.getPrice());
                stmt.setDouble(5, p.getMrp());
                stmt.setInt(6, p.getStockQuantity());
                stmt.setInt(7, p.getCategoryId());
                stmt.setString(8, p.getImageUrl());
                stmt.setInt(9, p.getProductId());
                return stmt.executeUpdate() > 0;
            } catch (SQLException e) {
                System.err.println("JDBC Error in updateProduct: " + e.getMessage());
            } finally {
                DBConnection.closeConnection(conn);
            }
        }
        Product existing = memoryProducts.get(p.getProductId());
        if (existing != null) {
            synchronized (existing) {
                existing.setName(p.getName());
                existing.setDescription(p.getDescription());
                existing.setShortSpecs(p.getShortSpecs());
                existing.setPrice(p.getPrice());
                existing.setMrp(p.getMrp());
                existing.setStockQuantity(p.getStockQuantity());
                existing.setCategoryId(p.getCategoryId());
                if (p.getImageUrl() != null && !p.getImageUrl().isEmpty()) {
                    existing.setImageUrl(p.getImageUrl());
                }
            }
            return true;
        }
        return false;
    }

    public boolean deleteProduct(int productId) {
        Connection conn = DBConnection.getConnection();
        if (conn != null) {
            String sql = "UPDATE products SET is_active = FALSE WHERE product_id = ?";
            try (PreparedStatement stmt = conn.prepareStatement(sql)) {
                stmt.setInt(1, productId);
                return stmt.executeUpdate() > 0;
            } catch (SQLException e) {
                System.err.println("JDBC Error in deleteProduct: " + e.getMessage());
            } finally {
                DBConnection.closeConnection(conn);
            }
        }
        Product p = memoryProducts.get(productId);
        if (p != null) {
            p.setActive(false);
            return true;
        }
        return false;
    }

    private Product mapResultSetToProduct(ResultSet rs) throws SQLException {
        Product p = new Product();
        p.setProductId(rs.getInt("product_id"));
        p.setSellerId(rs.getInt("seller_id"));
        p.setCategoryId(rs.getInt("category_id"));
        p.setName(rs.getString("name"));
        p.setDescription(rs.getString("description"));
        p.setShortSpecs(rs.getString("short_specs"));
        p.setPrice(rs.getDouble("price"));
        p.setMrp(rs.getDouble("mrp"));
        p.setStockQuantity(rs.getInt("stock_quantity"));
        p.setRating(rs.getDouble("rating"));
        p.setReviewCount(rs.getInt("review_count"));
        p.setImageUrl(rs.getString("image_url"));
        p.setActive(rs.getBoolean("is_active"));
        p.setCreatedAt(rs.getTimestamp("created_at"));

        try {
            p.setCategoryName(rs.getString("category_name"));
            p.setSellerName(rs.getString("seller_name"));
        } catch (SQLException ignored) {}

        return p;
    }
}
