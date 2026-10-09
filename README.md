# GUVI Campus E-Commerce & Management Platform

A genuine, practical, human-designed full-stack e-commerce web application developed with **Core Java, JDBC, Servlets, and MySQL**, with an authentic, restrained, usability-first frontend built using **HTML5, Vanilla CSS, and JavaScript**.

The codebase is structured into three dedicated and connected folders:
- `frontend/`: Web pages, styles, scripts, and media assets.
- `backend/`: Java source code, compiled bytecode, Servlets, DAOs, and embedded server.
- `database/`: Relational schema definitions and seed data.

---

## 1. Directory Structure & Architecture

```
GUVI E-Commerce Site/
├── frontend/
│   ├── index.html            # Campus Storefront (Products, Filters, Cart, Checkout)
│   ├── dashboard.html        # Management Dashboard (Buyer, Seller, Admin)
│   ├── style.css             # Authentic Vanilla CSS Design System
│   ├── app.js                # Storefront & Dashboard Application Controller
│   └── assets/
│       └── images/           # Handcrafted SVG product illustrations
│           ├── mouse.svg
│           ├── pendrive.svg
│           ├── keyboard.svg
│           ├── usbhub.svg
│           ├── headphones.svg
│           ├── earphones.svg
│           ├── book_clrs.svg
│           ├── book_os.svg
│           ├── book_db.svg
│           ├── raspberrypi.svg
│           ├── arduino.svg
│           ├── esp32.svg
│           ├── calculator.svg
│           ├── notebook.svg
│           └── parkerpen.svg
│
├── backend/
│   ├── src/
│   │   └── com/guvi/ecommerce/
│   │       ├── model/        # Entities: User, Product, Category, Order, CartItem
│   │       ├── dao/          # Data Access: DBConnection, UserDAO, ProductDAO, OrderDAO
│   │       ├── servlet/      # Handlers: Auth, Product, Cart, Order, Admin
│   │       │   └── base/     # Servlet specifications: HttpServlet, Request, Response, Session
│   │       └── server/       # AppServer: Zero-dependency JDK HTTP & REST Server
│   ├── bin/                  # Compiled Java .class bytecode
│   ├── WEB-INF/
│   │   └── web.xml           # Standard Java EE deployment descriptor
│   └── run.bat               # Direct launcher inside backend/
│
├── database/
│   └── schema.sql            # MySQL 8.0 DDL & Seed Data Script
│
├── run.bat                   # 1-Click Root Windows Compiler & Server Launcher
└── README.md                 # Complete Project Documentation
```

---

## 2. Component Connectivity

All three modules are connected:
1. **Frontend to Backend**:
   - `frontend/app.js` issues RESTful HTTP calls (`/api/products`, `/api/orders`, `/api/auth`, `/api/admin`) to `AppServer.java`.
   - `AppServer.java` serves static resources (`index.html`, `dashboard.html`, `style.css`, `assets/...`) directly from the `frontend/` directory.
   - If running frontend independently, `app.js` provides client-side persistence and simulation.
2. **Backend to Database**:
   - `DBConnection.java` connects to MySQL (`jdbc:mysql://localhost:3306/guvi_ecommerce`) using JDBC.
   - If MySQL is offline, `DBConnection.java` automatically falls back to an in-memory concurrent thread-safe store pre-populated with data matching `database/schema.sql`.
   - `OrderDAO.java` handles atomic multi-table transactions (`orders`, `order_items`, and inventory reduction in `products`) with `conn.setAutoCommit(false)` and rollback mechanisms.
3. **Database to Frontend & Backend**:
   - `database/schema.sql` defines the exact schema utilized by the backend DAOs.
   - The frontend Admin dashboard displays live system and database connectivity status.

---

## 3. Technology Stack

```
                      +---------------------------------------+
                      |   frontend/ (HTML5 / CSS / JS)        |
                      |   Storefront & Role Dashboards        |
                      +-------------------+-------------------+
                                          |
                                HTTP / REST APIs
                                          |
                      +-------------------v-------------------+
                      |   backend/ (Java HTTP Server /        |
                      |   Servlets & Session Manager)         |
                      +-------------------+-------------------+
                                          |
                                Java Object Mapping
                                          |
                      +-------------------v-------------------+
                      |   backend/dao/ (PreparedStatements,   |
                      |   ACID Transactions, AutoCommit=false)|
                      +-------------------+-------------------+
                                          |
                                     JDBC Driver
                                          |
                      +-------------------v-------------------+
                      |   database/ (MySQL 8.0 InnoDB /       |
                      |   In-Memory Fallback Engine)          |
                      +---------------------------------------+
```

### Backend Classes
- **Model Layer (`com.guvi.ecommerce.model`)**:
  - `User.java`: Entity supporting `BUYER`, `SELLER`, and `ADMIN` roles.
  - `Product.java`: Catalog items with pricing, MRP, stock quantity, and discount calculations.
  - `Order.java` & `OrderItem.java`: Transactional order headers and line items.
  - `CartItem.java`: Active cart state representation.
  - `Category.java`: Category entities.
- **Data Access Layer (`com.guvi.ecommerce.dao`)**:
  - `DBConnection.java`: Configurable JDBC MySQL connection manager with graceful fallback.
  - `UserDAO.java`: User authentication, registration, role updates, and listing.
  - `ProductDAO.java`: Product catalog querying with category, price range, stock, and keyword filtering.
  - `OrderDAO.java`: Atomic order placement with explicit commit and rollback boundaries.
- **Servlet Layer (`com.guvi.ecommerce.servlet`)**:
  - `AuthServlet.java`: Session creation, login, student registration, and logout.
  - `ProductServlet.java`: Catalog REST endpoints.
  - `CartServlet.java`: Session-based shopping cart management.
  - `OrderServlet.java`: Transactional order submission.
  - `AdminServlet.java`: System stats, order status transitions, and user management.
- **Server Runtime (`com.guvi.ecommerce.server.AppServer`)**:
  - Built-in HTTP server using JDK `com.sun.net.httpserver.HttpServer` on port 8080.

---

## 4. Database Setup (`database/schema.sql`)

The MySQL database schema contains 6 relational tables with foreign keys and cascade rules:
- `users`: User profiles with role enum (`BUYER`, `SELLER`, `ADMIN`) and account status.
- `categories`: Product department classifications.
- `products`: Catalog items linked to seller and category with stock constraints.
- `cart`: User-linked shopping cart items.
- `orders`: Transactional order headers with shipping address, payment status, and order status.
- `order_items`: Order line items with unit price snapshots and quantity.

To import the schema into your MySQL server:
```bash
mysql -u root -p < database/schema.sql
```

---

## 5. How to Run the Project

### Option A: 1-Click Launch (Windows)
Double-click `run.bat` in the project root:
```cmd
.\run.bat
```
This compiles the Java classes into `backend/bin/` and launches the server at **`http://localhost:8080/`**.

### Option B: Manual Java Compilation & Execution
From the project root:
```bash
# Compile all source files
javac -encoding UTF-8 -d backend/bin backend/src/com/guvi/ecommerce/model/*.java backend/src/com/guvi/ecommerce/dao/*.java backend/src/com/guvi/ecommerce/servlet/base/*.java backend/src/com/guvi/ecommerce/servlet/*.java backend/src/com/guvi/ecommerce/server/*.java

# Run AppServer
java -cp backend/bin com.guvi.ecommerce.server.AppServer
```
Open **`http://localhost:8080/`** in your browser.

### Option C: Standalone Frontend
You can also open `frontend/index.html` directly in any web browser. The application features client-side data persistence so that 100% of the UI, cart, search, filtering, checkout, and dashboards function even without running the Java backend.
