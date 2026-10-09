/* ==============================================================
   Cartivo Platform Controller
   Complete E-Commerce Logic, Restful API Sync, and State Management
   ============================================================== */

const INITIAL_PRODUCTS = [
  {
    productId: 16,
    sellerId: 2,
    sellerName: "Campus Style Studio",
    categoryId: 6,
    categoryName: "Casual Wear",
    name: "Classic Casual T-Shirt",
    description: "Premium heavyweight combed cotton t-shirt with a relaxed boxy cut, ribbed crew collar, and ultra-soft breathable feel. Perfect for daily campus wear and minimal styling.",
    shortSpecs: "100% Combed Cotton • 220 GSM • Relaxed Fit",
    price: 349.00,
    mrp: 499.00,
    stockQuantity: 38,
    rating: 4.4,
    reviewCount: 86,
    imageUrl: "tshirt_casual.jpg",
    active: true
  },
  {
    productId: 17,
    sellerId: 2,
    sellerName: "Campus Style Studio",
    categoryId: 8,
    categoryName: "Outerwear & Coats",
    name: "Meridian Oversized Wool Coat",
    description: "Architectural simplicity meets cold-weather luxury. Crafted from a premium Italian wool blend, this double-breasted oversized silhouette delivers exceptional warmth and effortless minimalism.",
    shortSpecs: "70% Wool • 600G/M² • Italian Blend • Double Breasted",
    price: 4499.00,
    mrp: 6999.00,
    stockQuantity: 14,
    rating: 4.8,
    reviewCount: 124,
    imageUrl: "wool_coat.jpg",
    active: true
  },
  {
    productId: 18,
    sellerId: 2,
    sellerName: "Campus Style Studio",
    categoryId: 6,
    categoryName: "Casual Wear",
    name: "One Life Graphic Streetwear T-Shirt",
    description: "Graphic t-shirt designed in an olive earthy palette with minimalist chest typography. Bio-washed for a vintage lived-in texture and zero shrinkage.",
    shortSpecs: "100% Organic Cotton • Bio-Washed • Graphic Print",
    price: 599.00,
    mrp: 899.00,
    stockQuantity: 45,
    rating: 4.5,
    reviewCount: 98,
    imageUrl: "graphic_tshirt.jpg",
    active: true
  },
  {
    productId: 19,
    sellerId: 2,
    sellerName: "Campus Style Studio",
    categoryId: 6,
    categoryName: "Casual Wear",
    name: "Skinny Fit Stretch Denim Jeans",
    description: "Modern slim taper cut crafted from 12.5 oz durable indigo stretch denim with subtle whiskering and reinforced contrast copper rivets.",
    shortSpecs: "98% Cotton 2% Elastane • 12.5oz • 5-Pocket",
    price: 1299.00,
    mrp: 1999.00,
    stockQuantity: 26,
    rating: 4.6,
    reviewCount: 142,
    imageUrl: "denim_jeans.jpg",
    active: true
  },
  {
    productId: 20,
    sellerId: 2,
    sellerName: "Campus Style Studio",
    categoryId: 6,
    categoryName: "Casual Wear",
    name: "Checkered Flannel Button-Down Shirt",
    description: "Timeless heritage buffalo plaid flannel shirt in rich crimson and charcoal. Brushed twill weave keeps you warm during late-night study sessions.",
    shortSpecs: "100% Brushed Cotton Flannel • Regular Fit • Dual Chest Pockets",
    price: 899.00,
    mrp: 1299.00,
    stockQuantity: 29,
    rating: 4.3,
    reviewCount: 76,
    imageUrl: "checkered_shirt.jpg",
    active: true
  },
  {
    productId: 21,
    sellerId: 2,
    sellerName: "Campus Style Studio",
    categoryId: 7,
    categoryName: "Formal & Evening",
    name: "Vertical Striped Oxford Collar Shirt",
    description: "Tailored classic button-down shirt featuring crisp blue and white vertical pencil stripes. Easy-care wrinkle resistant finish ideal for presentations.",
    shortSpecs: "100% Oxford Cotton • Button-Down Collar • Wrinkle-Resistant",
    price: 999.00,
    mrp: 1499.00,
    stockQuantity: 31,
    rating: 4.7,
    reviewCount: 118,
    imageUrl: "striped_shirt.jpg",
    active: true
  },
  {
    productId: 1,
    sellerId: 2,
    sellerName: "Campus Tech Store",
    categoryId: 1,
    categoryName: "Computer Peripherals",
    name: "Logitech B100 Optical USB Mouse",
    description: "Reliable wired optical mouse with 800 DPI tracking and ambidextrous shape. Ideal for programming labs and classroom workstations.",
    shortSpecs: "Wired USB • 800 DPI • 3-Button",
    price: 349.00,
    mrp: 499.00,
    stockQuantity: 28,
    rating: 4.4,
    reviewCount: 86,
    imageUrl: "mouse.jpg",
    active: true
  },
  {
    productId: 2,
    sellerId: 2,
    sellerName: "Campus Tech Store",
    categoryId: 1,
    categoryName: "Computer Peripherals",
    name: "SanDisk Ultra 128GB USB 3.0 Flash Drive",
    description: "High-speed flash drive with up to 130MB/s transfer speed. Durable sliding design for OS dual-booting, ISO images, and project backups.",
    shortSpecs: "128GB • USB 3.0 • Up to 130MB/s",
    price: 799.00,
    mrp: 1150.00,
    stockQuantity: 42,
    rating: 4.5,
    reviewCount: 114,
    imageUrl: "pendrive.jpg",
    active: true
  },
  {
    productId: 3,
    sellerId: 2,
    sellerName: "Campus Tech Store",
    categoryId: 1,
    categoryName: "Computer Peripherals",
    name: "TVS-e Bharat Gold Mechanical Keyboard",
    description: "Long-lasting mechanical keyboard with genuine mechanical switches for tactile coding experience and typing comfort.",
    shortSpecs: "Mechanical Switches • USB • 104 Keys",
    price: 2499.00,
    mrp: 3199.00,
    stockQuantity: 12,
    rating: 4.7,
    reviewCount: 53,
    imageUrl: "keyboard.jpg",
    active: true
  },
  {
    productId: 4,
    sellerId: 2,
    sellerName: "Campus Tech Store",
    categoryId: 1,
    categoryName: "Computer Peripherals",
    name: "Portronics 4-Port USB 3.0 Hub with Switch",
    description: "Compact 4-port USB hub with individual power switches and blue LED indicators. Easily connect multiple USB flash drives and lab hardware.",
    shortSpecs: "4 Ports • 5Gbps • Individual Switches",
    price: 499.00,
    mrp: 899.00,
    stockQuantity: 19,
    rating: 4.2,
    reviewCount: 41,
    imageUrl: "usbhub.jpg",
    active: true
  },
  {
    productId: 5,
    sellerId: 2,
    sellerName: "Campus Tech Store",
    categoryId: 2,
    categoryName: "Audio & Wearables",
    name: "boAt Rockerz 450 Bluetooth On-Ear Headphones",
    description: "Over-ear wireless headphones with 40mm dynamic drivers, 15 hours battery backup, and soft padded ear cushions for long study sessions.",
    shortSpecs: "Bluetooth 5.0 • 40mm Drivers • 15h Battery",
    price: 1299.00,
    mrp: 1990.00,
    stockQuantity: 24,
    rating: 4.3,
    reviewCount: 210,
    imageUrl: "headphones.jpg",
    active: true
  },
  {
    productId: 6,
    sellerId: 2,
    sellerName: "Campus Tech Store",
    categoryId: 2,
    categoryName: "Audio & Wearables",
    name: "Boult Audio Bassbuds Wired In-Ear Earphones",
    description: "In-ear earphones with noise-isolating silicone tips, in-line microphone, and braided tangle-free cable for online classes and music.",
    shortSpecs: "3.5mm Jack • In-line Mic • Deep Bass",
    price: 349.00,
    mrp: 699.00,
    stockQuantity: 50,
    rating: 4.1,
    reviewCount: 78,
    imageUrl: "earphones.jpg",
    active: true
  },
  {
    productId: 7,
    sellerId: 3,
    sellerName: "Stationery & Books Hub",
    categoryId: 3,
    categoryName: "CS & Engineering Books",
    name: "Introduction to Algorithms (CLRS) 4th Edition",
    description: "The gold standard reference for algorithms and data structures courses worldwide. Essential for competitive programming, interviews, and GATE CS.",
    shortSpecs: "Paperback • 1312 Pages • MIT Press",
    price: 1150.00,
    mrp: 1499.00,
    stockQuantity: 16,
    rating: 4.8,
    reviewCount: 142,
    imageUrl: "book_clrs.jpg",
    active: true
  },
  {
    productId: 8,
    sellerId: 3,
    sellerName: "Stationery & Books Hub",
    categoryId: 3,
    categoryName: "CS & Engineering Books",
    name: "Operating System Concepts (Silberschatz)",
    description: "Comprehensive guide on virtual memory, CPU scheduling, thread synchronization, and Linux/Unix kernel architecture for systems engineers.",
    shortSpecs: "Paperback • 10th Edition • Wiley",
    price: 890.00,
    mrp: 1195.00,
    stockQuantity: 11,
    rating: 4.6,
    reviewCount: 67,
    imageUrl: "book_os.jpg",
    active: true
  },
  {
    productId: 9,
    sellerId: 3,
    sellerName: "Stationery & Books Hub",
    categoryId: 3,
    categoryName: "CS & Engineering Books",
    name: "Database System Concepts (Korth & Sudarshan)",
    description: "Fundamentals of relational databases, SQL queries, normalization, ACID properties, indexing, and transactional concurrency control.",
    shortSpecs: "Paperback • 7th Edition • McGraw Hill",
    price: 820.00,
    mrp: 995.00,
    stockQuantity: 14,
    rating: 4.5,
    reviewCount: 59,
    imageUrl: "book_db.jpg",
    active: true
  },
  {
    productId: 10,
    sellerId: 2,
    sellerName: "Campus Tech Store",
    categoryId: 4,
    categoryName: "Lab & DIY Hardware",
    name: "Raspberry Pi 4 Model B (4GB RAM)",
    description: "Quad-core 64-bit ARM Cortex-A72 processor, dual micro-HDMI 4K displays, Gigabit Ethernet, and 40-pin GPIO header for IoT and Linux embedded projects.",
    shortSpecs: "BCM2711 • 4GB LPDDR4 • Dual 4K HDMI",
    price: 5499.00,
    mrp: 6200.00,
    stockQuantity: 8,
    rating: 4.9,
    reviewCount: 95,
    imageUrl: "raspberrypi.jpg",
    active: true
  },
  {
    productId: 11,
    sellerId: 2,
    sellerName: "Campus Tech Store",
    categoryId: 4,
    categoryName: "Lab & DIY Hardware",
    name: "Arduino Uno R3 Starter Kit with Breadboard",
    description: "ATmega328P microcontroller board bundled with 830-point breadboard, jumper wires, resistors, LEDs, ultrasonic sensor, and USB programming cable.",
    shortSpecs: "ATmega328P • 14 Digital I/O • USB Cable",
    price: 1450.00,
    mrp: 1850.00,
    stockQuantity: 22,
    rating: 4.6,
    reviewCount: 88,
    imageUrl: "arduino.jpg",
    active: true
  },
  {
    productId: 12,
    sellerId: 2,
    sellerName: "Campus Tech Store",
    categoryId: 4,
    categoryName: "Lab & DIY Hardware",
    name: "ESP32 Wi-Fi + Bluetooth IoT Development Board",
    description: "Dual-core Xtensa 32-bit LX6 microprocessor with integrated 802.11 b/g/n Wi-Fi and Bluetooth 4.2 BR/EDR and BLE. Ideal for cloud and IoT telemetry.",
    shortSpecs: "ESP-WROOM-32 • Micro-USB • 30 Pins",
    price: 420.00,
    mrp: 599.00,
    stockQuantity: 35,
    rating: 4.4,
    reviewCount: 62,
    imageUrl: "esp32.jpg",
    active: true
  },
  {
    productId: 13,
    sellerId: 3,
    sellerName: "Stationery & Books Hub",
    categoryId: 5,
    categoryName: "Campus & Stationery",
    name: "Casio FX-991EX ClassWiz Scientific Calculator",
    description: "High-resolution Natural Textbook display, 552 math functions, matrix calculation, spreadsheet, and equation solver. Approved for university semester exams.",
    shortSpecs: "552 Functions • Dual Power • Natural Display",
    price: 1495.00,
    mrp: 1795.00,
    stockQuantity: 30,
    rating: 4.8,
    reviewCount: 310,
    imageUrl: "calculator.jpg",
    active: true
  },
  {
    productId: 14,
    sellerId: 3,
    sellerName: "Stationery & Books Hub",
    categoryId: 5,
    categoryName: "Campus & Stationery",
    name: "Classmate Pulse Spiral Notebook (Pack of 4)",
    description: "A4 size 300-page unruled spiral notebook with thick 70 GSM paper for clean lecture notes, lab records, and architecture diagrams.",
    shortSpecs: "A4 • 300 Pages • 70 GSM • Spiral Bound",
    price: 380.00,
    mrp: 480.00,
    stockQuantity: 45,
    rating: 4.5,
    reviewCount: 94,
    imageUrl: "notebook.jpg",
    active: true
  },
  {
    productId: 15,
    sellerId: 3,
    sellerName: "Stationery & Books Hub",
    categoryId: 5,
    categoryName: "Campus & Stationery",
    name: "Parker Vector Standard CT Rollerball Pen",
    description: "Classic student rollerball pen with stainless steel trim and consistent smudge-free ink flow for university examinations.",
    shortSpecs: "Fine Nib • Blue Ink • Stainless Steel Clip",
    price: 320.00,
    mrp: 399.00,
    stockQuantity: 18,
    rating: 4.3,
    reviewCount: 49,
    imageUrl: "parkerpen.jpg",
    active: true
  },
  {
    productId: 22,
    sellerId: 2,
    sellerName: "Campus Tech Store",
    categoryId: 1,
    categoryName: "Computer Peripherals",
    name: "Dell Pro 1080p FHD USB Webcam",
    description: "Full HD 1080p plug-and-play webcam with built-in noise-reducing microphone and privacy shutter for lab meetings and online lectures.",
    shortSpecs: "1080p 30FPS • Dual Mic • Privacy Shutter",
    price: 1899.00,
    mrp: 2499.00,
    stockQuantity: 25,
    rating: 4.5,
    reviewCount: 72,
    imageUrl: "webcam.jpg",
    active: true
  },
  {
    productId: 23,
    sellerId: 2,
    sellerName: "Campus Tech Store",
    categoryId: 1,
    categoryName: "Computer Peripherals",
    name: "Seagate Expansion 1TB External Hard Drive",
    description: "Portable 2.5-inch USB 3.0 external hard drive for comprehensive code repositories, virtual machine disks, and system images.",
    shortSpecs: "1TB • USB 3.0 • 2.5-inch Bus Powered",
    price: 4299.00,
    mrp: 5499.00,
    stockQuantity: 18,
    rating: 4.6,
    reviewCount: 110,
    imageUrl: "external_hdd.jpg",
    active: true
  },
  {
    productId: 24,
    sellerId: 2,
    sellerName: "Campus Tech Store",
    categoryId: 1,
    categoryName: "Computer Peripherals",
    name: "Cosmic Byte Meteoroid RGB Laptop Cooling Pad",
    description: "Six silent cooling fans with dynamic RGB lighting and adjustable ergonomic height levels for prolonged compilation sessions.",
    shortSpecs: "6 Fans • Dual USB • 7 Height Levels",
    price: 1199.00,
    mrp: 1799.00,
    stockQuantity: 30,
    rating: 4.3,
    reviewCount: 64,
    imageUrl: "cooling_pad.jpg",
    active: true
  },
  {
    productId: 25,
    sellerId: 2,
    sellerName: "Campus Tech Store",
    categoryId: 1,
    categoryName: "Computer Peripherals",
    name: "TP-Link Nano USB Wi-Fi Adapter (TL-WN725N)",
    description: "Ultra-compact 150Mbps wireless N nano adapter with soft AP mode support, compatible with Linux, Windows, and Raspberry Pi.",
    shortSpecs: "150Mbps • 2.4GHz • Miniature Plug-in",
    price: 499.00,
    mrp: 799.00,
    stockQuantity: 45,
    rating: 4.4,
    reviewCount: 153,
    imageUrl: "wifi_adapter.jpg",
    active: true
  },
  {
    productId: 26,
    sellerId: 2,
    sellerName: "Campus Tech Store",
    categoryId: 1,
    categoryName: "Computer Peripherals",
    name: "AmazonBasics Ergonomic Vertical Mouse",
    description: "Ergonomic vertical wireless mouse engineered to promote neutral wrist alignment and reduce strain during long programming marathons.",
    shortSpecs: "Wireless 2.4GHz • Ergonomic 60° Angle • 1600 DPI",
    price: 899.00,
    mrp: 1399.00,
    stockQuantity: 7,
    rating: 4.2,
    reviewCount: 38,
    imageUrl: "vertical_mouse.jpg",
    active: true
  },
  {
    productId: 27,
    sellerId: 2,
    sellerName: "Campus Tech Store",
    categoryId: 2,
    categoryName: "Audio & Wearables",
    name: "Noise ColorFit Pulse 2 Smartwatch",
    description: "1.8-inch bright TFT display with 24/7 heart rate and SpO2 tracking, sleep analysis, and 10-day battery life for active student schedules.",
    shortSpecs: "1.8\" Display • SpO2 & HRM • 10-Day Battery",
    price: 1499.00,
    mrp: 2999.00,
    stockQuantity: 35,
    rating: 4.3,
    reviewCount: 180,
    imageUrl: "smartwatch.jpg",
    active: true
  },
  {
    productId: 28,
    sellerId: 2,
    sellerName: "Campus Tech Store",
    categoryId: 2,
    categoryName: "Audio & Wearables",
    name: "Sony WH-CH520 Wireless Bluetooth Headphones",
    description: "Lightweight on-ear wireless headset featuring 50-hour battery life, DSEE audio enhancement, and multipoint Bluetooth connection.",
    shortSpecs: "50h Battery • DSEE • Multipoint Pairing",
    price: 4490.00,
    mrp: 4990.00,
    stockQuantity: 14,
    rating: 4.7,
    reviewCount: 95,
    imageUrl: "sony_headphones.jpg",
    active: true
  },
  {
    productId: 29,
    sellerId: 2,
    sellerName: "Campus Tech Store",
    categoryId: 2,
    categoryName: "Audio & Wearables",
    name: "JBL Go 3 Portable Waterproof Bluetooth Speaker",
    description: "Compact IP67 dustproof and waterproof speaker with punchy JBL Pro Sound and integrated carry loop for hostel rooms and study groups.",
    shortSpecs: "IP67 Waterproof • 5h Playtime • Bluetooth 5.1",
    price: 2999.00,
    mrp: 3999.00,
    stockQuantity: 22,
    rating: 4.6,
    reviewCount: 140,
    imageUrl: "bluetooth_speaker.jpg",
    active: true
  },
  {
    productId: 30,
    sellerId: 2,
    sellerName: "Campus Tech Store",
    categoryId: 2,
    categoryName: "Audio & Wearables",
    name: "Realme Buds Air 3 Neo ANC Earbuds",
    description: "True wireless earbuds featuring 30-hour total playback, AI environmental noise cancellation for crystal clear lab calls, and 10mm bass drivers.",
    shortSpecs: "AI ENC Mic • 30h Playback • IPX5 Splashproof",
    price: 1999.00,
    mrp: 3499.00,
    stockQuantity: 40,
    rating: 4.4,
    reviewCount: 115,
    imageUrl: "tws_earbuds.jpg",
    active: true
  },
  {
    productId: 31,
    sellerId: 2,
    sellerName: "Campus Tech Store",
    categoryId: 2,
    categoryName: "Audio & Wearables",
    name: "Mi Smart Band 6 Fitness Tracker",
    description: "Vibrant AMOLED touch screen with 30 fitness tracking modes, continuous blood oxygen monitoring, and 50m water resistance.",
    shortSpecs: "1.56\" AMOLED • 5ATM Water Resistant • 14-Day Battery",
    price: 2499.00,
    mrp: 3999.00,
    stockQuantity: 5,
    rating: 4.5,
    reviewCount: 220,
    imageUrl: "fitness_band.jpg",
    active: true
  },
  {
    productId: 32,
    sellerId: 3,
    sellerName: "Stationery & Books Hub",
    categoryId: 3,
    categoryName: "CS & Engineering Books",
    name: "Computer Networks (Tanenbaum & Wetherall) 5th Edition",
    description: "The authoritative textbook covering OSI models, TCP/IP protocol suite, routing algorithms, network security, and modern wireless protocols.",
    shortSpecs: "Paperback • 960 Pages • Pearson Education",
    price: 875.00,
    mrp: 1099.00,
    stockQuantity: 15,
    rating: 4.7,
    reviewCount: 88,
    imageUrl: "book_networks.jpg",
    active: true
  },
  {
    productId: 33,
    sellerId: 3,
    sellerName: "Stationery & Books Hub",
    categoryId: 3,
    categoryName: "CS & Engineering Books",
    name: "Designing Data-Intensive Applications (Martin Kleppmann)",
    description: "The definitive guide to storage engines, distributed consensus, data modeling, batch processing, and streaming architectures.",
    shortSpecs: "Paperback • 616 Pages • O'Reilly Media",
    price: 1450.00,
    mrp: 1850.00,
    stockQuantity: 20,
    rating: 4.9,
    reviewCount: 165,
    imageUrl: "book_ddia.jpg",
    active: true
  },
  {
    productId: 34,
    sellerId: 3,
    sellerName: "Stationery & Books Hub",
    categoryId: 3,
    categoryName: "CS & Engineering Books",
    name: "Clean Code: A Handbook of Agile Software Craftsmanship",
    description: "Robert C. Martin's legendary guide on clean code principles, refactoring patterns, unit testing paradigms, and meaningful naming conventions.",
    shortSpecs: "Paperback • 464 Pages • Prentice Hall",
    price: 799.00,
    mrp: 999.00,
    stockQuantity: 28,
    rating: 4.8,
    reviewCount: 210,
    imageUrl: "book_cleancode.jpg",
    active: true
  },
  {
    productId: 35,
    sellerId: 3,
    sellerName: "Stationery & Books Hub",
    categoryId: 3,
    categoryName: "CS & Engineering Books",
    name: "Artificial Intelligence: A Modern Approach (Russell & Norvig)",
    description: "Comprehensive coverage of search algorithms, probabilistic reasoning, machine learning, deep neural networks, and reinforcement learning.",
    shortSpecs: "Paperback • 4th Edition • 1152 Pages • Pearson",
    price: 1250.00,
    mrp: 1599.00,
    stockQuantity: 6,
    rating: 4.8,
    reviewCount: 74,
    imageUrl: "book_ai.jpg",
    active: true
  },
  {
    productId: 36,
    sellerId: 3,
    sellerName: "Stationery & Books Hub",
    categoryId: 3,
    categoryName: "CS & Engineering Books",
    name: "Computer Organization and Architecture (William Stallings)",
    description: "Deep dive into CPU pipelining, cache memory hierarchies, instruction set architecture, RISC-V, and parallel processor designs.",
    shortSpecs: "Paperback • 11th Edition • 880 Pages • Pearson",
    price: 920.00,
    mrp: 1195.00,
    stockQuantity: 13,
    rating: 4.6,
    reviewCount: 52,
    imageUrl: "book_coa.jpg",
    active: true
  },
  {
    productId: 37,
    sellerId: 2,
    sellerName: "Campus Tech Store",
    categoryId: 4,
    categoryName: "Lab & DIY Hardware",
    name: "Soldron 25W High Quality Soldering Iron Kit",
    description: "Ergonomic 25W heating element with nickel-plated pointed bit, safety stand, resin core solder wire, and desoldering wick for lab prototyping.",
    shortSpecs: "25W • Pointed Copper Bit • Safety Stand Included",
    price: 480.00,
    mrp: 650.00,
    stockQuantity: 26,
    rating: 4.5,
    reviewCount: 93,
    imageUrl: "soldering_iron.jpg",
    active: true
  },
  {
    productId: 38,
    sellerId: 2,
    sellerName: "Campus Tech Store",
    categoryId: 4,
    categoryName: "Lab & DIY Hardware",
    name: "Digital Multimeter DT830D with Test Probes",
    description: "Compact digital multimeter for measuring DC/AC voltage, DC current, resistance, diode forward drop, and continuity buzzer testing.",
    shortSpecs: "LCD Display • Continuity Buzzer • Transistor hFE",
    price: 320.00,
    mrp: 499.00,
    stockQuantity: 38,
    rating: 4.2,
    reviewCount: 112,
    imageUrl: "multimeter.jpg",
    active: true
  },
  {
    productId: 39,
    sellerId: 2,
    sellerName: "Campus Tech Store",
    categoryId: 4,
    categoryName: "Lab & DIY Hardware",
    name: "Ultrasonic Sensor HC-SR04 with Mount Bracket",
    description: "High-precision sonar distance measuring module (2cm to 400cm) with 5V trigger and echo pins for robotics and obstacle avoidance projects.",
    shortSpecs: "2cm–400cm Range • 5V DC • Acrylic Bracket",
    price: 149.00,
    mrp: 250.00,
    stockQuantity: 60,
    rating: 4.4,
    reviewCount: 82,
    imageUrl: "sensor_ultrasonic.jpg",
    active: true
  },
  {
    productId: 40,
    sellerId: 2,
    sellerName: "Campus Tech Store",
    categoryId: 4,
    categoryName: "Lab & DIY Hardware",
    name: "Raspberry Pi Pico RP2040 Microcontroller Board",
    description: "High-performance dual-core ARM Cortex-M0+ development board supporting MicroPython, C/C++ SDK, and flexible programmable I/O.",
    shortSpecs: "Dual-Core RP2040 • 2MB Flash • 26 Multi-function GPIO",
    price: 420.00,
    mrp: 550.00,
    stockQuantity: 4,
    rating: 4.7,
    reviewCount: 145,
    imageUrl: "pico_rp2040.jpg",
    active: true
  },
  {
    productId: 41,
    sellerId: 2,
    sellerName: "Campus Tech Store",
    categoryId: 4,
    categoryName: "Lab & DIY Hardware",
    name: "SG90 9g Micro Servo Motor (Pack of 2)",
    description: "Miniature 180-degree rotation servomotors with nylon gear set and control horns for robotic arms, pan-tilt mounts, and IoT mechanisms.",
    shortSpecs: "Pack of 2 • 1.6 kg/cm Torque • 4.8V–6V Operating",
    price: 280.00,
    mrp: 399.00,
    stockQuantity: 32,
    rating: 4.3,
    reviewCount: 68,
    imageUrl: "servo_motor.jpg",
    active: true
  },
  {
    productId: 42,
    sellerId: 3,
    sellerName: "Stationery & Books Hub",
    categoryId: 5,
    categoryName: "Campus & Stationery",
    name: "Staedtler Mars Lumograph Technical Drawing Pencils (Set of 6)",
    description: "Premium break-resistant graphite sketching and drafting pencils (2H, HB, B, 2B, 4B, 6B) for engineering graphics and design sketches.",
    shortSpecs: "Set of 6 Degrees • Super-bonded Lead • German Made",
    price: 399.00,
    mrp: 520.00,
    stockQuantity: 24,
    rating: 4.8,
    reviewCount: 76,
    imageUrl: "pencils_set.jpg",
    active: true
  },
  {
    productId: 43,
    sellerId: 3,
    sellerName: "Stationery & Books Hub",
    categoryId: 5,
    categoryName: "Campus & Stationery",
    name: "Deli Heavy Duty Mesh Desk Organizer Caddy",
    description: "Sturdy powder-coated metal mesh desktop organizer with 6 divided compartments and pull-out drawer for student pens, sticky notes, and flash drives.",
    shortSpecs: "6 Compartments + Drawer • Powder-Coated Steel Mesh",
    price: 549.00,
    mrp: 799.00,
    stockQuantity: 20,
    rating: 4.6,
    reviewCount: 58,
    imageUrl: "desk_organizer.jpg",
    active: true
  },
  {
    productId: 44,
    sellerId: 3,
    sellerName: "Stationery & Books Hub",
    categoryId: 5,
    categoryName: "Campus & Stationery",
    name: "Milton Thermosteel 750ml Insulated Water Bottle",
    description: "Double-walled vacuum insulated 18/8 stainless steel bottle keeping beverages hot or cold for 24 hours during long college lecture days.",
    shortSpecs: "750ml • 24h Hot/Cold • 18/8 Food Grade Steel",
    price: 799.00,
    mrp: 1090.00,
    stockQuantity: 34,
    rating: 4.7,
    reviewCount: 190,
    imageUrl: "water_bottle.jpg",
    active: true
  },
  {
    productId: 45,
    sellerId: 3,
    sellerName: "Stationery & Books Hub",
    categoryId: 5,
    categoryName: "Campus & Stationery",
    name: "Wipro Garnet 6W Rechargeable LED Desk Lamp",
    description: "Touch-controlled flexible gooseneck study lamp with 3 color temperatures (warm, natural, white) and dimmable brightness for late-night dorm study.",
    shortSpecs: "3 Color Modes • Rechargeable Battery • Eye-Care Diffuser",
    price: 949.00,
    mrp: 1499.00,
    stockQuantity: 16,
    rating: 4.5,
    reviewCount: 84,
    imageUrl: "desk_lamp.jpg",
    active: true
  },
  {
    productId: 46,
    sellerId: 3,
    sellerName: "Stationery & Books Hub",
    categoryId: 5,
    categoryName: "Campus & Stationery",
    name: "Post-it Notes Cube & Color Index Flags Combo",
    description: "Self-adhesive 400-sheet pastel note cube with 100 colorful index tabs for marking critical textbook chapters, exam notes, and formula sheets.",
    shortSpecs: "400 Sheets Cube + 100 Index Flags • Repositionable",
    price: 249.00,
    mrp: 349.00,
    stockQuantity: 8,
    rating: 4.4,
    reviewCount: 110,
    imageUrl: "sticky_notes.jpg",
    active: true
  },
  {
    productId: 47,
    sellerId: 2,
    sellerName: "Campus Style Studio",
    categoryId: 6,
    categoryName: "Casual Wear",
    name: "Washed Cotton Cargo Joggers",
    description: "Relaxed-fit utility cargo pants crafted from durable stretch cotton twill with six functional pockets and elasticated cuffs for daily campus wear.",
    shortSpecs: "97% Cotton 3% Spandex • 6 Utility Pockets • Relaxed Cut",
    price: 1399.00,
    mrp: 1999.00,
    stockQuantity: 27,
    rating: 4.5,
    reviewCount: 92,
    imageUrl: "cargo_joggers.jpg",
    active: true
  },
  {
    productId: 48,
    sellerId: 2,
    sellerName: "Campus Style Studio",
    categoryId: 6,
    categoryName: "Casual Wear",
    name: "Vintage Heavyweight Boxy Hoodie",
    description: "Thick 380 GSM fleece hoodie with double-layer drawstring hood, kangaroo pouch pocket, and drop-shoulder relaxed silhouette.",
    shortSpecs: "380 GSM Brushed Fleece • Drop Shoulder • Double Hood",
    price: 1699.00,
    mrp: 2499.00,
    stockQuantity: 19,
    rating: 4.7,
    reviewCount: 134,
    imageUrl: "heavy_hoodie.jpg",
    active: true
  },
  {
    productId: 49,
    sellerId: 2,
    sellerName: "Campus Style Studio",
    categoryId: 6,
    categoryName: "Casual Wear",
    name: "Classic Pique Knit Polo T-Shirt",
    description: "Breathable combed cotton pique polo shirt with two-button placket, ribbed collar, and side vents for effortless weekend and club styling.",
    shortSpecs: "100% Combed Pique Cotton • Ribbed Collar • Regular Fit",
    price: 699.00,
    mrp: 999.00,
    stockQuantity: 33,
    rating: 4.4,
    reviewCount: 78,
    imageUrl: "polo_shirt.jpg",
    active: true
  },
  {
    productId: 50,
    sellerId: 2,
    sellerName: "Campus Style Studio",
    categoryId: 6,
    categoryName: "Casual Wear",
    name: "Minimalist Campus Canvas Backpack",
    description: "Water-repellent 24L canvas backpack with padded 15.6-inch laptop compartment, hidden anti-theft back pocket, and reinforced shoulder straps.",
    shortSpecs: "24L Capacity • 15.6\" Laptop Sleeve • Water-Repellent",
    price: 1299.00,
    mrp: 1899.00,
    stockQuantity: 5,
    rating: 4.6,
    reviewCount: 115,
    imageUrl: "canvas_backpack.jpg",
    active: true
  },
  {
    productId: 51,
    sellerId: 2,
    sellerName: "Campus Style Studio",
    categoryId: 6,
    categoryName: "Casual Wear",
    name: "Relaxed Linen Blend Casual Shorts",
    description: "Lightweight breathable linen-cotton blend shorts with an adjustable elastic drawstring waistband and dual slash pockets for summer comfort.",
    shortSpecs: "55% Linen 45% Cotton • Elastic Drawstring • 7-Inch Inseam",
    price: 799.00,
    mrp: 1199.00,
    stockQuantity: 25,
    rating: 4.3,
    reviewCount: 49,
    imageUrl: "linen_shorts.jpg",
    active: true
  },
  {
    productId: 52,
    sellerId: 2,
    sellerName: "Campus Style Studio",
    categoryId: 7,
    categoryName: "Formal & Evening",
    name: "Tailored Slim Fit Navy Blazer",
    description: "Single-breasted two-button blazer woven from wrinkle-resistant poly-viscose blend with notch lapels and interior passport pocket for campus placements.",
    shortSpecs: "Poly-Viscose Blend • Notch Lapel • Placement Ready",
    price: 3299.00,
    mrp: 4999.00,
    stockQuantity: 11,
    rating: 4.8,
    reviewCount: 86,
    imageUrl: "navy_blazer.jpg",
    active: true
  },
  {
    productId: 53,
    sellerId: 2,
    sellerName: "Campus Style Studio",
    categoryId: 7,
    categoryName: "Formal & Evening",
    name: "Crisp White Formal Dress Shirt",
    description: "Semi-spread collar formal shirt crafted from 100% long-staple cotton with a natural luster, mother-of-pearl buttons, and stain-resistant finish.",
    shortSpecs: "100% Long-Staple Cotton • Semi-Spread Collar • Easy Iron",
    price: 1199.00,
    mrp: 1699.00,
    stockQuantity: 29,
    rating: 4.6,
    reviewCount: 104,
    imageUrl: "white_formal_shirt.jpg",
    active: true
  },
  {
    productId: 54,
    sellerId: 2,
    sellerName: "Campus Style Studio",
    categoryId: 7,
    categoryName: "Formal & Evening",
    name: "Flat-Front Tailored Formal Trousers",
    description: "Modern flat-front dress trousers with active stretch waistband, clean pressed crease, and concealed coin pocket for corporate interviews.",
    shortSpecs: "Stretch Poly-Wool Touch • Active Flex Waist • Pressed Crease",
    price: 1499.00,
    mrp: 2199.00,
    stockQuantity: 22,
    rating: 4.5,
    reviewCount: 67,
    imageUrl: "formal_trousers.jpg",
    active: true
  },
  {
    productId: 55,
    sellerId: 2,
    sellerName: "Campus Style Studio",
    categoryId: 7,
    categoryName: "Formal & Evening",
    name: "Silk Jacquard Classic Necktie & Pocket Square Set",
    description: "Hand-stitched micro-pattern silk tie paired with a matching pocket square, designed to accent formal suits for conferences and valedictory dinners.",
    shortSpecs: "100% Jacquard Silk • 3-Inch Width • Matching Pocket Square",
    price: 599.00,
    mrp: 999.00,
    stockQuantity: 9,
    rating: 4.7,
    reviewCount: 42,
    imageUrl: "silk_tie_set.jpg",
    active: true
  },
  {
    productId: 56,
    sellerId: 2,
    sellerName: "Campus Style Studio",
    categoryId: 8,
    categoryName: "Outerwear & Coats",
    name: "Vintage Washed Denim Trucker Jacket",
    description: "Classic 13 oz rugged blue denim trucker jacket with buttoned flap chest pockets, adjustable waist tabs, and vintage brass hardware.",
    shortSpecs: "100% Cotton Denim • 13 oz Heavyweight • Brass Shank Buttons",
    price: 2299.00,
    mrp: 3299.00,
    stockQuantity: 15,
    rating: 4.7,
    reviewCount: 98,
    imageUrl: "denim_jacket.jpg",
    active: true
  },
  {
    productId: 57,
    sellerId: 2,
    sellerName: "Campus Style Studio",
    categoryId: 8,
    categoryName: "Outerwear & Coats",
    name: "Urban Windproof Lightweight Bomber Jacket",
    description: "Water-resistant matte nylon shell with ribbed collar and cuffs, contrast orange inner lining, and utility zippered sleeve pocket.",
    shortSpecs: "Water-Resistant Nylon • Rib-Knit Trim • Utility Sleeve Pocket",
    price: 1899.00,
    mrp: 2699.00,
    stockQuantity: 21,
    rating: 4.5,
    reviewCount: 73,
    imageUrl: "bomber_jacket.jpg",
    active: true
  },
  {
    productId: 58,
    sellerId: 2,
    sellerName: "Campus Style Studio",
    categoryId: 8,
    categoryName: "Outerwear & Coats",
    name: "Thermal Quilted Puffer Vest",
    description: "Sleeveless lightweight insulated puffer vest with stand collar, fleece-lined hand pockets, and water-repellent micro-ripstop exterior.",
    shortSpecs: "Faux Down Insulation • Stand Collar • Ultra Lightweight",
    price: 1599.00,
    mrp: 2299.00,
    stockQuantity: 18,
    rating: 4.4,
    reviewCount: 54,
    imageUrl: "puffer_vest.jpg",
    active: true
  },
  {
    productId: 59,
    sellerId: 2,
    sellerName: "Campus Style Studio",
    categoryId: 8,
    categoryName: "Outerwear & Coats",
    name: "Waterproof Hooded Softshell Rain Jacket",
    description: "Breathable 5000mm waterproof softshell jacket with taped seams, adjustable storm hood, and zippered ventilation pockets for monsoon campus walks.",
    shortSpecs: "5000mm Waterproof • Breathable Membrane • Taped Seams",
    price: 2499.00,
    mrp: 3499.00,
    stockQuantity: 6,
    rating: 4.6,
    reviewCount: 61,
    imageUrl: "rain_jacket.jpg",
    active: true
  }
];

const INITIAL_ORDERS = [
  {
    orderId: 1,
    orderNumber: "ORD-2026-1001",
    userId: 4,
    buyerName: "Rahul Sharma",
    totalAmount: 1148.00,
    discountAmount: 100.00,
    taxAmount: 52.40,
    shippingFee: 0.00,
    finalAmount: 1100.40,
    paymentMethod: "UPI",
    paymentStatus: "COMPLETED",
    orderStatus: "DELIVERED",
    shippingName: "Rahul Sharma",
    shippingPhone: "9876543220",
    shippingAddress: "Room 204, Kaveri Hostel, IITM Campus",
    shippingPincode: "600113",
    createdAt: "2026-09-27 14:30:00",
    items: [
      { itemId: 1, productId: 16, productName: "Classic Casual T-Shirt", unitPrice: 349.00, quantity: 1, lineTotal: 349.00 },
      { itemId: 2, productId: 2, productName: "SanDisk Ultra 128GB USB 3.0 Flash Drive", unitPrice: 799.00, quantity: 1, lineTotal: 799.00 }
    ]
  },
  {
    orderId: 2,
    orderNumber: "ORD-2026-1002",
    userId: 4,
    buyerName: "Rahul Sharma",
    totalAmount: 1450.00,
    discountAmount: 0.00,
    taxAmount: 72.50,
    shippingFee: 0.00,
    finalAmount: 1522.50,
    paymentMethod: "COD",
    paymentStatus: "PENDING",
    orderStatus: "CONFIRMED",
    shippingName: "Rahul Sharma",
    shippingPhone: "9876543220",
    shippingAddress: "Room 204, Kaveri Hostel, IITM Campus",
    shippingPincode: "600113",
    createdAt: "2026-09-29 11:15:00",
    items: [
      { itemId: 3, productId: 11, productName: "Arduino Uno R3 Starter Kit with Breadboard", unitPrice: 1450.00, quantity: 1, lineTotal: 1450.00 }
    ]
  },
  {
    orderId: 3,
    orderNumber: "ORD-2026-1003",
    userId: 5,
    buyerName: "Ananya Iyer",
    totalAmount: 4499.00,
    discountAmount: 200.00,
    taxAmount: 214.95,
    shippingFee: 0.00,
    finalAmount: 4513.95,
    paymentMethod: "NET_BANKING",
    paymentStatus: "COMPLETED",
    orderStatus: "SHIPPED",
    shippingName: "Ananya Iyer",
    shippingPhone: "9876543221",
    shippingAddress: "Room 112, Ganga Hostel, IITM Campus",
    shippingPincode: "600113",
    createdAt: "2026-10-01 09:40:00",
    items: [
      { itemId: 4, productId: 17, productName: "Meridian Oversized Wool Coat", unitPrice: 4499.00, quantity: 1, lineTotal: 4499.00 }
    ]
  },
  {
    orderId: 4,
    orderNumber: "ORD-2026-1004",
    userId: 4,
    buyerName: "Rahul Sharma",
    totalAmount: 1898.00,
    discountAmount: 100.00,
    taxAmount: 89.90,
    shippingFee: 0.00,
    finalAmount: 1887.90,
    paymentMethod: "UPI",
    paymentStatus: "COMPLETED",
    orderStatus: "OUT_FOR_DELIVERY",
    shippingName: "Rahul Sharma",
    shippingPhone: "9876543220",
    shippingAddress: "Room 204, Kaveri Hostel, IITM Campus",
    shippingPincode: "600113",
    createdAt: "2026-10-02 08:20:00",
    items: [
      { itemId: 5, productId: 18, productName: "One Life Graphic Streetwear T-Shirt", unitPrice: 599.00, quantity: 1, lineTotal: 599.00 },
      { itemId: 6, productId: 19, productName: "Skinny Fit Stretch Denim Jeans", unitPrice: 1299.00, quantity: 1, lineTotal: 1299.00 }
    ]
  }
];

const INITIAL_USERS = [
  { userId: 1, fullName: "System Administrator", email: "admin@guvi.in", phone: "9876543210", role: "ADMIN", status: "ACTIVE" },
  { userId: 2, fullName: "Campus Style Studio", email: "seller.style@guvi.in", phone: "9876543211", role: "SELLER", status: "ACTIVE" },
  { userId: 3, fullName: "Stationery & Books Hub", email: "seller.books@guvi.in", phone: "9876543212", role: "SELLER", status: "ACTIVE" },
  { userId: 4, fullName: "Rahul Sharma", email: "rahul.s@student.guvi.in", phone: "9876543220", role: "BUYER", status: "ACTIVE" },
  { userId: 5, fullName: "Ananya Iyer", email: "ananya.i@student.guvi.in", phone: "9876543221", role: "BUYER", status: "ACTIVE" }
];

/* ==============================================================
   Storage & State
   ============================================================== */
function getStoredProducts() {
  const stored = localStorage.getItem("guvi_products");
  if (!stored) {
    saveStoredProducts(INITIAL_PRODUCTS);
    return INITIAL_PRODUCTS;
  }
  try {
    const parsed = JSON.parse(stored);
    if (!Array.isArray(parsed)) {
      saveStoredProducts(INITIAL_PRODUCTS);
      return INITIAL_PRODUCTS;
    }
    // Ensure all INITIAL_PRODUCTS exist in parsed without overriding seller created items
    let changed = false;
    INITIAL_PRODUCTS.forEach(initP => {
      if (!parsed.some(p => p.productId === initP.productId)) {
        parsed.push(initP);
        changed = true;
      }
    });
    if (changed) {
      saveStoredProducts(parsed);
    }
    return parsed;
  } catch (e) {
    saveStoredProducts(INITIAL_PRODUCTS);
    return INITIAL_PRODUCTS;
  }
}

function saveStoredProducts(products) {
  localStorage.setItem("guvi_products", JSON.stringify(products));
}

function getStoredOrders() {
  const stored = localStorage.getItem("guvi_orders");
  if (!stored) {
    saveStoredOrders(INITIAL_ORDERS);
    return INITIAL_ORDERS;
  }
  try {
    return JSON.parse(stored);
  } catch (e) {
    saveStoredOrders(INITIAL_ORDERS);
    return INITIAL_ORDERS;
  }
}

function saveStoredOrders(orders) {
  localStorage.setItem("guvi_orders", JSON.stringify(orders));
}

function getStoredUsers() {
  const stored = localStorage.getItem("guvi_users");
  if (!stored) {
    saveStoredUsers(INITIAL_USERS);
    return INITIAL_USERS;
  }
  try {
    return JSON.parse(stored);
  } catch (e) {
    saveStoredUsers(INITIAL_USERS);
    return INITIAL_USERS;
  }
}

function saveStoredUsers(users) {
  localStorage.setItem("guvi_users", JSON.stringify(users));
}

function getCart() {
  const stored = localStorage.getItem("guvi_cart");
  return stored ? JSON.parse(stored) : [];
}

function saveCart(cart) {
  localStorage.setItem("guvi_cart", JSON.stringify(cart));
  updateCartBadge();
  renderCartDrawer();
}

function getWishlist() {
  const stored = localStorage.getItem("guvi_wishlist");
  return stored ? JSON.parse(stored) : [];
}

function saveWishlist(list) {
  localStorage.setItem("guvi_wishlist", JSON.stringify(list));
  updateWishlistBadge();
}

function getCurrentRole() {
  return localStorage.getItem("guvi_current_role") || "BUYER";
}

function setCurrentRole(role) {
  localStorage.setItem("guvi_current_role", role);
}

function updateRoleVisibility(role) {
  const isSeller = (role === "SELLER");
  const isSellerOrAdmin = (role === "SELLER" || role === "ADMIN");
  const topAddBtn = document.getElementById("btnTopAddProduct");
  const catalogAddBtn = document.getElementById("btnCatalogAddProduct");
  const headerAddBtn = document.getElementById("btnHeaderAddProduct");
  const sellerAddBtn = document.getElementById("btnAddProduct");

  if (topAddBtn) topAddBtn.style.display = isSellerOrAdmin ? "inline-flex" : "none";
  if (catalogAddBtn) catalogAddBtn.style.display = isSellerOrAdmin ? "inline-flex" : "none";
  if (headerAddBtn) headerAddBtn.style.display = isSellerOrAdmin ? "inline-flex" : "none";
  if (sellerAddBtn) sellerAddBtn.style.display = isSeller ? "inline-flex" : "none";
}

let currentFilter = {
  categoryId: 0,
  searchTerm: "",
  minPrice: null,
  maxPrice: null,
  inStockOnly: false,
  minRating: 0,
  size: "ALL",
  sortBy: "featured"
};

let appliedCoupon = null;
let currentPDPProduct = null;
let selectedPDPSize = "M";
let selectedPDPColor = "Beige";
let selectedPDPQty = 1;

/* ==============================================================
   Storefront Initialization
   ============================================================== */
function initStorefront() {
  const currentRole = getCurrentRole();
  const roleSelect = document.getElementById("headerRoleSwitcher");
  if (roleSelect) {
    roleSelect.value = currentRole;
  }
  updateRoleVisibility(currentRole);

  updateCartBadge();
  updateWishlistBadge();
  renderNewArrivals();
  renderTopSelling();
  loadAndRenderProducts();

  // Sticky header shadow on scroll
  window.addEventListener("scroll", () => {
    const header = document.getElementById("siteHeader");
    if (header) {
      if (window.scrollY > 20) header.classList.add("scrolled");
      else header.classList.remove("scrolled");
    }
  });

  // Sync with Java backend asynchronously
  syncFromBackend().then(() => {
    renderNewArrivals();
    renderTopSelling();
    loadAndRenderProducts();

    const urlParams = new URLSearchParams(window.location.search);
    const prodParam = urlParams.get("product");
    const searchParam = urlParams.get("search");
    const cartParam = urlParams.get("cart");

    if (searchParam) {
      const searchInput = document.getElementById("searchInput");
      if (searchInput) {
        searchInput.value = searchParam;
        onSearchInput();
      }
    }
    if (prodParam) {
      openProductModal(parseInt(prodParam, 10));
    }
    if (cartParam) {
      if (getCart().length === 0) {
        addToCart(1, "M", "Beige", 1);
      }
      toggleCartDrawer(true);
    }
  });
}

async function syncFromBackend() {
  if (!window.location.protocol.startsWith("http")) return;
  try {
    const res = await fetch("/api/products");
    if (res.ok) {
      const liveProducts = await res.json();
      if (Array.isArray(liveProducts) && liveProducts.length > 0) {
        saveStoredProducts(liveProducts);
      }
    }
    const orderRes = await fetch("/api/orders");
    if (orderRes.ok) {
      const liveOrders = await orderRes.json();
      if (Array.isArray(liveOrders) && liveOrders.length > 0) {
        saveStoredOrders(liveOrders);
      }
    }
  } catch (e) {}
}

/* ==============================================================
   PRODUCT CARD COMPONENT — STRICT REFERENCE IMAGE 2 REPRODUCTION
   ============================================================== */
function renderProductCard(product) {
  const wishlist = getWishlist();
  const isWishlisted = wishlist.includes(product.productId);
  const discount = product.mrp > product.price ? Math.round(((product.mrp - product.price) / product.mrp) * 100) : 0;
  const isOutOfStock = product.stockQuantity <= 0;
  const isLowStock = product.stockQuantity > 0 && product.stockQuantity <= 10;

  let stockBadgeHtml = "";
  if (isOutOfStock) {
    stockBadgeHtml = `<span class="card-stock-pill out">Out of Stock</span>`;
  } else if (isLowStock) {
    stockBadgeHtml = `<span class="card-stock-pill low">Only ${product.stockQuantity} left</span>`;
  }

  const imgPath = `assets/images/${product.imageUrl || 'mouse.jpg'}`;

  return `
    <article class="product-card" data-id="${product.productId}">
      <!-- 1. Product Image -->
      <div class="card-thumb-wrapper" onclick="openProductModal(${product.productId})">
        ${stockBadgeHtml}
        <button type="button" class="card-wishlist-btn ${isWishlisted ? 'active' : ''}"
                onclick="event.stopPropagation(); toggleWishlist(${product.productId})"
                title="${isWishlisted ? 'Remove from wishlist' : 'Save to wishlist'}"
                aria-label="Wishlist">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="${isWishlisted ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
        </button>
        <img src="${imgPath}" alt="${escapeHtml(product.name)}" class="card-thumb-img" loading="lazy">
      </div>

      <!-- Card Information Block -->
      <div class="card-info-block">
        <!-- 2. Product Name -->
        <h3 class="card-product-name" onclick="openProductModal(${product.productId})" title="${escapeHtml(product.name)}">
          ${escapeHtml(product.name)}
        </h3>

        <!-- 3. Star Rating & Review Count (⭐ 4.4 (86)) -->
        <div class="card-rating-row">
          <span class="card-star-icon">★</span>
          <span class="card-rating-score">${Number(product.rating || 4.4).toFixed(1)}</span>
          <span class="card-review-count">(${product.reviewCount || 86})</span>
        </div>

        <!-- 4. Product Pricing: Current, MRP Strikethrough, Discount Badge -->
        <div class="card-pricing-row">
          <span class="card-current-price">₹${Number(product.price).toLocaleString('en-IN')}</span>
          ${product.mrp > product.price ? `<span class="card-mrp-price">₹${Number(product.mrp).toLocaleString('en-IN')}</span>` : ''}
          ${discount > 0 ? `<span class="card-discount-badge">${discount}% OFF</span>` : ''}
        </div>

        <!-- 5. FULL-WIDTH BLUE ADD TO CART BUTTON (REFERENCE IMAGE 2) -->
        <button type="button" class="card-btn-add-cart" id="cardAddBtn_${product.productId}" onclick="addToCart(${product.productId})" ${isOutOfStock ? 'disabled' : ''}>
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
          </svg>
          <span>${isOutOfStock ? 'Out of Stock' : 'Add to Cart'}</span>
        </button>
      </div>
    </article>
  `;
}

/* ==============================================================
   Homepage Sections: New Arrivals & Top Selling
   ============================================================== */
function renderNewArrivals() {
  const container = document.getElementById("newArrivalsGrid");
  if (!container) return;
  const products = getStoredProducts().filter(p => p.active !== false);

  // New arrivals: items 16, 18, 19, 20 (Classic T-shirt, Graphic T-shirt, Denim, Checkered shirt)
  const arrivals = [
    products.find(p => p.productId === 16) || products[0],
    products.find(p => p.productId === 18) || products[1],
    products.find(p => p.productId === 19) || products[2],
    products.find(p => p.productId === 20) || products[3]
  ].filter(Boolean);

  container.innerHTML = arrivals.map(p => renderProductCard(p)).join("");
}

function renderTopSelling() {
  const container = document.getElementById("topSellingGrid");
  if (!container) return;
  const products = getStoredProducts().filter(p => p.active !== false);

  // Top selling: items 17, 21, 5, 13 (Wool coat, Striped shirt, Headphones, Casio Calculator)
  const topSelling = [
    products.find(p => p.productId === 17) || products[0],
    products.find(p => p.productId === 21) || products[1],
    products.find(p => p.productId === 5) || products[2],
    products.find(p => p.productId === 13) || products[3]
  ].filter(Boolean);

  container.innerHTML = topSelling.map(p => renderProductCard(p)).join("");
}

/* ==============================================================
   Main Catalog Filtering, Sorting, and Rendering
   ============================================================== */
function loadAndRenderProducts() {
  let products = getStoredProducts().filter(p => p.active !== false);

  if (currentFilter.categoryId > 0) {
    products = products.filter(p => p.categoryId === currentFilter.categoryId);
  }

  if (currentFilter.searchTerm) {
    const term = currentFilter.searchTerm.toLowerCase().trim();
    products = products.filter(p =>
      p.name.toLowerCase().includes(term) ||
      (p.shortSpecs && p.shortSpecs.toLowerCase().includes(term)) ||
      (p.description && p.description.toLowerCase().includes(term)) ||
      (p.categoryName && p.categoryName.toLowerCase().includes(term))
    );
  }

  if (currentFilter.minPrice !== null && !isNaN(currentFilter.minPrice)) {
    products = products.filter(p => p.price >= currentFilter.minPrice);
  }
  if (currentFilter.maxPrice !== null && !isNaN(currentFilter.maxPrice) && currentFilter.maxPrice > 0) {
    products = products.filter(p => p.price <= currentFilter.maxPrice);
  }

  if (currentFilter.inStockOnly) {
    products = products.filter(p => p.stockQuantity > 0);
  }

  if (currentFilter.minRating > 0) {
    products = products.filter(p => p.rating >= currentFilter.minRating);
  }

  // Sorting
  if (currentFilter.sortBy === "price_asc") {
    products.sort((a, b) => a.price - b.price);
  } else if (currentFilter.sortBy === "price_desc") {
    products.sort((a, b) => b.price - a.price);
  } else if (currentFilter.sortBy === "rating") {
    products.sort((a, b) => b.rating - a.rating);
  } else {
    // Featured / Most Popular
    products.sort((a, b) => (b.reviewCount || 0) - (a.reviewCount || 0));
  }

  renderProductGrid(products);
}

function renderProductGrid(products) {
  const grid = document.getElementById("productsGrid");
  const emptyState = document.getElementById("emptyState");
  const countText = document.getElementById("visibleCountText");
  const filterBadge = document.getElementById("activeFilterBadge");
  const categoryTitle = document.getElementById("catalogCategoryTitle");
  const breadcrumbCategory = document.getElementById("breadcrumbCategory");

  if (!grid) return;

  if (countText) countText.textContent = products.length;

  const catNames = {
    0: "All Products",
    1: "Tech Peripherals",
    2: "Audio & Wearables",
    3: "Textbooks & CS Books",
    4: "Hardware & DIY",
    5: "Campus Stationery",
    6: "Casual Wear",
    7: "Formal & Evening",
    8: "Outerwear & Coats"
  };

  const currentCatName = catNames[currentFilter.categoryId] || "Products";
  if (categoryTitle) categoryTitle.textContent = currentCatName;
  if (breadcrumbCategory) breadcrumbCategory.textContent = currentCatName;

  if (filterBadge) {
    if (currentFilter.searchTerm) {
      filterBadge.style.display = "inline-block";
      filterBadge.textContent = `Search: "${currentFilter.searchTerm}"`;
    } else if (currentFilter.categoryId > 0) {
      filterBadge.style.display = "inline-block";
      filterBadge.textContent = currentCatName;
    } else {
      filterBadge.style.display = "none";
    }
  }

  if (products.length === 0) {
    grid.innerHTML = "";
    if (emptyState) {
      emptyState.style.display = "block";
      const msg = document.getElementById("emptyStateMessage");
      if (currentFilter.searchTerm) {
        msg.textContent = `No products found for "${currentFilter.searchTerm}". Try clearing search or adjusting your filters.`;
      } else {
        msg.textContent = "No products found matching your current filter criteria.";
      }
    }
    return;
  }

  if (emptyState) emptyState.style.display = "none";
  grid.innerHTML = products.map(product => renderProductCard(product)).join("");
}

function filterByCategory(catId) {
  currentFilter.categoryId = parseInt(catId);

  const radios = document.getElementsByName("catRadio");
  radios.forEach(r => {
    if (parseInt(r.value) === currentFilter.categoryId) r.checked = true;
  });

  loadAndRenderProducts();
  scrollToCatalog();
}

function handleSearchInput(term) {
  currentFilter.searchTerm = term;
  loadAndRenderProducts();
}

function handleSortChange(sortVal) {
  currentFilter.sortBy = sortVal;
  loadAndRenderProducts();
}

function applyFilters() {
  const min = parseFloat(document.getElementById("minPriceInput")?.value);
  const max = parseFloat(document.getElementById("maxPriceInput")?.value);
  currentFilter.minPrice = isNaN(min) ? null : min;
  currentFilter.maxPrice = isNaN(max) ? null : max;

  const inStock = document.getElementById("inStockCheckbox")?.checked;
  currentFilter.inStockOnly = !!inStock;

  const ratingRadios = document.getElementsByName("ratingRadio");
  for (const r of ratingRadios) {
    if (r.checked) {
      currentFilter.minRating = parseFloat(r.value) || 0;
      break;
    }
  }

  loadAndRenderProducts();
}

function resetAllFilters() {
  currentFilter = {
    categoryId: 0,
    searchTerm: "",
    minPrice: null,
    maxPrice: null,
    inStockOnly: false,
    minRating: 0,
    size: "ALL",
    sortBy: "featured"
  };

  const searchInput = document.getElementById("searchInput");
  if (searchInput) searchInput.value = "";

  const minInput = document.getElementById("minPriceInput");
  const maxInput = document.getElementById("maxPriceInput");
  if (minInput) minInput.value = "";
  if (maxInput) maxInput.value = "";

  const inStock = document.getElementById("inStockCheckbox");
  if (inStock) inStock.checked = false;

  const catRadios = document.getElementsByName("catRadio");
  catRadios.forEach(r => { if (r.value === "0") r.checked = true; });

  const ratingRadios = document.getElementsByName("ratingRadio");
  ratingRadios.forEach(r => { if (r.value === "0") r.checked = true; });

  const sortSelect = document.getElementById("sortSelect");
  if (sortSelect) sortSelect.value = "featured";

  loadAndRenderProducts();
  showToast("Filters reset to default", "info");
}

function toggleSizeFilter(btn, size) {
  document.querySelectorAll(".size-chip-btn").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");
  currentFilter.size = size;
  showToast(`Filtering size: ${size}`, "info");
}

function scrollToCatalog() {
  const section = document.getElementById("catalogSection");
  if (section) {
    section.scrollIntoView({ behavior: "smooth" });
  }
}

/* ==============================================================
   PRODUCT DETAIL MODAL (PDP - Reference Image 3 "Refined Edge")
   ============================================================== */
function openProductModal(productId) {
  const products = getStoredProducts();
  const p = products.find(prod => prod.productId === productId);
  if (!p) return;

  currentPDPProduct = p;
  selectedPDPSize = "M";
  selectedPDPColor = "Default";
  selectedPDPQty = 1;

  const modal = document.getElementById("productModal");
  const modalBody = document.getElementById("productModalBody");
  if (!modal || !modalBody) return;

  const discount = p.mrp > p.price ? Math.round(((p.mrp - p.price) / p.mrp) * 100) : 0;
  const isOutOfStock = p.stockQuantity <= 0;
  const imgPath = `assets/images/${p.imageUrl || 'mouse.jpg'}`;

  modalBody.innerHTML = `
    <!-- Left Column: Gallery & Thumbnails -->
    <div class="pdp-gallery-column">
      <div class="pdp-main-image-box">
        <img id="pdpMainImg" src="${imgPath}" alt="${escapeHtml(p.name)}">
      </div>
      <div class="pdp-thumbnails-row">
        <div class="pdp-thumb-item active" onclick="switchPDPThumb('${imgPath}', this)">
          <img src="${imgPath}" alt="Thumbnail 1">
        </div>
        <div class="pdp-thumb-item" onclick="switchPDPThumb('${imgPath}', this)">
          <img src="${imgPath}" alt="Thumbnail 2" style="opacity:0.85;">
        </div>
      </div>
    </div>

    <!-- Right Column: Product Info & Actions -->
    <div class="pdp-info-column">
      <span class="pdp-category-tag">${escapeHtml(p.categoryName || 'Fashion')}</span>
      <h2 class="pdp-title">${escapeHtml(p.name)}</h2>

      <div class="pdp-rating-row">
        <span style="color:var(--star-amber-dark); font-size:16px;">★</span>
        <strong style="color:var(--star-amber-dark); font-size:15px;">${Number(p.rating || 4.4).toFixed(1)}</strong>
        <span style="color:var(--text-muted); font-size:14px;">(${p.reviewCount || 86} verified customer reviews)</span>
      </div>

      <div class="pdp-pricing-row">
        <span class="pdp-price-current">₹${Number(p.price).toLocaleString('en-IN')}</span>
        ${p.mrp > p.price ? `<span class="pdp-price-mrp">₹${Number(p.mrp).toLocaleString('en-IN')}</span>` : ''}
        ${discount > 0 ? `<span class="card-discount-badge">-${discount}% OFF</span>` : ''}
      </div>

      <p class="pdp-desc">${escapeHtml(p.description)}</p>

      <!-- Color Selection -->
      <div class="pdp-option-section">
        <div class="pdp-option-heading">Select Color: <span id="pdpColorLabel" style="font-weight:400; text-transform:none;">Beige</span></div>
        <div class="pdp-colors-row">
          <div class="pdp-color-circle active" style="background:#e8dfd8;" onclick="selectPDPColor(this, 'Beige')" title="Beige"></div>
          <div class="pdp-color-circle" style="background:#334155;" onclick="selectPDPColor(this, 'Charcoal')" title="Charcoal"></div>
          <div class="pdp-color-circle" style="background:#ffffff;" onclick="selectPDPColor(this, 'Off-White')" title="White"></div>
        </div>
      </div>

      <!-- Size Selection -->
      <div class="pdp-option-section">
        <div class="pdp-option-heading">Choose Size:</div>
        <div class="pdp-sizes-row">
          <button type="button" class="pdp-size-btn" onclick="selectPDPSize(this, 'XS')">XS</button>
          <button type="button" class="pdp-size-btn" onclick="selectPDPSize(this, 'S')">S</button>
          <button type="button" class="pdp-size-btn active" onclick="selectPDPSize(this, 'M')">M</button>
          <button type="button" class="pdp-size-btn" onclick="selectPDPSize(this, 'L')">L</button>
          <button type="button" class="pdp-size-btn" onclick="selectPDPSize(this, 'XL')">XL</button>
        </div>
      </div>

      <!-- Quantity + Add to Cart Action -->
      <div class="pdp-actions-row">
        <div class="pdp-qty-stepper">
          <button type="button" class="pdp-qty-btn" onclick="updatePDPQty(-1)">&minus;</button>
          <span class="pdp-qty-val" id="pdpQtyVal">1</span>
          <button type="button" class="pdp-qty-btn" onclick="updatePDPQty(1)">&plus;</button>
        </div>
        <button type="button" class="pdp-btn-add" onclick="addCurrentPDPToCart()" ${isOutOfStock ? 'disabled' : ''}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
            <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
          </svg>
          <span>${isOutOfStock ? 'Out of Stock' : 'Add to Cart'}</span>
        </button>
      </div>

      <!-- Accordions -->
      <div class="pdp-accordion-box">
        <div class="accordion-item open">
          <div class="accordion-header" onclick="toggleAccordion(this)">
            <span>Delivery & Campus Returns</span>
            <span>&darr;</span>
          </div>
          <div class="accordion-content">
            Free hostel delivery within 24 hours across IITM & GUVI campus. Hassle-free 7-day exchanges available.
          </div>
        </div>
        <div class="accordion-item">
          <div class="accordion-header" onclick="toggleAccordion(this)">
            <span>Specifications & Composition</span>
            <span>&darr;</span>
          </div>
          <div class="accordion-content">
            ${escapeHtml(p.shortSpecs || 'High-grade premium fabric blend with reinforced stitching and sustainable dyes.')}
          </div>
        </div>
      </div>
    </div>
  `;

  modal.classList.add("open");
}

function closeProductModal() {
  const modal = document.getElementById("productModal");
  if (modal) modal.classList.remove("open");
}

function switchPDPThumb(src, elem) {
  const img = document.getElementById("pdpMainImg");
  if (img) img.src = src;
  document.querySelectorAll(".pdp-thumb-item").forEach(t => t.classList.remove("active"));
  elem.classList.add("active");
}

function selectPDPColor(elem, color) {
  document.querySelectorAll(".pdp-color-circle").forEach(c => c.classList.remove("active"));
  elem.classList.add("active");
  selectedPDPColor = color;
  const lbl = document.getElementById("pdpColorLabel");
  if (lbl) lbl.textContent = color;
}

function selectPDPSize(btn, size) {
  document.querySelectorAll(".pdp-size-btn").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");
  selectedPDPSize = size;
}

function updatePDPQty(delta) {
  selectedPDPQty = Math.max(1, selectedPDPQty + delta);
  const elem = document.getElementById("pdpQtyVal");
  if (elem) elem.textContent = selectedPDPQty;
}

function addCurrentPDPToCart() {
  if (!currentPDPProduct) return;
  addToCart(currentPDPProduct.productId, selectedPDPQty, selectedPDPSize, selectedPDPColor);
  closeProductModal();
}

function toggleAccordion(header) {
  const item = header.parentElement;
  item.classList.toggle("open");
}

/* ==============================================================
   CART FUNCTIONALITY & DRAWER
   ============================================================== */
function addToCart(productId, qty = 1, size = "M", color = "Default") {
  const products = getStoredProducts();
  const p = products.find(prod => prod.productId === productId);
  if (!p) return;

  if (p.stockQuantity <= 0) {
    showToast(`"${p.name}" is currently out of stock`, "error");
    return;
  }

  let cart = getCart();
  const existingIndex = cart.findIndex(item => item.productId === productId && item.size === size);

  if (existingIndex > -1) {
    if (cart[existingIndex].quantity + qty > p.stockQuantity) {
      showToast(`Cannot add more than ${p.stockQuantity} units of this item`, "error");
      return;
    }
    cart[existingIndex].quantity += qty;
  } else {
    cart.push({
      productId: p.productId,
      name: p.name,
      price: p.price,
      mrp: p.mrp,
      imageUrl: p.imageUrl,
      categoryName: p.categoryName,
      size: size,
      color: color,
      quantity: qty
    });
  }

  saveCart(cart);

  // Button visual feedback on card
  const btn = document.getElementById(`cardAddBtn_${productId}`);
  if (btn) {
    btn.classList.add("added");
    const originalText = btn.innerHTML;
    btn.innerHTML = `<span>Added!</span>`;
    setTimeout(() => {
      btn.classList.remove("added");
      btn.innerHTML = originalText;
    }, 1200);
  }

  showToast(`Added "${p.name}" to cart`, "success");
  toggleCartDrawer(true);
}

function updateCartItemQuantity(productId, size, delta) {
  let cart = getCart();
  const item = cart.find(it => it.productId === productId && it.size === size);
  if (!item) return;

  const products = getStoredProducts();
  const prod = products.find(p => p.productId === productId);
  const maxStock = prod ? prod.stockQuantity : 999;

  item.quantity += delta;
  if (item.quantity <= 0) {
    cart = cart.filter(it => !(it.productId === productId && it.size === size));
  } else if (item.quantity > maxStock) {
    item.quantity = maxStock;
    showToast(`Maximum available stock reached (${maxStock})`, "error");
  }

  saveCart(cart);
}

function removeCartItem(productId, size) {
  let cart = getCart();
  cart = cart.filter(it => !(it.productId === productId && it.size === size));
  saveCart(cart);
  showToast("Item removed from cart", "info");
}

function toggleCartDrawer(open) {
  const drawer = document.getElementById("cartDrawer");
  const overlay = document.getElementById("cartOverlay");
  if (!drawer || !overlay) return;

  if (open) {
    renderCartDrawer();
    drawer.classList.add("open");
    overlay.classList.add("open");
  } else {
    drawer.classList.remove("open");
    overlay.classList.remove("open");
  }
}

function updateCartBadge() {
  const cart = getCart();
  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const badge = document.getElementById("cartCountBadge");
  if (badge) badge.textContent = totalCount;

  const drawerCount = document.getElementById("cartDrawerCount");
  if (drawerCount) drawerCount.textContent = totalCount;
}

function renderCartDrawer() {
  const cart = getCart();
  const body = document.getElementById("cartDrawerBody");
  const footer = document.getElementById("cartDrawerFooter");
  if (!body) return;

  if (cart.length === 0) {
    body.innerHTML = `
      <div style="text-align:center; padding:60px 20px; color:var(--text-muted);">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="margin:0 auto 16px; color:var(--text-light);"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
        <h4 style="font-family:var(--font-heading); font-size:18px; font-weight:700; color:var(--text-heading); margin-bottom:6px;">Your cart is empty</h4>
        <p style="font-size:13px; margin-bottom:20px;">Explore our new arrivals and find garments that match your style.</p>
        <button type="button" class="btn-view-all" onclick="toggleCartDrawer(false); scrollToCatalog();">Start Shopping</button>
      </div>
    `;
    if (footer) footer.style.display = "none";
    return;
  }

  if (footer) footer.style.display = "flex";

  body.innerHTML = cart.map(item => {
    const imgPath = `assets/images/${item.imageUrl || 'mouse.jpg'}`;
    return `
      <div class="cart-item-card">
        <div class="cart-item-thumb">
          <img src="${imgPath}" alt="${escapeHtml(item.name)}">
        </div>
        <div class="cart-item-details">
          <div>
            <h4 class="cart-item-title">${escapeHtml(item.name)}</h4>
            <div class="cart-item-variant">Size: <strong>${item.size || 'M'}</strong></div>
          </div>
          <div class="cart-item-price-qty">
            <span class="cart-item-price">₹${Number(item.price).toLocaleString('en-IN')}</span>
            <div class="cart-qty-controls">
              <button type="button" class="cart-qty-btn" onclick="updateCartItemQuantity(${item.productId}, '${item.size}', -1)">&minus;</button>
              <span class="cart-qty-num">${item.quantity}</span>
              <button type="button" class="cart-qty-btn" onclick="updateCartItemQuantity(${item.productId}, '${item.size}', 1)">&plus;</button>
            </div>
          </div>
        </div>
        <button type="button" class="btn-remove-item" onclick="removeCartItem(${item.productId}, '${item.size}')" title="Remove Item">&times;</button>
      </div>
    `;
  }).join("");

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  let discount = appliedCoupon === "GUVI20" ? Math.round(subtotal * 0.20) : (appliedCoupon === "GUVI10" ? Math.round(subtotal * 0.10) : 0);
  const finalTotal = Math.max(0, subtotal - discount);

  const subtotalElem = document.getElementById("cartSubtotalText");
  const discountLine = document.getElementById("discountLine");
  const discountElem = document.getElementById("cartDiscountText");
  const finalTotalElem = document.getElementById("cartFinalTotalText");

  if (subtotalElem) subtotalElem.textContent = `₹${subtotal.toLocaleString('en-IN')}`;
  if (discountLine && discountElem) {
    if (discount > 0) {
      discountLine.style.display = "flex";
      discountElem.textContent = `-₹${discount.toLocaleString('en-IN')}`;
    } else {
      discountLine.style.display = "none";
    }
  }
  if (finalTotalElem) finalTotalElem.textContent = `₹${finalTotal.toLocaleString('en-IN')}`;
}

function applyCoupon() {
  const input = document.getElementById("couponInput");
  const code = (input ? input.value : "").trim().toUpperCase();
  applyCouponCode(code);
}

function applyCouponCode(code) {
  const msgElem = document.getElementById("couponMessage");
  if (code === "GUVI20" || code === "GUVI10") {
    appliedCoupon = code;
    showToast(`Promo code "${code}" applied successfully!`, "success");
    if (msgElem) {
      msgElem.style.display = "block";
      msgElem.style.color = "var(--status-success)";
      msgElem.textContent = `Promo code ${code} active!`;
    }
  } else {
    showToast("Invalid coupon code. Try GUVI20", "error");
    if (msgElem) {
      msgElem.style.display = "block";
      msgElem.style.color = "var(--status-danger)";
      msgElem.textContent = "Invalid code. Enter GUVI20.";
    }
  }
  renderCartDrawer();
}

/* ==============================================================
   CHECKOUT & ORDER ATOMIC CREATION
   ============================================================== */
function openCheckoutModal() {
  const cart = getCart();
  if (cart.length === 0) {
    showToast("Your cart is empty. Add products first.", "error");
    return;
  }

  toggleCartDrawer(false);

  const subtotal = cart.reduce((sum, i) => sum + (i.price * i.quantity), 0);
  let discount = appliedCoupon === "GUVI20" ? Math.round(subtotal * 0.20) : (appliedCoupon === "GUVI10" ? Math.round(subtotal * 0.10) : 0);
  const finalTotal = Math.max(0, subtotal - discount);

  const checkoutAmt = document.getElementById("checkoutFinalAmountText");
  if (checkoutAmt) checkoutAmt.textContent = `₹${finalTotal.toLocaleString('en-IN')}`;

  const modal = document.getElementById("checkoutModal");
  if (modal) modal.classList.add("open");
}

function closeCheckoutModal() {
  const modal = document.getElementById("checkoutModal");
  if (modal) modal.classList.remove("open");
}

async function submitOrder() {
  const cart = getCart();
  if (cart.length === 0) return;

  const name = document.getElementById("shipName").value.trim();
  const phone = document.getElementById("shipPhone").value.trim();
  const address = document.getElementById("shipAddress").value.trim();
  const pin = document.getElementById("shipPin").value.trim();
  const payment = document.getElementById("payMethod").value;

  const subtotal = cart.reduce((sum, i) => sum + (i.price * i.quantity), 0);
  let discount = appliedCoupon === "GUVI20" ? Math.round(subtotal * 0.20) : (appliedCoupon === "GUVI10" ? Math.round(subtotal * 0.10) : 0);
  const tax = Math.round((subtotal - discount) * 0.05);
  const finalAmount = Math.max(0, subtotal - discount + tax);

  const orderNum = `ORD-2026-${Math.floor(1000 + Math.random() * 9000)}`;

  const newOrder = {
    orderId: Date.now(),
    orderNumber: orderNum,
    userId: 4,
    buyerName: name,
    totalAmount: subtotal,
    discountAmount: discount,
    taxAmount: tax,
    shippingFee: 0.0,
    finalAmount: finalAmount,
    paymentMethod: payment,
    paymentStatus: payment === "COD" ? "PENDING" : "COMPLETED",
    orderStatus: "CONFIRMED",
    shippingName: name,
    shippingPhone: phone,
    shippingAddress: address,
    shippingPincode: pin,
    createdAt: new Date().toISOString().replace('T', ' ').substring(0, 19),
    items: cart.map((it, idx) => ({
      itemId: idx + 1,
      productId: it.productId,
      productName: it.name,
      unitPrice: it.price,
      quantity: it.quantity,
      lineTotal: it.price * it.quantity
    }))
  };

  // 1. Save in local storage
  let orders = getStoredOrders();
  orders.unshift(newOrder);
  saveStoredOrders(orders);

  // 2. Reduce inventory in local storage
  let products = getStoredProducts();
  cart.forEach(c => {
    const p = products.find(prod => prod.productId === c.productId);
    if (p) p.stockQuantity = Math.max(0, p.stockQuantity - c.quantity);
  });
  saveStoredProducts(products);

  // 3. Post to backend REST API
  if (window.location.protocol.startsWith("http")) {
    try {
      await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newOrder)
      });
    } catch (e) {}
  }

  // 4. Clear cart & close checkout
  saveCart([]);
  appliedCoupon = null;
  closeCheckoutModal();

  // 5. Open Success Modal
  const successModal = document.getElementById("orderSuccessModal");
  const successNum = document.getElementById("successOrderNum");
  if (successNum) successNum.textContent = orderNum;
  if (successModal) successModal.classList.add("open");

  showToast(`Order ${orderNum} placed successfully!`, "success");
}

function closeOrderSuccessModal() {
  const modal = document.getElementById("orderSuccessModal");
  if (modal) modal.classList.remove("open");
}

function trackNewlyPlacedOrder() {
  const successNum = document.getElementById("successOrderNum");
  const orderNum = successNum ? successNum.textContent.trim() : "";
  closeOrderSuccessModal();
  openRouteModal(orderNum);
}

/* ==============================================================
   DELIVERY ROUTE TRACKING MODAL
   ============================================================== */
function openRouteModal(orderNumber) {
  const modal = document.getElementById("routeModal");
  if (!modal) return;

  const orders = getStoredOrders();
  const chipsContainer = document.getElementById("routeQuickChips");
  if (chipsContainer) {
    chipsContainer.innerHTML = orders.slice(0, 4).map(o => `
      <button type="button" class="route-chip-btn" onclick="lookupRouteOrder('${o.orderNumber}')">
        ${o.orderNumber} (${o.orderStatus})
      </button>
    `).join("");
  }

  const targetOrderNum = orderNumber || (orders.find(o => o.orderStatus === "OUT_FOR_DELIVERY") || orders[0])?.orderNumber;
  const input = document.getElementById("routeSearchInput");
  if (input && targetOrderNum) {
    input.value = targetOrderNum;
  }

  if (targetOrderNum) {
    lookupRouteOrder(targetOrderNum);
  }

  modal.classList.add("open");
}

function closeRouteModal() {
  const modal = document.getElementById("routeModal");
  if (modal) modal.classList.remove("open");
}

function lookupRouteOrder(explicitNum) {
  const input = document.getElementById("routeSearchInput");
  const num = (explicitNum || (input ? input.value.trim() : "")).toUpperCase();
  if (!num) {
    showToast("Please enter an Order ID", "error");
    return;
  }

  const orders = getStoredOrders();
  const order = orders.find(o => o.orderNumber.toUpperCase() === num);
  if (!order) {
    showToast(`Order "${num}" not found. Verify order number.`, "error");
    return;
  }

  const numElem = document.getElementById("routeOrderNum");
  const badgeElem = document.getElementById("routeStatusBadge");
  const addressElem = document.getElementById("routeAddress");
  const timeElem = document.getElementById("routeEstimatedTime");

  if (numElem) numElem.textContent = order.orderNumber;
  if (badgeElem) {
    badgeElem.textContent = order.orderStatus;
    badgeElem.className = `route-status-pill badge-status badge-${order.orderStatus.toLowerCase()}`;
  }
  if (addressElem) {
    addressElem.textContent = `${order.shippingAddress || "Campus Delivery Desk"}, PIN: ${order.shippingPincode || "600113"}`;
  }
  if (timeElem) {
    if (order.orderStatus === "DELIVERED") {
      timeElem.textContent = "Delivered to recipient";
      timeElem.style.color = "var(--status-success)";
    } else if (order.orderStatus === "OUT_FOR_DELIVERY") {
      timeElem.textContent = "Today by 7:00 PM";
      timeElem.style.color = "var(--status-success)";
    } else {
      timeElem.textContent = "Expected in 1-2 business days";
      timeElem.style.color = "var(--btn-cart-blue)";
    }
  }

  renderRouteTimeline(order);

  const itemsBox = document.getElementById("routeItemsBox");
  if (itemsBox && Array.isArray(order.items)) {
    itemsBox.innerHTML = `
      <div style="font-size:12px; font-weight:700; color:var(--text-muted); text-transform:uppercase; margin-bottom:8px;">Package Contents (${order.items.length} items):</div>
      ${order.items.map(it => `
        <div style="display:flex; justify-content:space-between; font-size:13px; margin-bottom:4px;">
          <span>${escapeHtml(it.productName)} &times; ${it.quantity}</span>
          <strong>₹${Number(it.lineTotal).toLocaleString('en-IN')}</strong>
        </div>
      `).join("")}
      <div style="display:flex; justify-content:space-between; font-size:14px; font-weight:800; margin-top:8px; padding-top:8px; border-top:1px dashed var(--border-subtle);">
        <span>Total Paid (${order.paymentMethod}):</span>
        <span style="color:var(--btn-cart-blue);">₹${Number(order.finalAmount).toLocaleString('en-IN')}</span>
      </div>
    `;
  }
}

function renderRouteTimeline(order) {
  const container = document.getElementById("routeTimeline");
  if (!container) return;

  const checkSvg = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg>`;
  const radioSvg = `<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="5"></circle></svg>`;
  const ringSvg = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="6"></circle></svg>`;

  const status = order.orderStatus || "PLACED";
  let steps = [
    { title: "Placed", status: "completed", time: "Confirmed", icon: checkSvg },
    { title: "Confirmed", status: "pending", time: "Verified", icon: ringSvg },
    { title: "Shipped", status: "pending", time: "Packaging", icon: ringSvg },
    { title: "Out for Delivery", status: "pending", time: "Dispatched", icon: ringSvg },
    { title: "Delivered", status: "pending", time: "At Destination", icon: ringSvg }
  ];

  if (status === "CONFIRMED") {
    steps[1] = { title: "Confirmed", status: "completed", time: "Verified", icon: checkSvg };
    steps[2] = { title: "Shipped", status: "active", time: "Packaging", icon: radioSvg };
  } else if (status === "SHIPPED") {
    steps[1] = { title: "Confirmed", status: "completed", time: "Verified", icon: checkSvg };
    steps[2] = { title: "Shipped", status: "completed", time: "In Transit", icon: checkSvg };
    steps[3] = { title: "Out for Delivery", status: "active", time: "Campus Hub", icon: radioSvg };
  } else if (status === "OUT_FOR_DELIVERY") {
    steps[1] = { title: "Confirmed", status: "completed", time: "Verified", icon: checkSvg };
    steps[2] = { title: "Shipped", status: "completed", time: "In Transit", icon: checkSvg };
    steps[3] = { title: "Out for Delivery", status: "completed", time: "Van #8", icon: checkSvg };
    steps[4] = { title: "Delivered", status: "active", time: "Hostel Gate", icon: radioSvg };
  } else if (status === "DELIVERED") {
    steps[1] = { title: "Confirmed", status: "completed", time: "Verified", icon: checkSvg };
    steps[2] = { title: "Shipped", status: "completed", time: "In Transit", icon: checkSvg };
    steps[3] = { title: "Out for Delivery", status: "completed", time: "Delivered", icon: checkSvg };
    steps[4] = { title: "Delivered", status: "completed", time: "Recipient Signed", icon: checkSvg };
  }

  container.innerHTML = steps.map(s => `
    <div class="route-step-node ${s.status}">
      <div class="route-node-icon">${s.icon}</div>
      <div class="route-step-title">${s.title}</div>
      <div class="route-step-time">${s.time}</div>
    </div>
  `).join("");
}

/* ==============================================================
   WISHLIST TOGGLE & DRAWER
   ============================================================== */
function toggleWishlist(productId) {
  let list = getWishlist();
  const index = list.indexOf(productId);
  if (index > -1) {
    list.splice(index, 1);
    showToast("Removed from saved wishlist", "info");
  } else {
    list.push(productId);
    showToast("Added to saved wishlist", "success");
  }
  saveWishlist(list);
  loadAndRenderProducts();
  renderNewArrivals();
  renderTopSelling();
  renderWishlistDrawer();
}

function updateWishlistBadge() {
  const list = getWishlist();
  const badge = document.getElementById("wishlistCountBadge");
  if (badge) badge.textContent = list.length;
  const drawerBadge = document.getElementById("wishlistDrawerCount");
  if (drawerBadge) drawerBadge.textContent = list.length;
}

function toggleWishlistDrawer(open) {
  const drawer = document.getElementById("wishlistDrawer");
  const overlay = document.getElementById("wishlistOverlay");
  if (!drawer || !overlay) return;

  if (open) {
    renderWishlistDrawer();
    drawer.classList.add("open");
    overlay.classList.add("open");
  } else {
    drawer.classList.remove("open");
    overlay.classList.remove("open");
  }
}

function renderWishlistDrawer() {
  const list = getWishlist();
  const body = document.getElementById("wishlistDrawerBody");
  if (!body) return;

  if (list.length === 0) {
    body.innerHTML = `
      <div style="text-align:center; padding:60px 20px; color:var(--text-muted);">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="margin:0 auto 16px; color:var(--text-light);"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
        <h4 style="font-family:var(--font-heading); font-size:18px; font-weight:700; color:var(--text-heading); margin-bottom:6px;">Your Wishlist is Empty</h4>
        <p style="font-size:13px; margin-bottom:20px;">Save your favorite garments and accessories to review later.</p>
        <button type="button" class="btn-view-all" onclick="toggleWishlistDrawer(false); scrollToCatalog();">Browse Catalog</button>
      </div>
    `;
    return;
  }

  const products = getStoredProducts();
  const wishlistedProducts = products.filter(p => list.includes(p.productId));

  body.innerHTML = wishlistedProducts.map(p => {
    const imgPath = `assets/images/${p.imageUrl || 'mouse.jpg'}`;
    return `
      <div class="cart-item-card">
        <div class="cart-item-thumb" onclick="openProductModal(${p.productId})" style="cursor:pointer;">
          <img src="${imgPath}" alt="${escapeHtml(p.name)}">
        </div>
        <div class="cart-item-details">
          <div>
            <h4 class="cart-item-title" onclick="openProductModal(${p.productId})" style="cursor:pointer;">${escapeHtml(p.name)}</h4>
            <div class="cart-item-variant">${escapeHtml(p.categoryName || 'Fashion')}</div>
          </div>
          <div class="cart-item-price-qty">
            <span class="cart-item-price">₹${Number(p.price).toLocaleString('en-IN')}</span>
            <button type="button" class="card-btn-add-cart" style="height:32px; padding:0 14px; font-size:12px; width:auto;" onclick="addToCart(${p.productId})">
              Add to Cart
            </button>
          </div>
        </div>
        <button type="button" class="btn-remove-item" onclick="toggleWishlist(${p.productId})" title="Remove">&times;</button>
      </div>
    `;
  }).join("");
}

/* ==============================================================
   ANNOUNCEMENT & NEWSLETTER HANDLERS
   ============================================================== */
function closeAnnouncementBar() {
  const bar = document.getElementById("announcementBar");
  if (bar) bar.style.display = "none";
}

function handleNewsletterSubscribe() {
  const input = document.getElementById("newsletterEmailInput");
  const email = input ? input.value.trim() : "";
  if (!email || !email.includes("@")) {
    showToast("Please enter a valid email address", "error");
    return;
  }

  showToast("Thank you for subscribing! Your 20% discount code is GUVI20", "success");
  if (input) input.value = "";
}

function handleRoleSwitch(role) {
  setCurrentRole(role);
  updateRoleVisibility(role);
  showToast(`Switched active session to: ${role}`, "info");
}

function toggleMobileNav() {
  const section = document.getElementById("catalogSection");
  if (section) section.scrollIntoView({ behavior: "smooth" });
}

function toggleMobileFilters() {
  const filterCard = document.querySelector(".filter-card");
  if (filterCard) {
    if (filterCard.style.display === "block") {
      filterCard.style.display = "none";
    } else {
      filterCard.style.display = "block";
      filterCard.scrollIntoView({ behavior: "smooth" });
    }
  }
}

/* ==============================================================
   TOAST & UTILITIES
   ============================================================== */
function showToast(message, type = "info") {
  const container = document.getElementById("toastContainer");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  toast.innerHTML = `<span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateX(20px)";
    toast.style.transition = "all 0.25s ease";
    setTimeout(() => toast.remove(), 250);
  }, 2800);
}

function escapeHtml(str) {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/* ==============================================================
   DASHBOARD IMPLEMENTATION
   ============================================================== */
function initDashboard() {
  const urlParams = new URLSearchParams(window.location.search);
  const paramRole = urlParams.get("role");
  const trackParam = urlParams.get("track");
  const actionParam = urlParams.get("action");
  const activeRole = paramRole || getCurrentRole();
  switchDashboardRole(activeRole);
  syncFromBackend().then(() => {
    switchDashboardRole(getCurrentRole());
    if (trackParam) {
      openRouteModal(trackParam);
    }
    if (actionParam === "add_product") {
      if (getCurrentRole() === "SELLER") {
        openAddProductModal();
      }
    }
  });
}

function switchDashboardRole(role) {
  setCurrentRole(role);
  updateRoleVisibility(role);

  ["BUYER", "SELLER", "ADMIN"].forEach(r => {
    const tab = document.getElementById(`tab${r.charAt(0) + r.slice(1).toLowerCase()}`);
    if (tab) {
      if (r === role) tab.classList.add("active");
      else tab.classList.remove("active");
    }
  });

  const userName = document.getElementById("dashUserName");
  const userEmail = document.getElementById("dashUserEmail");
  const heading = document.getElementById("dashHeading");
  const subheading = document.getElementById("dashSubheading");

  const buyerSection = document.getElementById("buyerSection");
  const sellerSection = document.getElementById("sellerSection");
  const adminSection = document.getElementById("adminSection");

  if (buyerSection) buyerSection.style.display = "none";
  if (sellerSection) sellerSection.style.display = "none";
  if (adminSection) adminSection.style.display = "none";

  if (role === "BUYER") {
    if (userName) userName.textContent = "Rahul Sharma";
    if (userEmail) userEmail.textContent = "rahul.s@student.guvi.in";
    if (heading) heading.textContent = "Student Buyer Dashboard";
    if (subheading) subheading.textContent = "Review past purchases, download order receipts, and track express campus hostel packages.";
    if (buyerSection) buyerSection.style.display = "block";
    renderBuyerDashboard();
  } else if (role === "SELLER") {
    if (userName) userName.textContent = "Campus Style Studio";
    if (userEmail) userEmail.textContent = "seller.style@guvi.in";
    if (heading) heading.textContent = "Seller Inventory & Sales Portal";
    if (subheading) subheading.textContent = "Manage product catalog, monitor real-time stock levels, and dispatch student hostel deliveries.";
    if (sellerSection) sellerSection.style.display = "block";
    renderSellerDashboard();
  } else if (role === "ADMIN") {
    if (userName) userName.textContent = "System Administrator";
    if (userEmail) userEmail.textContent = "admin@guvi.in";
    if (heading) heading.textContent = "Platform Administration Console";
    if (subheading) subheading.textContent = "Moderate platform users, verify catalog listings, and review transactional platform orders.";
    if (adminSection) adminSection.style.display = "block";
    renderAdminDashboard();
  }
}

function renderBuyerDashboard() {
  const orders = getStoredOrders().filter(o => o.userId === 4);
  const metricsGrid = document.getElementById("metricsGrid");

  const totalSpent = orders.reduce((sum, o) => sum + o.finalAmount, 0);
  const inTransit = orders.filter(o => o.orderStatus === "SHIPPED" || o.orderStatus === "OUT_FOR_DELIVERY").length;

  if (metricsGrid) {
    metricsGrid.innerHTML = `
      <div class="metric-stat-box">
        <div class="metric-stat-label">Total Orders</div>
        <div class="metric-stat-value">${orders.length}</div>
        <div class="metric-stat-sub">Lifetime orders placed</div>
      </div>
      <div class="metric-stat-box">
        <div class="metric-stat-label">In-Transit</div>
        <div class="metric-stat-value" style="color:var(--btn-cart-blue);">${inTransit}</div>
        <div class="metric-stat-sub">Pending hostel delivery</div>
      </div>
      <div class="metric-stat-box">
        <div class="metric-stat-label">Total Spent</div>
        <div class="metric-stat-value">₹${totalSpent.toLocaleString('en-IN')}</div>
        <div class="metric-stat-sub">Via UPI, Net Banking & COD</div>
      </div>
      <div class="metric-stat-box">
        <div class="metric-stat-label">Hostel Address</div>
        <div class="metric-stat-value" style="font-size:22px; margin-top:14px;">Kaveri 204</div>
        <div class="metric-stat-sub">IITM Campus, Chennai</div>
      </div>
    `;
  }

  const tbody = document.getElementById("buyerOrdersTbody");
  if (!tbody) return;

  if (orders.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7" style="text-align:center; padding:30px; color:var(--text-muted);">You have not placed any orders yet. <a href="index.html">Start shopping</a></td></tr>`;
    return;
  }

  tbody.innerHTML = orders.map(o => {
    const itemsSummary = o.items.map(it => `${escapeHtml(it.productName)} (x${it.quantity})`).join(", ");
    return `
      <tr>
        <td style="font-family:var(--font-mono); font-weight:700;">${o.orderNumber}</td>
        <td>${o.createdAt.substring(0, 10)}</td>
        <td style="max-width:260px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;" title="${itemsSummary}">${itemsSummary}</td>
        <td style="font-weight:800;">₹${Number(o.finalAmount).toLocaleString('en-IN')}</td>
        <td>${o.paymentMethod}</td>
        <td><span class="badge-status badge-${o.orderStatus.toLowerCase()}">${o.orderStatus}</span></td>
        <td>
          <button type="button" class="btn-view-all" style="padding:6px 14px; font-size:12px;" onclick="openRouteModal('${o.orderNumber}')">Track Route</button>
        </td>
      </tr>
    `;
  }).join("");
}

function renderSellerDashboard() {
  const products = getStoredProducts().filter(p => p.active !== false && (Number(p.sellerId) === 2 || !p.sellerId));
  const allOrders = getStoredOrders();
  const metricsGrid = document.getElementById("metricsGrid");

  const totalStockUnits = products.reduce((sum, p) => sum + (Number(p.stockQuantity) || 0), 0);
  const lowStockCount = products.filter(p => (Number(p.stockQuantity) || 0) <= 15).length;

  if (metricsGrid) {
    metricsGrid.innerHTML = `
      <div class="metric-stat-box">
        <div class="metric-stat-label">Active Listings</div>
        <div class="metric-stat-value">${products.length}</div>
        <div class="metric-stat-sub">Live in catalog</div>
      </div>
      <div class="metric-stat-box">
        <div class="metric-stat-label">Total Units</div>
        <div class="metric-stat-value">${totalStockUnits}</div>
        <div class="metric-stat-sub">Across all sizes & variants</div>
      </div>
      <div class="metric-stat-box">
        <div class="metric-stat-label">Low Stock Alerts</div>
        <div class="metric-stat-value" style="color:${lowStockCount > 0 ? 'var(--status-warning)' : 'inherit'};">${lowStockCount}</div>
        <div class="metric-stat-sub">Items with ≤ 15 units</div>
      </div>
      <div class="metric-stat-box">
        <div class="metric-stat-label">Semester Revenue</div>
        <div class="metric-stat-value">₹1,42,800</div>
        <div class="metric-stat-sub">Campus fashion sales</div>
      </div>
    `;
  }

  const tbody = document.getElementById("sellerProductsTbody");
  if (tbody) {
    if (products.length === 0) {
      tbody.innerHTML = `<tr><td colspan="9" style="text-align:center; padding:30px; color:var(--text-muted);">No products in catalog yet. Click "+ Add Product" to create your first listing.</td></tr>`;
      return;
    }
    tbody.innerHTML = products.map(p => {
      const stockVal = Math.max(0, Number(p.stockQuantity) || 0);
      const isOut = stockVal <= 0;
      const isLow = stockVal > 0 && stockVal <= 15;
      const valClass = isOut ? 'out' : (isLow ? 'low' : '');
      return `
      <tr>
        <td>#${p.productId}</td>
        <td><strong>${escapeHtml(p.name)}</strong></td>
        <td>${escapeHtml(p.categoryName || 'Fashion')}</td>
        <td>₹${Number(p.price).toLocaleString('en-IN')}</td>
        <td style="color:var(--text-light); text-decoration:line-through;">₹${Number(p.mrp).toLocaleString('en-IN')}</td>
        <td>
          <div class="stock-stepper-box">
            <button type="button" class="btn-stock-step" onclick="adjustProductStock(${p.productId}, -1)" title="Decrease stock by 1" ${stockVal <= 0 ? 'disabled' : ''}>&minus;</button>
            <span class="stock-step-val ${valClass}" id="stockDisplay_${p.productId}">${stockVal}</span>
            <button type="button" class="btn-stock-step" onclick="adjustProductStock(${p.productId}, 1)" title="Increase stock by 1">&plus;</button>
          </div>
        </td>
        <td>★ ${Number(p.rating || 4.4).toFixed(1)}</td>
        <td><span class="badge-status ${isOut ? 'badge-cancelled' : 'badge-active'}">${isOut ? 'Out of Stock' : 'Active'}</span></td>
        <td>
          <button type="button" class="btn-view-all" style="padding:4px 10px; font-size:11px;" onclick="promptStockUpdate(${p.productId})">Set Qty</button>
        </td>
      </tr>
      `;
    }).join("");
  }

  const fulfillTbody = document.getElementById("sellerFulfillTbody");
  if (fulfillTbody) {
    fulfillTbody.innerHTML = allOrders.map(o => `
      <tr>
        <td style="font-family:var(--font-mono); font-weight:700;">${o.orderNumber}</td>
        <td>${escapeHtml(o.shippingName)}</td>
        <td>${escapeHtml(o.shippingAddress)}</td>
        <td style="font-weight:700;">₹${Number(o.finalAmount).toLocaleString('en-IN')}</td>
        <td><span class="badge-status badge-${o.orderStatus.toLowerCase()}">${o.orderStatus}</span></td>
        <td>
          <div style="display:flex; gap:6px;">
            ${o.orderStatus === 'CONFIRMED' || o.orderStatus === 'PLACED' ? `
              <button type="button" class="hero-cta-btn" style="padding:4px 10px; font-size:11px; border-radius:4px;" onclick="updateOrderStatusAction('${o.orderNumber}', 'SHIPPED')">Ship</button>
            ` : o.orderStatus === 'SHIPPED' ? `
              <button type="button" class="hero-cta-btn" style="padding:4px 10px; font-size:11px; border-radius:4px; background:var(--btn-cart-blue);" onclick="updateOrderStatusAction('${o.orderNumber}', 'OUT_FOR_DELIVERY')">Dispatch</button>
            ` : o.orderStatus === 'OUT_FOR_DELIVERY' ? `
              <button type="button" class="hero-cta-btn" style="padding:4px 10px; font-size:11px; border-radius:4px; background:var(--status-success);" onclick="updateOrderStatusAction('${o.orderNumber}', 'DELIVERED')">Deliver</button>
            ` : '<span>&mdash;</span>'}
            <button type="button" class="btn-view-all" style="padding:4px 10px; font-size:11px;" onclick="openRouteModal('${o.orderNumber}')">Route</button>
          </div>
        </td>
      </tr>
    `).join("");
  }
}

/* ==============================================================
   ADMIN CONSOLE: REAL-TIME MONITORING, PRODUCTS & ORDERS
   ============================================================== */
let isLiveStreamActive = true;
let currentActivityFilter = "ALL";
let activityPollerTimer = null;
let isSavingEditProduct = false;
let pendingDeleteProductId = null;
let currentDetailOrder = null;

const INITIAL_ACTIVITIES = [
  {
    id: 1008,
    timestamp: "Just now",
    type: "SYSTEM",
    action: "HEALTH_CHECK",
    actor: "InventoryDaemon",
    description: "Scheduled inventory monitoring sweep executed successfully (0 deadlocks, active worker pool)",
    details: "Inventory Daemon #1",
    severity: "info"
  },
  {
    id: 1007,
    timestamp: "1m ago",
    type: "ORDER",
    action: "STATUS_UPDATED",
    actor: "System Administrator",
    description: "Advanced order ORD-2026-1004 status to OUT_FOR_DELIVERY",
    details: "ORD-2026-1004",
    severity: "info"
  },
  {
    id: 1006,
    timestamp: "3m ago",
    type: "ORDER",
    action: "ORDER_PLACED",
    actor: "Rahul Sharma",
    description: "Placed transactional order ORD-2026-1004 (Raspberry Pi 4 Model B) for ₹5,196.55 via UPI",
    details: "ORD-2026-1004",
    severity: "success"
  },
  {
    id: 1005,
    timestamp: "6m ago",
    type: "PRODUCT",
    action: "STOCK_ADJUSTED",
    actor: "Campus Style Studio",
    description: "Adjusted stock for 'Vintage Washed Denim Trucker Jacket' (+5 units, now 15 units)",
    details: "Product #56",
    severity: "info"
  },
  {
    id: 1004,
    timestamp: "12m ago",
    type: "INVENTORY",
    action: "LOW_STOCK_ALERT",
    actor: "InventoryDaemon",
    description: "Low stock alert triggered for 'Raspberry Pi Pico RP2040' (only 4 units remaining)",
    details: "Product #40",
    severity: "warning"
  },
  {
    id: 1003,
    timestamp: "18m ago",
    type: "USER",
    action: "USER_LOGIN",
    actor: "Rahul Sharma",
    description: "Student buyer logged in from hostel residential network",
    details: "User #4 (rahul.s@student.guvi.in)",
    severity: "info"
  },
  {
    id: 1002,
    timestamp: "25m ago",
    type: "PRODUCT",
    action: "PRODUCT_CREATED",
    actor: "Campus Tech Store",
    description: "Created new catalog listing: 'Dell Pro 1080p FHD USB Webcam' at ₹1,899.00",
    details: "Product #22",
    severity: "success"
  },
  {
    id: 1001,
    timestamp: "35m ago",
    type: "SYSTEM",
    action: "SERVER_INITIALIZED",
    actor: "System Daemon",
    description: "Backend HTTP Server & Connection Pool initialized at http://localhost:8080",
    details: "Core Server Engine",
    severity: "info"
  }
];

function getStoredActivities() {
  const stored = localStorage.getItem("guvi_activities");
  if (!stored) {
    saveStoredActivities(INITIAL_ACTIVITIES);
    return INITIAL_ACTIVITIES;
  }
  try {
    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) ? parsed : INITIAL_ACTIVITIES;
  } catch (e) {
    return INITIAL_ACTIVITIES;
  }
}

function saveStoredActivities(activities) {
  localStorage.setItem("guvi_activities", JSON.stringify(activities));
}

function logClientActivity(type, action, actor, description, details = "", severity = "info") {
  const activities = getStoredActivities();
  const now = new Date();
  const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  const newEvt = {
    id: Date.now(),
    timestamp: timeStr,
    type: type || "SYSTEM",
    action: action || "EVENT",
    actor: actor || "System Administrator",
    description: description || "System event occurred",
    details: details || "",
    severity: severity || "info"
  };
  activities.unshift(newEvt);
  if (activities.length > 100) activities.pop();
  saveStoredActivities(activities);

  if (window.location.protocol.startsWith("http")) {
    fetch("/api/admin/activities", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-User-Role": "ADMIN"
      },
      body: JSON.stringify(newEvt)
    }).catch(() => {});
  }

  if (getCurrentRole() === "ADMIN" && isLiveStreamActive) {
    renderAdminActivityFeed();
  }
}

async function renderAdminActivityFeed() {
  let activities = getStoredActivities();

  if (window.location.protocol.startsWith("http")) {
    try {
      const res = await fetch("/api/admin/activities?limit=60", {
        headers: { "X-User-Role": "ADMIN" }
      });
      if (res.ok) {
        const serverActivities = await res.json();
        if (Array.isArray(serverActivities) && serverActivities.length > 0) {
          activities = serverActivities;
          saveStoredActivities(activities);
        }
      }
    } catch (e) {}
  }

  const totalCounter = document.getElementById("adminTotalEventsCount");
  if (totalCounter) totalCounter.textContent = `${activities.length} Recorded`;

  const feedContainer = document.getElementById("adminActivityFeed");
  if (!feedContainer) return;

  const filtered = activities.filter(ev => {
    if (currentActivityFilter === "ALL") return true;
    return ev.type === currentActivityFilter;
  });

  if (filtered.length === 0) {
    feedContainer.innerHTML = `<div style="text-align:center; padding:30px; color:var(--text-muted); font-size:13px;">No activities matching filter "${currentActivityFilter}".</div>`;
    return;
  }

  const iconMap = {
    ORDER: "🛒",
    PRODUCT: "📦",
    USER: "👤",
    INVENTORY: "⚡",
    SYSTEM: "⚙️"
  };

  feedContainer.innerHTML = filtered.map(ev => {
    const icon = iconMap[ev.type] || "📌";
    const iconClass = `activity-icon-${(ev.type || 'system').toLowerCase()}`;
    return `
      <div class="activity-card">
        <div class="activity-icon-badge ${iconClass}">
          <span>${icon}</span>
        </div>
        <div class="activity-body">
          <div class="activity-header-line">
            <span class="activity-title">${escapeHtml(ev.actor || 'System')}</span>
            <span class="activity-time">${escapeHtml(ev.timestamp)}</span>
          </div>
          <div class="activity-desc">${escapeHtml(ev.description)}</div>
          <div class="activity-meta-row">
            <span class="activity-chip" style="font-weight:700;">${escapeHtml(ev.type)}</span>
            ${ev.details ? `<span class="activity-chip">${escapeHtml(ev.details)}</span>` : ''}
            <span style="color:${ev.severity === 'danger' ? '#dc2626' : (ev.severity === 'warning' ? '#d97706' : (ev.severity === 'success' ? '#059669' : 'var(--text-muted)'))}; font-weight:700; text-transform:uppercase;">● ${escapeHtml(ev.severity || 'info')}</span>
          </div>
        </div>
      </div>
    `;
  }).join("");
}

function toggleActivityLiveStream() {
  isLiveStreamActive = !isLiveStreamActive;
  const badge = document.getElementById("liveStreamBadge");
  const text = document.getElementById("liveStreamStatusText");
  const btn = document.getElementById("btnToggleLiveStream");

  if (isLiveStreamActive) {
    if (badge) badge.classList.remove("paused");
    if (text) text.textContent = "LIVE STREAM ACTIVE";
    if (btn) btn.textContent = "Pause Stream";
    showToast("Real-time activity feed resumed.", "info");
    renderAdminActivityFeed();
    startActivityPoller();
  } else {
    if (badge) badge.classList.add("paused");
    if (text) text.textContent = "STREAM PAUSED";
    if (btn) btn.textContent = "Resume Stream";
    showToast("Real-time stream paused.", "warning");
    stopActivityPoller();
  }
}

function filterActivityFeed(category, btn) {
  currentActivityFilter = category;
  if (btn && btn.parentElement) {
    btn.parentElement.querySelectorAll(".filter-chip").forEach(el => el.classList.remove("active"));
    btn.classList.add("active");
  }
  renderAdminActivityFeed();
}

function simulateUserInteraction() {
  const simulations = [
    { type: "ORDER", action: "CHECKOUT", actor: "Rahul Sharma", desc: "Added 2 units of 'Classmate Pulse Notebook' to hostel express cart", details: "Cart Total: ₹760.00", severity: "info" },
    { type: "USER", action: "PROFILE_UPDATED", actor: "Ananya Iyer", desc: "Updated hostel room delivery address in profile (Ganga 112)", details: "Hostel Zone IITM", severity: "info" },
    { type: "ORDER", action: "ORDER_PLACED", actor: "Aditya Verma", desc: "Placed new express order ORD-2026-1005 for ₹1,299.00 via UPI", details: "ORD-2026-1005", severity: "success" },
    { type: "PRODUCT", action: "STOCK_DEDUCTED", actor: "System Daemon", desc: "Inventory allocated for Order ORD-2026-1005 (-1 boAt Headphones)", details: "Product #5", severity: "info" },
    { type: "INVENTORY", action: "DAEMON_SWEEP", actor: "InventoryDaemon", desc: "Background thread verified 59 catalog items; all inventory checksums intact", details: "30s Cycle #42", severity: "info" },
    { type: "PRODUCT", action: "STOCK_REPLENISHED", actor: "Campus Style Studio", desc: "Restocked 20 units of 'Meridian Oversized Wool Coat'", details: "Product #17", severity: "success" },
    { type: "USER", action: "SESSION_AUTH", actor: "Vikram Sen", desc: "New student authenticated via campus single sign-on", details: "vikram.s@guvi.in", severity: "info" },
    { type: "ORDER", action: "STATUS_UPDATED", actor: "System Administrator", desc: "Order ORD-2026-1002 marked as SHIPPED with express courier tracking", details: "ORD-2026-1002", severity: "info" }
  ];
  const sim = simulations[Math.floor(Math.random() * simulations.length)];
  logClientActivity(sim.type, sim.action, sim.actor, sim.desc, sim.details, sim.severity);
  showToast(`Simulated Event: ${sim.desc}`, "success");
}

function clearActivityFeed() {
  saveStoredActivities([]);
  if (window.location.protocol.startsWith("http")) {
    fetch("/api/admin/activities", {
      method: "DELETE",
      headers: { "X-User-Role": "ADMIN" }
    }).catch(() => {});
  }
  logClientActivity("SYSTEM", "LOGS_CLEARED", "System Administrator", "Activity audit log was cleared by administrator", "System Audit", "info");
  renderAdminActivityFeed();
  showToast("Activity stream cleared.", "info");
}

function switchAdminSubTab(tabName) {
  const tabs = ["activity", "products", "orders", "users", "all"];
  const panelMap = {
    activity: "adminActivityPanel",
    products: "adminProductsPanel",
    orders: "adminOrdersPanel",
    users: "adminUsersPanel"
  };

  const btnMap = {
    activity: "btnAdminTabActivity",
    products: "btnAdminTabProducts",
    orders: "btnAdminTabOrders",
    users: "btnAdminTabUsers",
    all: "btnAdminTabAll"
  };

  tabs.forEach(t => {
    const btn = document.getElementById(btnMap[t]);
    if (btn) {
      if (t === tabName) btn.classList.add("active");
      else btn.classList.remove("active");
    }
  });

  Object.keys(panelMap).forEach(key => {
    const panel = document.getElementById(panelMap[key]);
    if (panel) {
      if (tabName === "all" || tabName === key) {
        panel.style.display = "block";
      } else {
        panel.style.display = "none";
      }
    }
  });
}

function getCategoryNameById(catId) {
  switch (Number(catId)) {
    case 1: return "Computer Peripherals";
    case 2: return "Audio & Wearables";
    case 3: return "CS & Engineering Books";
    case 4: return "Lab & DIY Hardware";
    case 5: return "Campus & Stationery";
    case 6: return "Casual Wear";
    case 7: return "Formal & Evening";
    case 8: return "Outerwear & Coats";
    default: return "Fashion & Apparel";
  }
}

/* ==============================================================
   ADMIN PRODUCT MANAGEMENT
   ============================================================== */
function renderAdminProductManagement() {
  const allProducts = getStoredProducts();
  const searchInput = document.getElementById("adminProdSearchInput");
  const catFilter = document.getElementById("adminProdCategoryFilter");
  const stockFilter = document.getElementById("adminProdStockFilter");
  const sortSelect = document.getElementById("adminProdSortSelect");

  const query = searchInput ? searchInput.value.trim().toLowerCase() : "";
  const catId = catFilter ? parseInt(catFilter.value, 10) : 0;
  const stockChoice = stockFilter ? stockFilter.value : "ALL";
  const sortBy = sortSelect ? sortSelect.value : "id_asc";

  let filtered = allProducts.filter(p => {
    if (p.deleted === true) return false;

    if (query) {
      const matchName = (p.name || "").toLowerCase().includes(query);
      const matchSpecs = (p.shortSpecs || "").toLowerCase().includes(query);
      const matchSeller = (p.sellerName || "").toLowerCase().includes(query);
      const matchId = String(p.productId) === query || ("#" + p.productId) === query;
      if (!matchName && !matchSpecs && !matchSeller && !matchId) return false;
    }

    if (catId > 0 && p.categoryId !== catId) return false;

    const stock = Number(p.stockQuantity) || 0;
    if (stockChoice === "IN_STOCK" && stock <= 15) return false;
    if (stockChoice === "LOW_STOCK" && (stock <= 0 || stock > 15)) return false;
    if (stockChoice === "OUT_OF_STOCK" && stock > 0) return false;

    return true;
  });

  filtered.sort((a, b) => {
    if (sortBy === "id_desc") return (b.productId || 0) - (a.productId || 0);
    if (sortBy === "price_asc") return (a.price || 0) - (b.price || 0);
    if (sortBy === "price_desc") return (b.price || 0) - (a.price || 0);
    if (sortBy === "stock_asc") return (a.stockQuantity || 0) - (b.stockQuantity || 0);
    if (sortBy === "stock_desc") return (b.stockQuantity || 0) - (a.stockQuantity || 0);
    if (sortBy === "rating_desc") return (b.rating || 0) - (a.rating || 0);
    return (a.productId || 0) - (b.productId || 0);
  });

  const countBadge = document.getElementById("adminProductCountBadge");
  if (countBadge) countBadge.textContent = `${filtered.length} Products`;

  const tbody = document.getElementById("adminProductsTbody");
  if (!tbody) return;

  if (filtered.length === 0) {
    tbody.innerHTML = `<tr><td colspan="9" style="text-align:center; padding:32px; color:var(--text-muted);">No products match your filter criteria.</td></tr>`;
    return;
  }

  tbody.innerHTML = filtered.map(p => {
    const stockVal = Math.max(0, Number(p.stockQuantity) || 0);
    const isOut = stockVal <= 0;
    const isLow = stockVal > 0 && stockVal <= 15;
    const valClass = isOut ? 'out' : (isLow ? 'low' : '');
    const isActive = (p.active !== false);
    const imgFile = p.imageUrl || "mouse.jpg";
    const imgSource = (!imgFile.startsWith("http") && !imgFile.startsWith("/") && !imgFile.startsWith("assets/"))
      ? `assets/images/${imgFile}` : imgFile;

    return `
      <tr>
        <td style="font-family:var(--font-mono); font-weight:700;">#${p.productId}</td>
        <td>
          <div style="display:flex; align-items:center; gap:12px;">
            <img src="${imgSource}" alt="${escapeHtml(p.name)}" class="prod-table-thumb" onerror="this.src='assets/images/mouse.jpg'">
            <div>
              <strong style="color:var(--text-heading); font-size:14px;">${escapeHtml(p.name)}</strong>
              <div style="font-size:12px; color:var(--text-muted); max-width:280px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;" title="${escapeHtml(p.shortSpecs || '')}">${escapeHtml(p.shortSpecs || '')}</div>
            </div>
          </div>
        </td>
        <td><span class="activity-chip">${escapeHtml(p.categoryName || getCategoryNameById(p.categoryId))}</span></td>
        <td style="font-size:13px; color:var(--text-muted);">${escapeHtml(p.sellerName || 'Platform Store')}</td>
        <td>
          <div>
            <strong style="color:var(--text-heading);">₹${Number(p.price).toLocaleString('en-IN')}</strong>
            ${p.mrp > p.price ? `<div style="font-size:11px; color:var(--text-light); text-decoration:line-through;">₹${Number(p.mrp).toLocaleString('en-IN')}</div>` : ''}
          </div>
        </td>
        <td>
          <div class="stock-stepper-box">
            <button type="button" class="btn-stock-step" onclick="adjustProductStock(${p.productId}, -1)" title="Decrease stock" ${stockVal <= 0 ? 'disabled' : ''}>&minus;</button>
            <span class="stock-step-val ${valClass}" id="adminStockDisplay_${p.productId}">${stockVal}</span>
            <button type="button" class="btn-stock-step" onclick="adjustProductStock(${p.productId}, 1)" title="Increase stock">&plus;</button>
          </div>
        </td>
        <td><span style="color:var(--star-amber-dark); font-weight:700;">★ ${Number(p.rating || 4.5).toFixed(1)}</span></td>
        <td>
          <span class="badge-status ${isActive ? (isOut ? 'badge-cancelled' : 'badge-active') : 'badge-suspended'}">
            ${!isActive ? 'Inactive' : (isOut ? 'Out of Stock' : 'Active')}
          </span>
        </td>
        <td style="text-align:right;">
          <div style="display:inline-flex; align-items:center; gap:6px;">
            <button type="button" class="btn-action-edit" onclick="openEditProductModal(${p.productId})" title="Edit product specifications">Edit</button>
            <button type="button" class="btn-view-all" style="padding:4px 8px; font-size:11px;" onclick="promptStockUpdate(${p.productId})" title="Set stock value">Set Qty</button>
            <button type="button" class="btn-action-delete" onclick="confirmDeleteProduct(${p.productId})" title="Remove product from catalog">&times; Remove</button>
          </div>
        </td>
      </tr>
    `;
  }).join("");
}

function onAdminProductFilterChange() {
  renderAdminProductManagement();
}

function openEditProductModal(productId) {
  const products = getStoredProducts();
  const p = products.find(prod => Number(prod.productId) === Number(productId));
  if (!p) {
    showToast(`Product #${productId} not found.`, "error");
    return;
  }

  const modal = document.getElementById("editProductModal");
  if (!modal) return;

  clearEditProductErrors();

  document.getElementById("editProdId").value = p.productId;
  document.getElementById("editProdName").value = p.name || "";
  document.getElementById("editProdCategory").value = p.categoryId || "1";
  document.getElementById("editProdBrand").value = p.sellerName || "";
  document.getElementById("editProdSpecs").value = p.shortSpecs || "";
  document.getElementById("editProdDesc").value = p.description || "";
  document.getElementById("editProdPrice").value = p.price || "";
  document.getElementById("editProdMrp").value = p.mrp || p.price || "";
  document.getElementById("editProdStock").value = (typeof p.stockQuantity !== "undefined") ? p.stockQuantity : 0;
  document.getElementById("editProdStatus").value = (p.active !== false) ? "ACTIVE" : "INACTIVE";

  const imgSelect = document.getElementById("editProdImageSelect");
  const customInput = document.getElementById("editProdCustomImageUrl");
  const knownImages = [
    "mouse.jpg", "keyboard.jpg", "pendrive.jpg", "usbhub.jpg", "headphones.jpg",
    "earphones.jpg", "book_clrs.jpg", "book_os.jpg", "book_db.jpg", "raspberrypi.jpg",
    "arduino.jpg", "calculator.jpg", "tshirt_casual.jpg", "denim_jeans.jpg", "wool_coat.jpg"
  ];

  if (p.imageUrl && knownImages.includes(p.imageUrl)) {
    if (imgSelect) imgSelect.value = p.imageUrl;
    if (customInput) {
      customInput.style.display = "none";
      customInput.value = "";
    }
  } else {
    if (imgSelect) imgSelect.value = "custom";
    if (customInput) {
      customInput.style.display = "block";
      customInput.value = p.imageUrl || "";
    }
  }

  updateEditProductImgPreview();
  calcEditProductDiscount();

  modal.classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeEditProductModal() {
  if (isSavingEditProduct) return;
  const modal = document.getElementById("editProductModal");
  if (modal) modal.classList.remove("open");
  document.body.style.overflow = "";
  clearEditProductErrors();
}

function clearEditProductErrors() {
  const alert = document.getElementById("editProductErrorAlert");
  if (alert) {
    alert.style.display = "none";
    alert.textContent = "";
  }
  document.querySelectorAll("#editProductForm .field-error-msg").forEach(el => el.textContent = "");
  document.querySelectorAll("#editProductForm .form-field-input, #editProductForm .form-field-select").forEach(el => el.style.borderColor = "");
}

function onEditProductImageChange() {
  const select = document.getElementById("editProdImageSelect");
  const customUrl = document.getElementById("editProdCustomImageUrl");
  if (!select) return;

  if (select.value === "custom") {
    if (customUrl) {
      customUrl.style.display = "block";
      customUrl.focus();
    }
  } else {
    if (customUrl) customUrl.style.display = "none";
  }
  updateEditProductImgPreview();
}

function updateEditProductImgPreview() {
  const select = document.getElementById("editProdImageSelect");
  const customUrl = document.getElementById("editProdCustomImageUrl");
  const previewImg = document.getElementById("editProductImgPreview");
  if (!previewImg) return;

  let imgSource = "mouse.jpg";
  if (select && select.value === "custom") {
    imgSource = (customUrl && customUrl.value.trim()) ? customUrl.value.trim() : "mouse.jpg";
  } else if (select && select.value) {
    imgSource = select.value;
  }

  if (!imgSource.startsWith("http://") && !imgSource.startsWith("https://") && !imgSource.startsWith("/") && !imgSource.startsWith("assets/")) {
    previewImg.src = `assets/images/${imgSource}`;
  } else {
    previewImg.src = imgSource;
  }
}

function calcEditProductDiscount() {
  const priceInput = document.getElementById("editProdPrice");
  const mrpInput = document.getElementById("editProdMrp");
  const badge = document.getElementById("editBadgeDiscountCalc");
  const text = document.getElementById("editTextDiscountCalc");
  if (!priceInput || !mrpInput || !badge || !text) return;

  const price = parseFloat(priceInput.value);
  const mrp = parseFloat(mrpInput.value);

  if (!isNaN(price) && !isNaN(mrp) && mrp > 0 && price > 0) {
    if (mrp >= price) {
      const discount = Math.round(((mrp - price) / mrp) * 100);
      badge.style.display = "inline-block";
      badge.textContent = `-${discount}% OFF`;
      text.textContent = `Saves ₹${(mrp - price).toLocaleString('en-IN')} off MRP`;
      text.style.color = "var(--status-success)";
    } else {
      badge.style.display = "none";
      text.textContent = "Warning: Selling price exceeds MRP!";
      text.style.color = "var(--status-error)";
    }
  } else {
    badge.style.display = "none";
    text.textContent = "Enter price & MRP to see discount percentage";
    text.style.color = "var(--text-muted)";
  }
}

function adjustEditModalStock(delta) {
  const stockInput = document.getElementById("editProdStock");
  if (!stockInput) return;
  const current = parseInt(stockInput.value, 10) || 0;
  stockInput.value = Math.max(0, current + delta);
}

async function submitEditProduct(event) {
  if (event) event.preventDefault();
  clearEditProductErrors();

  const idEl = document.getElementById("editProdId");
  const nameEl = document.getElementById("editProdName");
  const catEl = document.getElementById("editProdCategory");
  const brandEl = document.getElementById("editProdBrand");
  const specsEl = document.getElementById("editProdSpecs");
  const descEl = document.getElementById("editProdDesc");
  const priceEl = document.getElementById("editProdPrice");
  const mrpEl = document.getElementById("editProdMrp");
  const stockEl = document.getElementById("editProdStock");
  const statusEl = document.getElementById("editProdStatus");
  const imgSelect = document.getElementById("editProdImageSelect");
  const customImgEl = document.getElementById("editProdCustomImageUrl");

  const prodId = idEl ? parseInt(idEl.value, 10) : 0;
  const name = nameEl ? nameEl.value.trim() : "";
  const catId = catEl ? parseInt(catEl.value, 10) : 1;
  const brand = brandEl ? brandEl.value.trim() : "";
  const specs = specsEl ? specsEl.value.trim() : "";
  const desc = descEl ? descEl.value.trim() : "";
  const price = priceEl ? parseFloat(priceEl.value) : NaN;
  const mrp = mrpEl ? parseFloat(mrpEl.value) : NaN;
  const stock = stockEl ? parseInt(stockEl.value, 10) : NaN;
  const status = statusEl ? statusEl.value : "ACTIVE";

  let imageUrl = "mouse.jpg";
  if (imgSelect && imgSelect.value === "custom") {
    imageUrl = customImgEl ? customImgEl.value.trim() : "";
  } else if (imgSelect) {
    imageUrl = imgSelect.value;
  }

  let hasErrors = false;
  function markError(el, errId, msg) {
    hasErrors = true;
    if (el) el.style.borderColor = "var(--status-error)";
    const err = document.getElementById(errId);
    if (err) err.textContent = msg;
  }

  if (!name || name.length < 3) markError(nameEl, "errEditProdName", "Product name must be at least 3 characters.");
  if (isNaN(price) || price <= 0) markError(priceEl, "errEditProdPrice", "Selling price must be greater than 0.");
  if (isNaN(mrp) || mrp <= 0) markError(mrpEl, "errEditProdMrp", "Original Price / MRP must be greater than 0.");
  else if (!isNaN(price) && mrp < price) markError(mrpEl, "errEditProdMrp", "MRP cannot be less than selling price.");
  if (isNaN(stock) || stock < 0) markError(stockEl, "errEditProdStock", "Stock quantity cannot be negative.");

  if (hasErrors) {
    const alert = document.getElementById("editProductErrorAlert");
    if (alert) {
      alert.style.display = "block";
      alert.textContent = "Please correct the highlighted fields before saving.";
    }
    return;
  }

  isSavingEditProduct = true;
  const saveBtn = document.getElementById("btnSaveEditProduct");
  const quickBtn = document.getElementById("btnQuickSaveEditProduct");
  const spinner = document.getElementById("btnSaveEditProductSpinner");
  const btnText = document.getElementById("btnSaveEditProductText");

  if (saveBtn) saveBtn.disabled = true;
  if (quickBtn) quickBtn.disabled = true;
  if (spinner) spinner.style.display = "inline-block";
  if (btnText) btnText.textContent = "Saving...";

  const payload = {
    name: name,
    price: price,
    mrp: mrp,
    stockQuantity: stock,
    categoryId: catId,
    description: desc,
    shortSpecs: specs || `${name} • Premium Quality`,
    imageUrl: imageUrl,
    active: (status === "ACTIVE")
  };

  try {
    if (window.location.protocol.startsWith("http")) {
      await fetch(`/api/products/${prodId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "X-User-Role": "ADMIN"
        },
        body: JSON.stringify(payload)
      });
    }

    const allProducts = getStoredProducts();
    const prod = allProducts.find(p => Number(p.productId) === Number(prodId));
    if (prod) {
      prod.name = name;
      prod.price = price;
      prod.mrp = mrp;
      prod.stockQuantity = stock;
      prod.categoryId = catId;
      prod.categoryName = getCategoryNameById(catId);
      if (brand) prod.sellerName = brand;
      prod.description = desc;
      prod.shortSpecs = specs || `${name} • Premium Quality`;
      prod.imageUrl = imageUrl;
      prod.active = (status === "ACTIVE");
      saveStoredProducts(allProducts);
    }

    logClientActivity("PRODUCT", "PRODUCT_UPDATED", "System Administrator", `Updated product #${prodId} "${name}" (Price: ₹${price}, Stock: ${stock})`, `Product #${prodId}`, "info");

    isSavingEditProduct = false;
    if (saveBtn) saveBtn.disabled = false;
    if (quickBtn) quickBtn.disabled = false;
    if (spinner) spinner.style.display = "none";
    if (btnText) btnText.textContent = "Save Changes";

    closeEditProductModal();
    showToast(`Product #${prodId} updated successfully.`, "success");

    renderAdminProductManagement();
    if (typeof renderSellerDashboard === "function") renderSellerDashboard();
    if (typeof loadAndRenderProducts === "function") loadAndRenderProducts();

  } catch (err) {
    isSavingEditProduct = false;
    if (saveBtn) saveBtn.disabled = false;
    if (quickBtn) quickBtn.disabled = false;
    if (spinner) spinner.style.display = "none";
    if (btnText) btnText.textContent = "Save Changes";

    const alert = document.getElementById("editProductErrorAlert");
    if (alert) {
      alert.style.display = "block";
      alert.textContent = err.message || "Failed to update product.";
    }
  }
}

function confirmDeleteProduct(productId) {
  const products = getStoredProducts();
  const p = products.find(prod => Number(prod.productId) === Number(productId));
  if (!p) return;

  pendingDeleteProductId = productId;
  const nameSpan = document.getElementById("deleteProdTargetName");
  const idSpan = document.getElementById("deleteProdTargetId");
  if (nameSpan) nameSpan.textContent = p.name;
  if (idSpan) idSpan.textContent = `#${p.productId}`;

  const modal = document.getElementById("deleteProductModal");
  if (modal) modal.classList.add("open");
}

function closeDeleteProductModal() {
  pendingDeleteProductId = null;
  const modal = document.getElementById("deleteProductModal");
  if (modal) modal.classList.remove("open");
}

async function executeDeleteProduct() {
  if (!pendingDeleteProductId) return;
  const prodId = pendingDeleteProductId;

  const allProducts = getStoredProducts();
  const p = allProducts.find(prod => Number(prod.productId) === Number(prodId));
  const pName = p ? p.name : `#${prodId}`;

  try {
    if (window.location.protocol.startsWith("http")) {
      await fetch(`/api/products/${prodId}`, {
        method: "DELETE",
        headers: { "X-User-Role": "ADMIN" }
      });
    }

    const idx = allProducts.findIndex(prod => Number(prod.productId) === Number(prodId));
    if (idx >= 0) {
      allProducts[idx].active = false;
      allProducts[idx].deleted = true;
      saveStoredProducts(allProducts);
    }

    logClientActivity("PRODUCT", "PRODUCT_REMOVED", "System Administrator", `Removed product #${prodId} "${pName}" from catalog`, `Product #${prodId}`, "danger");

    closeDeleteProductModal();
    showToast(`Product #${prodId} "${pName}" removed from catalog.`, "success");

    renderAdminProductManagement();
    if (typeof renderSellerDashboard === "function") renderSellerDashboard();
    if (typeof loadAndRenderProducts === "function") loadAndRenderProducts();

  } catch (err) {
    showToast(`Error deleting product: ${err.message}`, "error");
    closeDeleteProductModal();
  }
}

/* ==============================================================
   ADMIN ORDER MANAGEMENT & FULFILLMENT
   ============================================================== */
function renderAdminOrderManagement() {
  const allOrders = getStoredOrders();
  const searchInput = document.getElementById("adminOrderSearchInput");
  const statusFilter = document.getElementById("adminOrderStatusFilter");
  const paymentFilter = document.getElementById("adminOrderPaymentFilter");

  const query = searchInput ? searchInput.value.trim().toLowerCase() : "";
  const statusChoice = statusFilter ? statusFilter.value : "ALL";
  const paymentChoice = paymentFilter ? paymentFilter.value : "ALL";

  let filtered = allOrders.filter(o => {
    if (query) {
      const matchNum = (o.orderNumber || "").toLowerCase().includes(query);
      const matchName = (o.shippingName || o.buyerName || "").toLowerCase().includes(query);
      const matchAddr = (o.shippingAddress || "").toLowerCase().includes(query);
      const matchPhone = (o.shippingPhone || "").includes(query);
      if (!matchNum && !matchName && !matchAddr && !matchPhone) return false;
    }

    if (statusChoice !== "ALL" && o.orderStatus !== statusChoice) return false;
    if (paymentChoice !== "ALL" && o.paymentMethod !== paymentChoice) return false;

    return true;
  });

  const totalRev = filtered.reduce((sum, o) => {
    return o.orderStatus !== "CANCELLED" ? sum + (Number(o.finalAmount) || 0) : sum;
  }, 0);

  const summaryBadge = document.getElementById("adminOrdersSummaryBadge");
  if (summaryBadge) summaryBadge.textContent = `${filtered.length} Orders`;

  const revBadge = document.getElementById("adminOrderRevenueBadge");
  if (revBadge) revBadge.textContent = `₹${totalRev.toLocaleString('en-IN')} Active Volume`;

  const tbody = document.getElementById("adminOrdersTbody");
  if (!tbody) return;

  if (filtered.length === 0) {
    tbody.innerHTML = `<tr><td colspan="8" style="text-align:center; padding:32px; color:var(--text-muted);">No orders match your filter criteria.</td></tr>`;
    return;
  }

  tbody.innerHTML = filtered.map(o => {
    const itemsSummary = (o.items || []).map(it => `${escapeHtml(it.productName)} (x${it.quantity})`).join(", ") || "Order Package";
    const dateStr = (o.createdAt || "").substring(0, 16);
    const status = o.orderStatus || "CONFIRMED";

    return `
      <tr>
        <td style="font-family:var(--font-mono); font-weight:700;">
          <a href="javascript:void(0)" onclick="openOrderDetailsModal('${o.orderNumber}')" style="color:var(--btn-cart-blue); text-decoration:underline;">
            ${escapeHtml(o.orderNumber)}
          </a>
        </td>
        <td style="font-size:12px; color:var(--text-muted);">${escapeHtml(dateStr)}</td>
        <td>
          <strong style="color:var(--text-heading); font-size:13px;">${escapeHtml(o.shippingName || o.buyerName || 'Buyer')}</strong>
          <div style="font-size:11px; color:var(--text-light);">${escapeHtml(o.shippingPhone || '')}</div>
        </td>
        <td style="font-size:12px; max-width:200px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;" title="${escapeHtml(o.shippingAddress || '')}">
          ${escapeHtml(o.shippingAddress || 'Hostel Campus')}
        </td>
        <td style="font-size:12px; max-width:180px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;" title="${escapeHtml(itemsSummary)}">
          <span class="activity-chip">${(o.items || []).length} items</span> ${escapeHtml(itemsSummary)}
        </td>
        <td>
          <strong>₹${Number(o.finalAmount || 0).toLocaleString('en-IN')}</strong>
          <div style="font-size:11px; color:var(--text-muted);">${escapeHtml(o.paymentMethod || 'COD')}</div>
        </td>
        <td>
          <span class="badge-status badge-${status.toLowerCase()}">${escapeHtml(status)}</span>
        </td>
        <td style="text-align:right;">
          <div style="display:inline-flex; align-items:center; gap:6px;">
            <select class="order-status-select" onchange="updateOrderStatusAction('${o.orderNumber}', this.value)" title="Change order status">
              <option value="CONFIRMED" ${status === 'CONFIRMED' ? 'selected' : ''}>CONFIRMED</option>
              <option value="SHIPPED" ${status === 'SHIPPED' ? 'selected' : ''}>SHIPPED</option>
              <option value="OUT_FOR_DELIVERY" ${status === 'OUT_FOR_DELIVERY' ? 'selected' : ''}>OUT_FOR_DELIVERY</option>
              <option value="DELIVERED" ${status === 'DELIVERED' ? 'selected' : ''}>DELIVERED</option>
              <option value="CANCELLED" ${status === 'CANCELLED' ? 'selected' : ''}>CANCELLED</option>
            </select>
            ${status !== 'DELIVERED' && status !== 'CANCELLED' ? `
              <button type="button" class="btn-action-fulfill" onclick="advanceOrderStatusAdmin('${o.orderNumber}')" title="Advance to next fulfillment stage">
                ${status === 'CONFIRMED' || status === 'PLACED' ? 'Ship' : (status === 'SHIPPED' ? 'Dispatch' : 'Deliver')}
              </button>
            ` : ''}
            <button type="button" class="btn-view-all" style="padding:4px 8px; font-size:11px;" onclick="openOrderDetailsModal('${o.orderNumber}')" title="View invoice breakdown">Details</button>
            <button type="button" class="btn-view-all" style="padding:4px 8px; font-size:11px;" onclick="openRouteModal('${o.orderNumber}')" title="Delivery route">Route</button>
          </div>
        </td>
      </tr>
    `;
  }).join("");
}

function onAdminOrderFilterChange() {
  renderAdminOrderManagement();
}

function advanceOrderStatusAdmin(orderNum) {
  const orders = getStoredOrders();
  const o = orders.find(ord => ord.orderNumber === orderNum);
  if (!o) return;

  let nextStatus = "SHIPPED";
  if (o.orderStatus === "CONFIRMED" || o.orderStatus === "PLACED") nextStatus = "SHIPPED";
  else if (o.orderStatus === "SHIPPED") nextStatus = "OUT_FOR_DELIVERY";
  else if (o.orderStatus === "OUT_FOR_DELIVERY") nextStatus = "DELIVERED";

  updateOrderStatusAction(orderNum, nextStatus);
}

function openOrderDetailsModal(orderNum) {
  const orders = getStoredOrders();
  const o = orders.find(ord => ord.orderNumber === orderNum);
  if (!o) {
    showToast(`Order #${orderNum} not found.`, "error");
    return;
  }
  currentDetailOrder = o;

  const modal = document.getElementById("orderDetailsModal");
  if (!modal) return;

  const title = document.getElementById("orderDetailsModalTitle");
  if (title) title.textContent = `Order #${o.orderNumber}`;

  const badge = document.getElementById("orderModalStatusBadge");
  if (badge) {
    badge.className = `badge-status badge-${(o.orderStatus || 'confirmed').toLowerCase()}`;
    badge.textContent = o.orderStatus || "CONFIRMED";
  }

  const dateText = document.getElementById("orderModalDateText");
  if (dateText) dateText.textContent = `Placed on: ${o.createdAt || '2026-10-08 14:00'}`;

  const buyer = document.getElementById("orderModalBuyerName");
  if (buyer) buyer.textContent = o.shippingName || o.buyerName || "Rahul Sharma";

  const phone = document.getElementById("orderModalBuyerPhone");
  if (phone) phone.textContent = `Phone: +91 ${o.shippingPhone || '98765 43220'}`;

  const pay = document.getElementById("orderModalPaymentInfo");
  if (pay) pay.textContent = `Payment: ${o.paymentMethod || 'UPI'} (${o.paymentStatus || 'COMPLETED'})`;

  const addr = document.getElementById("orderModalAddress");
  if (addr) addr.textContent = o.shippingAddress || "Hostel Zone, IITM Campus";

  const pin = document.getElementById("orderModalPincode");
  if (pin) pin.textContent = `Pincode: ${o.shippingPincode || '600113'} • Express Campus Dispatch`;

  const select = document.getElementById("orderModalStatusSelect");
  if (select) select.value = o.orderStatus || "CONFIRMED";

  const tbody = document.getElementById("orderModalItemsTbody");
  if (tbody) {
    const items = o.items || [];
    tbody.innerHTML = items.map(it => `
      <tr>
        <td><strong>${escapeHtml(it.productName || 'Product')}</strong></td>
        <td>₹${Number(it.unitPrice || 0).toLocaleString('en-IN')}</td>
        <td>${it.quantity}</td>
        <td style="text-align:right; font-weight:700;">₹${Number(it.lineTotal || (it.unitPrice * it.quantity)).toLocaleString('en-IN')}</td>
      </tr>
    `).join("");
  }

  const sub = document.getElementById("orderModalSubtotal");
  if (sub) sub.textContent = `₹${Number(o.totalAmount || o.finalAmount || 0).toLocaleString('en-IN')}`;

  const disc = document.getElementById("orderModalDiscount");
  if (disc) disc.textContent = `₹${Number(o.discountAmount || 0).toLocaleString('en-IN')}`;

  const tax = document.getElementById("orderModalTax");
  if (tax) tax.textContent = `₹${Number(o.taxAmount || 0).toLocaleString('en-IN')}`;

  const fin = document.getElementById("orderModalFinalTotal");
  if (fin) fin.textContent = `₹${Number(o.finalAmount || 0).toLocaleString('en-IN')}`;

  modal.classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeOrderDetailsModal() {
  currentDetailOrder = null;
  const modal = document.getElementById("orderDetailsModal");
  if (modal) modal.classList.remove("open");
  document.body.style.overflow = "";
}

function saveOrderModalStatusChange() {
  if (!currentDetailOrder) return;
  const select = document.getElementById("orderModalStatusSelect");
  if (!select) return;
  const newStatus = select.value;
  updateOrderStatusAction(currentDetailOrder.orderNumber, newStatus);

  const badge = document.getElementById("orderModalStatusBadge");
  if (badge) {
    badge.className = `badge-status badge-${newStatus.toLowerCase()}`;
    badge.textContent = newStatus;
  }
}

function trackOrderFromModal() {
  if (!currentDetailOrder) return;
  const num = currentDetailOrder.orderNumber;
  closeOrderDetailsModal();
  openRouteModal(num);
}

/* ==============================================================
   ADMIN CONSOLE ROOT RENDERER
   ============================================================== */
function renderAdminDashboard() {
  const users = getStoredUsers();
  const products = getStoredProducts().filter(p => p.active !== false && p.deleted !== true);
  const orders = getStoredOrders();
  const metricsGrid = document.getElementById("metricsGrid");

  const grossSales = orders.reduce((sum, o) => {
    return o.orderStatus !== "CANCELLED" ? sum + (Number(o.finalAmount) || 0) : sum;
  }, 0);

  if (metricsGrid) {
    metricsGrid.innerHTML = `
      <div class="metric-stat-box">
        <div class="metric-stat-label">Total Users</div>
        <div class="metric-stat-value">${users.length}</div>
        <div class="metric-stat-sub">Registered accounts</div>
      </div>
      <div class="metric-stat-box">
        <div class="metric-stat-label">Master Products</div>
        <div class="metric-stat-value">${products.length}</div>
        <div class="metric-stat-sub">Active catalog merchandise</div>
      </div>
      <div class="metric-stat-box">
        <div class="metric-stat-label">Orders Placed</div>
        <div class="metric-stat-value">${orders.length}</div>
        <div class="metric-stat-sub">ACID transactions recorded</div>
      </div>
      <div class="metric-stat-box">
        <div class="metric-stat-label">Platform Volume</div>
        <div class="metric-stat-value">₹${grossSales.toLocaleString('en-IN')}</div>
        <div class="metric-stat-sub">Gross campus sales volume</div>
      </div>
    `;
  }

  // 1. Render Activity Monitoring Feed
  renderAdminActivityFeed();
  startActivityPoller();

  // 2. Render Product Management Table
  renderAdminProductManagement();

  // 3. Render Order Management Table
  renderAdminOrderManagement();

  // 4. Render User Moderation Table
  const userCountBadge = document.getElementById("adminUserCountBadge");
  if (userCountBadge) userCountBadge.textContent = `${users.length} Accounts`;

  const usersTbody = document.getElementById("adminUsersTbody");
  if (usersTbody) {
    usersTbody.innerHTML = users.map(u => `
      <tr>
        <td style="font-family:var(--font-mono); font-weight:700;">#${u.userId}</td>
        <td><strong>${escapeHtml(u.fullName)}</strong></td>
        <td>${escapeHtml(u.email)}</td>
        <td>${escapeHtml(u.phone)}</td>
        <td><span class="badge-status" style="background:#f0f0f0;">${u.role}</span></td>
        <td><span class="badge-status ${u.status === 'ACTIVE' ? 'badge-active' : 'badge-suspended'}">${u.status}</span></td>
        <td style="text-align:right;">
          <div style="display:inline-flex; gap:6px;">
            <button type="button" class="btn-view-all" style="padding:4px 10px; font-size:11px;" onclick="toggleUserStatus(${u.userId})">
              ${u.status === 'ACTIVE' ? 'Suspend' : 'Activate'}
            </button>
            <button type="button" class="btn-view-all" style="padding:4px 10px; font-size:11px;" onclick="promoteUserRole(${u.userId})">
              ${u.role === 'ADMIN' ? 'Set Buyer' : 'Make Admin'}
            </button>
          </div>
        </td>
      </tr>
    `).join("");
  }
}

function startActivityPoller() {
  if (activityPollerTimer) clearInterval(activityPollerTimer);
  activityPollerTimer = setInterval(() => {
    if (getCurrentRole() === "ADMIN" && isLiveStreamActive) {
      renderAdminActivityFeed();
    }
  }, 4000);
}

function stopActivityPoller() {
  if (activityPollerTimer) {
    clearInterval(activityPollerTimer);
    activityPollerTimer = null;
  }
}

function updateOrderStatusAction(orderNum, newStatus) {
  let orders = getStoredOrders();
  const order = orders.find(o => o.orderNumber === orderNum);
  if (!order) return;

  order.orderStatus = newStatus;
  saveStoredOrders(orders);

  if (window.location.protocol.startsWith("http")) {
    fetch(`/api/orders/${encodeURIComponent(orderNum)}/status`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus })
    }).catch(() => {});
  }

  logClientActivity("ORDER", "STATUS_UPDATED", "System Administrator", `Order ${orderNum} status changed to ${newStatus}`, `Order #${orderNum}`, "info");

  showToast(`Order ${orderNum} changed to ${newStatus}`, "success");
  const currentRole = getCurrentRole();
  if (currentRole === "SELLER") renderSellerDashboard();
  else if (currentRole === "ADMIN") {
    renderAdminOrderManagement();
    renderAdminDashboard();
  }
  else renderBuyerDashboard();
}

function toggleUserStatus(userId) {
  let users = getStoredUsers();
  const u = users.find(user => user.userId === userId);
  if (!u) return;

  u.status = u.status === "ACTIVE" ? "SUSPENDED" : "ACTIVE";
  saveStoredUsers(users);

  logClientActivity("USER", "STATUS_TOGGLED", "System Administrator", `Account status for ${u.fullName} changed to ${u.status}`, `User #${userId}`, "warning");

  showToast(`User ${u.fullName} status updated to ${u.status}`, "info");
  renderAdminDashboard();
}

function promoteUserRole(userId) {
  let users = getStoredUsers();
  const u = users.find(user => user.userId === userId);
  if (!u) return;

  u.role = (u.role === "ADMIN") ? "BUYER" : "ADMIN";
  saveStoredUsers(users);

  logClientActivity("USER", "ROLE_CHANGED", "System Administrator", `User ${u.fullName} role changed to ${u.role}`, `User #${userId}`, "info");

  showToast(`User ${u.fullName} is now ${u.role}`, "success");
  renderAdminDashboard();
}

function adjustProductStock(productId, delta) {
  let products = getStoredProducts();
  const p = products.find(prod => String(prod.productId) === String(productId));
  if (!p) {
    showToast(`Product #${productId} not found.`, "error");
    return;
  }

  const oldStock = Math.max(0, Number(p.stockQuantity) || 0);
  const newStock = Math.max(0, oldStock + delta);
  if (oldStock === newStock && delta < 0) {
    showToast(`Stock for "${p.name}" is already 0.`, "warning");
    return;
  }

  // 1. Update product object in stored array
  p.stockQuantity = newStock;
  saveStoredProducts(products);

  // 2. Direct instant DOM update for Seller table
  const displaySpan = document.getElementById(`stockDisplay_${productId}`);
  if (displaySpan) {
    displaySpan.textContent = newStock;
    displaySpan.className = `stock-step-val ${newStock <= 0 ? 'out' : (newStock <= 15 ? 'low' : '')}`;
    const row = displaySpan.closest("tr");
    if (row) {
      const minusBtn = row.querySelector(".btn-stock-step");
      if (minusBtn) minusBtn.disabled = (newStock <= 0);
      const statusBadge = row.querySelector(".badge-status");
      if (statusBadge) {
        if (newStock <= 0) {
          statusBadge.className = "badge-status badge-cancelled";
          statusBadge.textContent = "Out of Stock";
        } else {
          statusBadge.className = "badge-status badge-active";
          statusBadge.textContent = "Active";
        }
      }
    }
  }

  // 2b. Direct instant DOM update for Admin table
  const adminDisplaySpan = document.getElementById(`adminStockDisplay_${productId}`);
  if (adminDisplaySpan) {
    adminDisplaySpan.textContent = newStock;
    adminDisplaySpan.className = `stock-step-val ${newStock <= 0 ? 'out' : (newStock <= 15 ? 'low' : '')}`;
    const adminRow = adminDisplaySpan.closest("tr");
    if (adminRow) {
      const adminMinus = adminRow.querySelector(".btn-stock-step");
      if (adminMinus) adminMinus.disabled = (newStock <= 0);
      const adminBadge = adminRow.querySelector(".badge-status");
      if (adminBadge) {
        if (newStock <= 0) {
          adminBadge.className = "badge-status badge-cancelled";
          adminBadge.textContent = "Out of Stock";
        } else {
          adminBadge.className = "badge-status badge-active";
          adminBadge.textContent = "Active";
        }
      }
    }
  }

  // 3. Re-render seller dashboard summary & metrics
  if (typeof renderSellerDashboard === "function") renderSellerDashboard();
  if (typeof renderAdminProductManagement === "function" && document.getElementById("adminProductsTbody")) {
    renderAdminProductManagement();
  }

  // 4. Update storefront cards if present on page
  if (document.getElementById("productsGrid") && typeof loadAndRenderProducts === "function") {
    loadAndRenderProducts();
    if (typeof renderNewArrivals === "function") renderNewArrivals();
    if (typeof renderTopSelling === "function") renderTopSelling();
  }

  showToast(`Updated "${p.name}" stock: ${oldStock} → ${newStock}`, "success");

  // 5. Asynchronously persist to backend REST API (non-blocking)
  if (window.location.protocol.startsWith("http")) {
    fetch(`/api/products/${productId}/stock?quantity=${delta}&newStock=${newStock}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "X-User-Role": getCurrentRole() || "SELLER"
      },
      body: JSON.stringify({ quantity: delta, newStock: newStock })
    }).then(res => {
      if (!res.ok) {
        console.warn(`Server responded with ${res.status} to stock update.`);
      }
    }).catch(err => {
      console.warn("Backend stock sync unavailable, saved client-side:", err.message);
    });
  }
}

function promptStockUpdate(productId) {
  let products = getStoredProducts();
  const p = products.find(prod => String(prod.productId) === String(productId));
  if (!p) {
    showToast(`Product #${productId} not found.`, "error");
    return;
  }

  const current = Math.max(0, Number(p.stockQuantity) || 0);
  const input = prompt(
    `Update stock for "${p.name}".\nCurrent Stock: ${current}\n\nEnter a new stock quantity (e.g. 50), or change with +/- (e.g. +5 or -3):`,
    String(current)
  );
  if (input === null || input.trim() === "") return;

  const trimmed = input.trim();
  let targetStock;
  let delta;

  if (trimmed.startsWith("+") || trimmed.startsWith("-")) {
    delta = parseInt(trimmed, 10);
    if (isNaN(delta)) {
      showToast("Please enter a valid numeric change (e.g. +5 or -2).", "error");
      return;
    }
    targetStock = Math.max(0, current + delta);
  } else {
    targetStock = parseInt(trimmed, 10);
    if (isNaN(targetStock) || targetStock < 0) {
      showToast("Stock quantity must be a non-negative number.", "error");
      return;
    }
    delta = targetStock - current;
  }

  p.stockQuantity = targetStock;
  saveStoredProducts(products);

  if (typeof renderSellerDashboard === "function") renderSellerDashboard();
  if (typeof renderAdminProductManagement === "function" && document.getElementById("adminProductsTbody")) {
    renderAdminProductManagement();
  }

  if (document.getElementById("productsGrid") && typeof loadAndRenderProducts === "function") {
    loadAndRenderProducts();
    if (typeof renderNewArrivals === "function") renderNewArrivals();
    if (typeof renderTopSelling === "function") renderTopSelling();
  }

  showToast(`Stock for "${p.name}" updated to ${targetStock}`, "success");

  if (window.location.protocol.startsWith("http")) {
    fetch(`/api/products/${productId}/stock?quantity=${delta}&newStock=${targetStock}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "X-User-Role": getCurrentRole() || "SELLER"
      },
      body: JSON.stringify({ quantity: delta, newStock: targetStock })
    }).catch(err => {
      console.warn("Backend stock sync unavailable, saved client-side:", err.message);
    });
  }
}

/* ==============================================================
   SELLER PRODUCT CREATION MODAL & ACTIONS
   ============================================================== */
let isSavingProduct = false;

function openAddProductModal() {
  if (getCurrentRole() !== "SELLER" && getCurrentRole() !== "ADMIN") {
    showToast("The Add Product feature is accessible to Sellers and Administrators.", "warning");
    return;
  }
  const modal = document.getElementById("addProductModal");
  if (!modal) return;

  clearAddProductErrors();

  const form = document.getElementById("addProductForm");
  if (form) {
    const imgSelect = document.getElementById("prodImageSelect");
    if (imgSelect) imgSelect.value = "tshirt_casual.jpg";
    const customUrl = document.getElementById("prodCustomImageUrl");
    if (customUrl) {
      customUrl.style.display = "none";
      customUrl.value = "";
    }
    updateAddProductImgPreview();
    calcAddProductDiscount();
  }

  modal.classList.add("open");
  document.body.style.overflow = "hidden";

  setTimeout(() => {
    const firstInput = document.getElementById("prodName");
    if (firstInput) firstInput.focus();
  }, 100);
}

function closeAddProductModal() {
  if (isSavingProduct) {
    return;
  }
  const modal = document.getElementById("addProductModal");
  if (!modal) return;

  modal.classList.remove("open");
  document.body.style.overflow = "";
  clearAddProductErrors();

  const addBtn = document.getElementById("btnAddProduct");
  if (addBtn) addBtn.focus();
}

function clearAddProductErrors() {
  const alert = document.getElementById("addProductErrorAlert");
  if (alert) {
    alert.style.display = "none";
    alert.textContent = "";
  }
  document.querySelectorAll(".field-error-msg").forEach(el => el.textContent = "");
  document.querySelectorAll(".form-field-input, .form-field-select").forEach(el => el.style.borderColor = "");
}

function onAddProductImageChange() {
  const select = document.getElementById("prodImageSelect");
  const customUrl = document.getElementById("prodCustomImageUrl");
  if (!select) return;

  if (select.value === "custom") {
    if (customUrl) {
      customUrl.style.display = "block";
      customUrl.focus();
    }
  } else {
    if (customUrl) {
      customUrl.style.display = "none";
    }
  }
  updateAddProductImgPreview();
}

function updateAddProductImgPreview() {
  const select = document.getElementById("prodImageSelect");
  const customUrl = document.getElementById("prodCustomImageUrl");
  const previewImg = document.getElementById("addProductImgPreview");
  if (!previewImg) return;

  let imgSource = "tshirt_casual.jpg";
  if (select && select.value === "custom") {
    imgSource = customUrl && customUrl.value.trim() ? customUrl.value.trim() : "tshirt_casual.jpg";
  } else if (select && select.value) {
    imgSource = select.value;
  }

  if (!imgSource.startsWith("http://") && !imgSource.startsWith("https://") && !imgSource.startsWith("/") && !imgSource.startsWith("assets/")) {
    previewImg.src = `assets/images/${imgSource}`;
  } else {
    previewImg.src = imgSource;
  }
}

function calcAddProductDiscount() {
  const priceInput = document.getElementById("prodPrice");
  const mrpInput = document.getElementById("prodMrp");
  const badge = document.getElementById("badgeDiscountCalc");
  const text = document.getElementById("textDiscountCalc");
  if (!priceInput || !mrpInput || !badge || !text) return;

  const price = parseFloat(priceInput.value);
  const mrp = parseFloat(mrpInput.value);

  if (!isNaN(price) && !isNaN(mrp) && mrp > 0 && price > 0) {
    if (mrp >= price) {
      const discount = Math.round(((mrp - price) / mrp) * 100);
      badge.style.display = "inline-block";
      badge.textContent = `-${discount}% OFF`;
      text.textContent = `Saves ₹${(mrp - price).toLocaleString('en-IN')} off MRP`;
      text.style.color = "var(--status-success)";
    } else {
      badge.style.display = "none";
      text.textContent = "Warning: Selling price exceeds MRP!";
      text.style.color = "var(--status-error)";
    }
  } else {
    badge.style.display = "none";
    text.textContent = "Enter price & MRP to see discount percentage";
    text.style.color = "var(--text-muted)";
  }
}

async function submitAddProduct(event) {
  if (event) event.preventDefault();
  clearAddProductErrors();

  const nameEl = document.getElementById("prodName");
  const catEl = document.getElementById("prodCategory");
  const brandEl = document.getElementById("prodBrand");
  const specsEl = document.getElementById("prodSpecs");
  const descEl = document.getElementById("prodDesc");
  const priceEl = document.getElementById("prodPrice");
  const mrpEl = document.getElementById("prodMrp");
  const stockEl = document.getElementById("prodStock");
  const statusEl = document.getElementById("prodStatus");
  const imgSelect = document.getElementById("prodImageSelect");
  const customImgEl = document.getElementById("prodCustomImageUrl");
  const skuEl = document.getElementById("prodSku");

  const name = nameEl ? nameEl.value.trim() : "";
  const catId = catEl ? parseInt(catEl.value) : 0;
  const brand = brandEl ? brandEl.value.trim() : "";
  const specs = specsEl ? specsEl.value.trim() : "";
  const desc = descEl ? descEl.value.trim() : "";
  const price = priceEl ? parseFloat(priceEl.value) : NaN;
  const mrp = mrpEl ? parseFloat(mrpEl.value) : NaN;
  const stock = stockEl ? parseInt(stockEl.value) : NaN;
  const status = statusEl ? statusEl.value : "ACTIVE";
  const sku = skuEl ? skuEl.value.trim() : "";

  let imageUrl = "tshirt_casual.jpg";
  if (imgSelect && imgSelect.value === "custom") {
    imageUrl = customImgEl ? customImgEl.value.trim() : "";
  } else if (imgSelect) {
    imageUrl = imgSelect.value;
  }

  // Selected sizes
  const sizeCheckboxes = document.querySelectorAll('input[name="prodSizes"]:checked');
  const selectedSizes = Array.from(sizeCheckboxes).map(cb => cb.value);

  // Frontend Validations
  let hasErrors = false;
  let firstInvalidEl = null;

  function markError(element, errSpanId, message) {
    hasErrors = true;
    if (element) element.style.borderColor = "var(--status-error)";
    const errSpan = document.getElementById(errSpanId);
    if (errSpan) errSpan.textContent = message;
    if (!firstInvalidEl && element) firstInvalidEl = element;
  }

  if (!name || name.length < 3) {
    markError(nameEl, "errProdName", "Product name is required (minimum 3 characters).");
  }

  if (!catId || isNaN(catId) || catId <= 0) {
    markError(catEl, "errProdCategory", "Please select a valid product category.");
  }

  if (!desc || desc.length < 5) {
    markError(descEl, "errProdDesc", "Please provide a detailed product description (at least 5 characters).");
  }

  if (isNaN(price) || price <= 0) {
    markError(priceEl, "errProdPrice", "Selling price must be greater than ₹0.");
  }

  if (isNaN(mrp) || mrp <= 0) {
    markError(mrpEl, "errProdMrp", "Original Price / MRP must be greater than ₹0.");
  } else if (!isNaN(price) && mrp < price) {
    markError(mrpEl, "errProdMrp", "MRP cannot be lower than the selling price.");
  }

  if (isNaN(stock) || stock < 0) {
    markError(stockEl, "errProdStock", "Stock quantity cannot be negative.");
  }

  if (!imageUrl) {
    markError(customImgEl || imgSelect, "errProdImage", "Please select or provide an image URL/filename.");
  }

  if (hasErrors) {
    const alert = document.getElementById("addProductErrorAlert");
    if (alert) {
      alert.style.display = "block";
      alert.textContent = "Please correct the highlighted fields before saving.";
    }
    if (firstInvalidEl) firstInvalidEl.focus();
    return;
  }

  // Set saving lock
  isSavingProduct = true;
  const saveBtn = document.getElementById("btnSaveProduct");
  const quickSaveBtn = document.getElementById("btnQuickAddProduct");
  const cancelBtn = document.getElementById("btnCancelAddProduct");
  const spinner = document.getElementById("btnSaveProductSpinner");
  const btnText = document.getElementById("btnSaveProductText");

  if (saveBtn) saveBtn.disabled = true;
  if (quickSaveBtn) {
    quickSaveBtn.disabled = true;
    quickSaveBtn.textContent = "Adding...";
  }
  if (cancelBtn) cancelBtn.disabled = true;
  if (spinner) spinner.style.display = "inline-block";
  if (btnText) btnText.textContent = "Adding Product...";

  // Construct combined specifications
  let finalSpecs = specs;
  if (!finalSpecs) {
    const parts = [];
    if (brand) parts.push(brand);
    if (selectedSizes.length > 0) parts.push(`Sizes: ${selectedSizes.join(", ")}`);
    if (sku) parts.push(`SKU: ${sku}`);
    finalSpecs = parts.length > 0 ? parts.join(" • ") : `${name} • Premium Quality`;
  }

  const payload = {
    name: name,
    categoryId: catId,
    price: price,
    mrp: mrp,
    stockQuantity: stock,
    description: desc,
    shortSpecs: finalSpecs,
    imageUrl: imageUrl,
    active: status === "ACTIVE"
  };

  const currentRole = getCurrentRole() || "SELLER";

  try {
    let createdProduct = null;
    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-User-Role": currentRole
        },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        createdProduct = await res.json();
      } else if (res.status !== 404 && res.status !== 405) {
        let errMsg = "Failed to save product on server.";
        try {
          const errJson = await res.json();
          if (errJson && errJson.error) errMsg = errJson.error;
        } catch (parseErr) {}
        throw new Error(errMsg);
      }
    } catch (fetchErr) {
      // If server is not responding (e.g. running on static live server), log and fallback to client-side storage
      console.warn("Backend API not reachable or static environment. Saving product client-side:", fetchErr.message);
    }

    if (!createdProduct) {
      const allExisting = getStoredProducts();
      const maxId = allExisting.reduce((max, p) => Math.max(max, p.productId || 0), 20);
      createdProduct = {
        productId: maxId + 1,
        name: name,
        categoryId: catId,
        price: price,
        mrp: mrp,
        stockQuantity: stock,
        description: desc,
        shortSpecs: finalSpecs,
        imageUrl: imageUrl,
        rating: 4.5,
        reviewCount: 1,
        active: status === "ACTIVE",
        sellerId: 2,
        sellerName: "Campus Style Studio"
      };
    }

    if (!createdProduct.sellerId) createdProduct.sellerId = (currentRole === "ADMIN" ? 1 : 2);
    if (!createdProduct.sellerName) createdProduct.sellerName = (currentRole === "ADMIN" ? "Platform Official" : "Campus Style Studio");
    if (typeof createdProduct.active === "undefined") createdProduct.active = (status === "ACTIVE");
    if (!createdProduct.rating) createdProduct.rating = 4.5;
    if (!createdProduct.reviewCount) createdProduct.reviewCount = 1;

    // Add to stored products
    const allProducts = getStoredProducts();
    const existingIdx = allProducts.findIndex(p => p.productId === createdProduct.productId);
    if (existingIdx >= 0) {
      allProducts[existingIdx] = createdProduct;
    } else {
      allProducts.unshift(createdProduct);
    }
    saveStoredProducts(allProducts);

    if (typeof logClientActivity === "function") {
      logClientActivity("PRODUCT", "PRODUCT_CREATED", (currentRole === "ADMIN" ? "System Administrator" : "Campus Style Studio"), `Added new product "${name}" (Price: ₹${price})`, `Product #${createdProduct.productId}`, "success");
    }

    isSavingProduct = false;
    if (saveBtn) saveBtn.disabled = false;
    if (quickSaveBtn) {
      quickSaveBtn.disabled = false;
      quickSaveBtn.textContent = "+ Add Product";
    }
    if (cancelBtn) cancelBtn.disabled = false;
    if (spinner) spinner.style.display = "none";
    if (btnText) btnText.textContent = "+ Add Product";

    // Close modal & reset form
    closeAddProductModal();
    const form = document.getElementById("addProductForm");
    if (form) form.reset();

    showToast("Product added successfully.", "success");

    // Immediately refresh seller and admin dashboard tables
    if (typeof renderSellerDashboard === "function") {
      renderSellerDashboard();
    }
    if (typeof renderAdminProductManagement === "function") {
      renderAdminProductManagement();
    }

    // Also update storefront catalog if rendered on page
    if (document.getElementById("productsGrid") && typeof loadAndRenderProducts === "function") {
      loadAndRenderProducts();
      if (typeof renderNewArrivals === "function") renderNewArrivals();
      if (typeof renderTopSelling === "function") renderTopSelling();
    }

  } catch (error) {
    isSavingProduct = false;
    if (saveBtn) saveBtn.disabled = false;
    if (quickSaveBtn) {
      quickSaveBtn.disabled = false;
      quickSaveBtn.textContent = "+ Add Product";
    }
    if (cancelBtn) cancelBtn.disabled = false;
    if (spinner) spinner.style.display = "none";
    if (btnText) btnText.textContent = "+ Add Product";

    const alert = document.getElementById("addProductErrorAlert");
    if (alert) {
      alert.style.display = "block";
      alert.textContent = error.message || "An unexpected error occurred while saving. Please try again.";
    }
  }
}

/* ==============================================================
   DOM READY & GLOBAL EVENT LISTENERS
   ============================================================== */
if (typeof document !== "undefined") {
  document.addEventListener("DOMContentLoaded", () => {
    if (document.getElementById("productsGrid")) {
      initStorefront();
    }
  });

  // Global keydown handler for Escape to close modal safely
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      const addModal = document.getElementById("addProductModal");
      if (addModal && addModal.classList.contains("open") && !isSavingProduct) {
        closeAddProductModal();
      }
    }
  });
}
