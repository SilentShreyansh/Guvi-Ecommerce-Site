package com.guvi.ecommerce.server;

import com.guvi.ecommerce.dao.DBConnection;
import com.guvi.ecommerce.dao.OrderDAO;
import com.guvi.ecommerce.dao.ProductDAO;
import com.guvi.ecommerce.dao.UserDAO;
import com.guvi.ecommerce.model.CartItem;
import com.guvi.ecommerce.model.Order;
import com.guvi.ecommerce.model.OrderItem;
import com.guvi.ecommerce.model.Product;
import com.guvi.ecommerce.model.User;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import com.sun.net.httpserver.HttpServer;

import java.io.*;
import java.net.InetSocketAddress;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.sql.SQLException;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.Executors;

public class AppServer {

    private static final int PORT = 8080;
    private static final UserDAO userDAO = new UserDAO();
    private static final ProductDAO productDAO = new ProductDAO();
    private static final OrderDAO orderDAO = new OrderDAO();

    private static final Map<String, User> sessions = new ConcurrentHashMap<>();
    private static final Map<String, List<CartItem>> sessionCarts = new ConcurrentHashMap<>();
    private static InventoryMonitorThread inventoryMonitor;

    public static void main(String[] args) throws IOException {
        HttpServer server = HttpServer.create(new InetSocketAddress(PORT), 0);
        server.setExecutor(Executors.newFixedThreadPool(16));

        // Background Inventory Monitor (Phase 25)
        inventoryMonitor = new InventoryMonitorThread(productDAO);
        inventoryMonitor.start();

        Runtime.getRuntime().addShutdownHook(new Thread(() -> {
            System.out.println("[AppServer] Shutting down server and background workers...");
            if (inventoryMonitor != null) {
                inventoryMonitor.stop();
            }
            server.stop(1);
        }));

        server.createContext("/api/auth/login", new LoginHandler());
        server.createContext("/api/auth/register", new RegisterHandler());
        server.createContext("/api/auth/logout", new LogoutHandler());
        server.createContext("/api/auth/session", new SessionHandler());
        server.createContext("/api/products", new ProductHandler());
        server.createContext("/api/cart", new CartHandler());
        server.createContext("/api/orders", new OrderHandler());
        server.createContext("/api/admin/users", new AdminUsersHandler());
        server.createContext("/api/admin/stats", new AdminStatsHandler());
        server.createContext("/api/admin/activities", new AdminActivitiesHandler());

        server.createContext("/", new StaticFileHandler());

        server.start();
        System.out.println("==================================================================");
        System.out.println("  GUVI E-Commerce Platform running at: http://localhost:" + PORT);
        System.out.println("  Backend: Core Java + JDBC + RESTful Servlets + Active Session Guard");
        System.out.println("  Press Ctrl+C to stop the server.");
        System.out.println("==================================================================");
    }

    private static void sendJsonResponse(HttpExchange exchange, int statusCode, String json) throws IOException {
        byte[] bytes = json.getBytes(StandardCharsets.UTF_8);
        exchange.getResponseHeaders().set("Content-Type", "application/json; charset=UTF-8");
        exchange.getResponseHeaders().set("Access-Control-Allow-Origin", "*");
        exchange.getResponseHeaders().set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        exchange.getResponseHeaders().set("Access-Control-Allow-Headers", "Content-Type, Authorization, X-User-Id, X-User-Role");
        exchange.sendResponseHeaders(statusCode, bytes.length);
        try (OutputStream os = exchange.getResponseBody()) {
            os.write(bytes);
        }
    }

    private static String readRequestBody(HttpExchange exchange) throws IOException {
        try (InputStream is = exchange.getRequestBody();
             ByteArrayOutputStream baos = new ByteArrayOutputStream()) {
            byte[] buffer = new byte[1024];
            int length;
            while ((length = is.read(buffer)) != -1) {
                baos.write(buffer, 0, length);
            }
            return baos.toString(StandardCharsets.UTF_8.name());
        }
    }

    private static Map<String, String> parseQueryParams(String query) {
        Map<String, String> map = new HashMap<>();
        if (query == null || query.isEmpty()) return map;
        String[] pairs = query.split("&");
        for (String pair : pairs) {
            String[] kv = pair.split("=", 2);
            String k = URLDecoder.decode(kv[0], StandardCharsets.UTF_8);
            String v = kv.length > 1 ? URLDecoder.decode(kv[1], StandardCharsets.UTF_8) : "";
            map.put(k, v);
        }
        return map;
    }

    private static String escapeJson(String s) {
        if (s == null) return "";
        return s.replace("\\", "\\\\")
                .replace("\"", "\\\"")
                .replace("\b", "\\b")
                .replace("\f", "\\f")
                .replace("\n", "\\n")
                .replace("\r", "\\r")
                .replace("\t", "\\t");
    }

    private static String extractJsonField(String json, String fieldName) {
        if (json == null) return null;
        String strPattern = "\"" + fieldName + "\"\\s*:\\s*\"((?:\\\\\"|[^\"])*)\"";
        java.util.regex.Pattern p = java.util.regex.Pattern.compile(strPattern);
        java.util.regex.Matcher m = p.matcher(json);
        if (m.find()) {
            return m.group(1).replace("\\\"", "\"").replace("\\\\", "\\");
        }
        String litPattern = "\"" + fieldName + "\"\\s*:\\s*([0-9.-]+|true|false|null)";
        java.util.regex.Pattern np = java.util.regex.Pattern.compile(litPattern);
        java.util.regex.Matcher nm = np.matcher(json);
        if (nm.find()) {
            String val = nm.group(1);
            return "null".equals(val) ? null : val;
        }
        return null;
    }

    private static String extractJsonArray(String json, String fieldName) {
        if (json == null) return null;
        int idx = json.indexOf("\"" + fieldName + "\"");
        if (idx == -1) return null;
        int start = json.indexOf("[", idx);
        if (start == -1) return null;
        int depth = 0;
        for (int i = start; i < json.length(); i++) {
            char c = json.charAt(i);
            if (c == '[') depth++;
            else if (c == ']') {
                depth--;
                if (depth == 0) {
                    return json.substring(start, i + 1);
                }
            }
        }
        return null;
    }

    private static List<OrderItem> parseOrderItems(String arrayJson) {
        List<OrderItem> list = new ArrayList<>();
        if (arrayJson == null) return list;
        java.util.regex.Pattern objPattern = java.util.regex.Pattern.compile("\\{([^{}]+)\\}");
        java.util.regex.Matcher objMatcher = objPattern.matcher(arrayJson);
        while (objMatcher.find()) {
            String itemObj = objMatcher.group(1);
            String pIdStr = extractJsonField(itemObj, "productId");
            if (pIdStr == null) pIdStr = extractJsonField(itemObj, "id");
            String name = extractJsonField(itemObj, "productName");
            if (name == null) name = extractJsonField(itemObj, "name");
            String priceStr = extractJsonField(itemObj, "unitPrice");
            if (priceStr == null) priceStr = extractJsonField(itemObj, "price");
            String qtyStr = extractJsonField(itemObj, "quantity");

            if (pIdStr != null && priceStr != null) {
                try {
                    int pId = Integer.parseInt(pIdStr);
                    double price = Double.parseDouble(priceStr);
                    int qty = qtyStr != null ? Integer.parseInt(qtyStr) : 1;
                    list.add(new OrderItem(pId, name != null ? name : "Product #" + pId, price, qty));
                } catch (NumberFormatException ignored) {}
            }
        }
        return list;
    }

    private static User getCurrentUser(HttpExchange exchange) {
        List<String> cookies = exchange.getRequestHeaders().get("Cookie");
        if (cookies != null) {
            for (String cookie : cookies) {
                for (String part : cookie.split(";")) {
                    String[] kv = part.trim().split("=", 2);
                    if (kv.length == 2 && "JSESSIONID".equals(kv[0])) {
                        User sessionUser = sessions.get(kv[1]);
                        if (sessionUser != null) return sessionUser;
                    }
                }
            }
        }

        List<String> authHeaders = exchange.getRequestHeaders().get("Authorization");
        if (authHeaders != null && !authHeaders.isEmpty()) {
            String val = authHeaders.get(0).trim();
            if (val.startsWith("Bearer ")) {
                String sId = val.substring(7).trim();
                User sessionUser = sessions.get(sId);
                if (sessionUser != null) return sessionUser;
            }
        }

        // Header fallback for testing clients
        List<String> userIdHeaders = exchange.getRequestHeaders().get("X-User-Id");
        if (userIdHeaders != null && !userIdHeaders.isEmpty()) {
            try {
                int uid = Integer.parseInt(userIdHeaders.get(0).trim());
                User u = userDAO.findById(uid);
                if (u != null) return u;
            } catch (NumberFormatException ignored) {}
        }

        List<String> roleHeaders = exchange.getRequestHeaders().get("X-User-Role");
        if (roleHeaders != null && !roleHeaders.isEmpty()) {
            String role = roleHeaders.get(0).trim().toUpperCase();
            if ("SELLER".equals(role)) {
                return userDAO.findById(2);
            } else if ("ADMIN".equals(role)) {
                return userDAO.findById(1);
            } else if ("BUYER".equals(role)) {
                return userDAO.findById(4);
            }
        }

        return null;
    }

    private static String getSessionId(HttpExchange exchange) {
        List<String> cookies = exchange.getRequestHeaders().get("Cookie");
        if (cookies != null) {
            for (String cookie : cookies) {
                for (String part : cookie.split(";")) {
                    String[] kv = part.trim().split("=", 2);
                    if (kv.length == 2 && "JSESSIONID".equals(kv[0])) {
                        return kv[1];
                    }
                }
            }
        }
        List<String> authHeaders = exchange.getRequestHeaders().get("Authorization");
        if (authHeaders != null && !authHeaders.isEmpty()) {
            String val = authHeaders.get(0).trim();
            if (val.startsWith("Bearer ")) {
                return val.substring(7).trim();
            }
        }
        List<String> userIds = exchange.getRequestHeaders().get("X-User-Id");
        if (userIds != null && !userIds.isEmpty()) {
            return "user-" + userIds.get(0).trim();
        }
        return "default-session";
    }

    private static String getCategoryNameById(int catId) {
        switch (catId) {
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

    private static String userToJson(User u) {
        if (u == null) return "null";
        return String.format(
            "{\"userId\":%d,\"fullName\":\"%s\",\"email\":\"%s\",\"phone\":\"%s\",\"role\":\"%s\",\"status\":\"%s\",\"addressStreet\":\"%s\",\"addressCity\":\"%s\",\"addressState\":\"%s\",\"addressPincode\":\"%s\"}",
            u.getUserId(), escapeJson(u.getFullName()), escapeJson(u.getEmail()), escapeJson(u.getPhone()),
            escapeJson(u.getRole()), escapeJson(u.getStatus()), escapeJson(u.getAddressStreet()),
            escapeJson(u.getAddressCity()), escapeJson(u.getAddressState()), escapeJson(u.getAddressPincode())
        );
    }

    private static String productToJson(Product p) {
        if (p == null) return "null";
        return String.format(
            "{\"productId\":%d,\"sellerId\":%d,\"sellerName\":\"%s\",\"categoryId\":%d,\"categoryName\":\"%s\",\"name\":\"%s\",\"description\":\"%s\",\"shortSpecs\":\"%s\",\"price\":%.2f,\"mrp\":%.2f,\"discountPercentage\":%d,\"stockQuantity\":%d,\"rating\":%.1f,\"reviewCount\":%d,\"imageUrl\":\"%s\",\"active\":%b}",
            p.getProductId(), p.getSellerId(), escapeJson(p.getSellerName()), p.getCategoryId(), escapeJson(p.getCategoryName()),
            escapeJson(p.getName()), escapeJson(p.getDescription()), escapeJson(p.getShortSpecs()),
            p.getPrice(), p.getMrp(), p.getDiscountPercentage(), p.getStockQuantity(), p.getRating(), p.getReviewCount(),
            escapeJson(p.getImageUrl()), p.isActive()
        );
    }

    private static String orderToJson(Order o) {
        if (o == null) return "null";
        StringBuilder itemsJson = new StringBuilder("[");
        List<OrderItem> items = o.getItems();
        for (int i = 0; i < items.size(); i++) {
            OrderItem it = items.get(i);
            itemsJson.append(String.format(
                "{\"itemId\":%d,\"productId\":%d,\"productName\":\"%s\",\"unitPrice\":%.2f,\"quantity\":%d,\"lineTotal\":%.2f}",
                it.getItemId(), it.getProductId(), escapeJson(it.getProductName()), it.getUnitPrice(), it.getQuantity(), it.getLineTotal()
            ));
            if (i < items.size() - 1) itemsJson.append(",");
        }
        itemsJson.append("]");

        return String.format(
            "{\"orderId\":%d,\"orderNumber\":\"%s\",\"userId\":%d,\"buyerName\":\"%s\",\"totalAmount\":%.2f,\"discountAmount\":%.2f,\"taxAmount\":%.2f,\"shippingFee\":%.2f,\"finalAmount\":%.2f,\"paymentMethod\":\"%s\",\"paymentStatus\":\"%s\",\"orderStatus\":\"%s\",\"shippingName\":\"%s\",\"shippingPhone\":\"%s\",\"shippingAddress\":\"%s\",\"shippingPincode\":\"%s\",\"createdAt\":\"%s\",\"items\":%s}",
            o.getOrderId(), escapeJson(o.getOrderNumber()), o.getUserId(), escapeJson(o.getBuyerName()),
            o.getTotalAmount(), o.getDiscountAmount(), o.getTaxAmount(), o.getShippingFee(), o.getFinalAmount(),
            escapeJson(o.getPaymentMethod()), escapeJson(o.getPaymentStatus()), escapeJson(o.getOrderStatus()),
            escapeJson(o.getShippingName()), escapeJson(o.getShippingPhone()), escapeJson(o.getShippingAddress()),
            escapeJson(o.getShippingPincode()), o.getCreatedAt() != null ? o.getCreatedAt().toString() : "",
            itemsJson.toString()
        );
    }

    static class LoginHandler implements HttpHandler {
        @Override
        public void handle(HttpExchange exchange) throws IOException {
            if ("OPTIONS".equalsIgnoreCase(exchange.getRequestMethod())) {
                sendJsonResponse(exchange, 200, "{}");
                return;
            }
            if (!"POST".equalsIgnoreCase(exchange.getRequestMethod())) {
                sendJsonResponse(exchange, 405, "{\"error\":\"Method not allowed\"}");
                return;
            }
            String body = readRequestBody(exchange);
            String email = extractJsonField(body, "email");
            String password = extractJsonField(body, "password");

            if (email == null || password == null || email.trim().isEmpty() || password.trim().isEmpty()) {
                sendJsonResponse(exchange, 400, "{\"error\":\"Email and password required\"}");
                return;
            }

            User user = userDAO.authenticate(email.trim(), password.trim());
            if (user != null) {
                String sessionId = UUID.randomUUID().toString();
                sessions.put(sessionId, user);
                ActivityMonitor.log("USER", "USER_LOGIN", user.getFullName(), "User logged into session (" + user.getRole() + ")", "User #" + user.getUserId(), "info");
                exchange.getResponseHeaders().add("Set-Cookie", "JSESSIONID=" + sessionId + "; Path=/; HttpOnly");
                sendJsonResponse(exchange, 200, "{\"success\":true,\"sessionId\":\"" + sessionId + "\",\"user\":" + userToJson(user) + "}");
            } else {
                sendJsonResponse(exchange, 401, "{\"error\":\"Invalid email or password\"}");
            }
        }
    }

    static class RegisterHandler implements HttpHandler {
        @Override
        public void handle(HttpExchange exchange) throws IOException {
            if ("OPTIONS".equalsIgnoreCase(exchange.getRequestMethod())) {
                sendJsonResponse(exchange, 200, "{}");
                return;
            }
            if (!"POST".equalsIgnoreCase(exchange.getRequestMethod())) {
                sendJsonResponse(exchange, 405, "{\"error\":\"Method not allowed\"}");
                return;
            }
            String body = readRequestBody(exchange);
            String name = extractJsonField(body, "fullName");
            String email = extractJsonField(body, "email");
            String password = extractJsonField(body, "password");
            String phone = extractJsonField(body, "phone");
            String role = extractJsonField(body, "role");

            if (name == null || name.trim().isEmpty() ||
                email == null || email.trim().isEmpty() ||
                password == null || password.trim().isEmpty() ||
                phone == null || phone.trim().isEmpty()) {
                sendJsonResponse(exchange, 400, "{\"error\":\"Please fill in all required fields.\"}");
                return;
            }

            if (!email.contains("@") || !email.contains(".")) {
                sendJsonResponse(exchange, 400, "{\"error\":\"Invalid email address format.\"}");
                return;
            }

            if (password.length() < 8) {
                sendJsonResponse(exchange, 400, "{\"error\":\"Password must contain at least 8 characters.\"}");
                return;
            }

            User newUser = new User();
            newUser.setFullName(name.trim());
            newUser.setEmail(email.trim().toLowerCase());
            newUser.setPassword(password.trim());
            newUser.setPhone(phone.trim());
            newUser.setRole(role != null && !role.isEmpty() ? role.trim().toUpperCase() : "BUYER");
            newUser.setAddressStreet("Hostel Zone, IITM Campus");
            newUser.setAddressCity("Chennai");
            newUser.setAddressState("Tamil Nadu");
            newUser.setAddressPincode("600113");

            boolean created = userDAO.register(newUser);
            if (created) {
                String sessionId = UUID.randomUUID().toString();
                sessions.put(sessionId, newUser);
                ActivityMonitor.log("USER", "USER_REGISTERED", newUser.getFullName(), "New user account registered (" + newUser.getRole() + ")", "Email: " + newUser.getEmail(), "success");
                exchange.getResponseHeaders().add("Set-Cookie", "JSESSIONID=" + sessionId + "; Path=/; HttpOnly");
                sendJsonResponse(exchange, 201, "{\"success\":true,\"sessionId\":\"" + sessionId + "\",\"user\":" + userToJson(newUser) + "}");
            } else {
                sendJsonResponse(exchange, 409, "{\"error\":\"An account with this email address already exists.\"}");
            }
        }
    }

    static class LogoutHandler implements HttpHandler {
        @Override
        public void handle(HttpExchange exchange) throws IOException {
            String sId = getSessionId(exchange);
            sessions.remove(sId);
            sessionCarts.remove(sId);
            exchange.getResponseHeaders().add("Set-Cookie", "JSESSIONID=; Path=/; Max-Age=0");
            sendJsonResponse(exchange, 200, "{\"success\":true,\"message\":\"Logged out successfully\"}");
        }
    }

    static class SessionHandler implements HttpHandler {
        @Override
        public void handle(HttpExchange exchange) throws IOException {
            User user = getCurrentUser(exchange);
            if (user != null) {
                sendJsonResponse(exchange, 200, "{\"authenticated\":true,\"user\":" + userToJson(user) + "}");
            } else {
                sendJsonResponse(exchange, 200, "{\"authenticated\":false}");
            }
        }
    }

    static class ProductHandler implements HttpHandler {
        @Override
        public void handle(HttpExchange exchange) throws IOException {
            String method = exchange.getRequestMethod();
            String path = exchange.getRequestURI().getPath();

            if ("OPTIONS".equalsIgnoreCase(method)) {
                sendJsonResponse(exchange, 200, "{}");
                return;
            }

            if ("GET".equalsIgnoreCase(method)) {
                if (path.matches("/api/products/\\d+")) {
                    int id = Integer.parseInt(path.substring(path.lastIndexOf('/') + 1));
                    Product p = productDAO.getProductById(id);
                    if (p != null) {
                        sendJsonResponse(exchange, 200, productToJson(p));
                    } else {
                        sendJsonResponse(exchange, 404, "{\"error\":\"Product not found\"}");
                    }
                    return;
                }

                Map<String, String> query = parseQueryParams(exchange.getRequestURI().getQuery());
                Integer categoryId = query.containsKey("category") && !query.get("category").isEmpty() ? Integer.parseInt(query.get("category")) : null;
                String search = query.get("search");
                Double minPrice = query.containsKey("minPrice") && !query.get("minPrice").isEmpty() ? Double.parseDouble(query.get("minPrice")) : null;
                Double maxPrice = query.containsKey("maxPrice") && !query.get("maxPrice").isEmpty() ? Double.parseDouble(query.get("maxPrice")) : null;
                Boolean inStockOnly = query.containsKey("inStock") ? Boolean.parseBoolean(query.get("inStock")) : false;
                String sort = query.get("sort");

                List<Product> products = productDAO.getProducts(categoryId, search, minPrice, maxPrice, inStockOnly, sort);
                StringBuilder sb = new StringBuilder("[");
                for (int i = 0; i < products.size(); i++) {
                    sb.append(productToJson(products.get(i)));
                    if (i < products.size() - 1) sb.append(",");
                }
                sb.append("]");
                sendJsonResponse(exchange, 200, sb.toString());
                return;
            }

            if ("POST".equalsIgnoreCase(method)) {
                User user = getCurrentUser(exchange);
                if (user == null || (!"SELLER".equalsIgnoreCase(user.getRole()) && !"ADMIN".equalsIgnoreCase(user.getRole()))) {
                    sendJsonResponse(exchange, 403, "{\"error\":\"Access denied: Only authenticated sellers and administrators can create products.\"}");
                    return;
                }

                String body = readRequestBody(exchange);
                String name = extractJsonField(body, "name");
                String shortSpecs = extractJsonField(body, "shortSpecs");
                String desc = extractJsonField(body, "description");
                String priceStr = extractJsonField(body, "price");
                String mrpStr = extractJsonField(body, "mrp");
                String stockStr = extractJsonField(body, "stockQuantity");
                String catStr = extractJsonField(body, "categoryId");
                String img = extractJsonField(body, "imageUrl");

                if (name == null || name.trim().length() < 3) {
                    sendJsonResponse(exchange, 400, "{\"error\":\"Product name is required (minimum 3 characters).\"}");
                    return;
                }
                if (priceStr == null || mrpStr == null || stockStr == null) {
                    sendJsonResponse(exchange, 400, "{\"error\":\"Selling price, MRP, and stock quantity are required.\"}");
                    return;
                }

                double price;
                double mrp;
                int stock;
                try {
                    price = Double.parseDouble(priceStr);
                    mrp = Double.parseDouble(mrpStr);
                    stock = Integer.parseInt(stockStr);
                } catch (NumberFormatException e) {
                    sendJsonResponse(exchange, 400, "{\"error\":\"Price, MRP, and stock quantity must be valid numbers.\"}");
                    return;
                }

                if (price <= 0) {
                    sendJsonResponse(exchange, 400, "{\"error\":\"Selling price must be greater than zero.\"}");
                    return;
                }
                if (mrp < price) {
                    sendJsonResponse(exchange, 400, "{\"error\":\"MRP cannot be less than selling price.\"}");
                    return;
                }
                if (stock < 0) {
                    sendJsonResponse(exchange, 400, "{\"error\":\"Stock quantity cannot be negative.\"}");
                    return;
                }

                int catId = 6;
                if (catStr != null && !catStr.trim().isEmpty()) {
                    try {
                        catId = Integer.parseInt(catStr.trim());
                    } catch (NumberFormatException ignored) {}
                }

                String catName = getCategoryNameById(catId);

                Product p = new Product();
                p.setSellerId(user.getUserId());
                p.setSellerName(user.getFullName());
                p.setCategoryId(catId);
                p.setCategoryName(catName);
                p.setName(name.trim());
                p.setShortSpecs(shortSpecs != null && !shortSpecs.trim().isEmpty() ? shortSpecs.trim() : (name.trim() + " • Premium Quality"));
                p.setDescription(desc != null && !desc.trim().isEmpty() ? desc.trim() : name.trim());
                p.setPrice(price);
                p.setMrp(mrp);
                p.setStockQuantity(stock);
                p.setImageUrl((img != null && !img.trim().isEmpty()) ? img.trim() : "tshirt_casual.jpg");
                p.setRating(4.5);
                p.setReviewCount(1);
                p.setActive(true);

                boolean added = productDAO.addProduct(p);
                if (added) {
                    ActivityMonitor.log("PRODUCT", "PRODUCT_CREATED", user.getFullName(), "Created new product '" + p.getName() + "' (Price: ₹" + p.getPrice() + ", Stock: " + p.getStockQuantity() + ")", "Product #" + p.getProductId(), "success");
                    sendJsonResponse(exchange, 201, productToJson(p));
                } else {
                    sendJsonResponse(exchange, 500, "{\"error\":\"Failed to save product in database.\"}");
                }
                return;
            }

            if ("PUT".equalsIgnoreCase(method)) {
                User user = getCurrentUser(exchange);
                if (user == null || (!"SELLER".equalsIgnoreCase(user.getRole()) && !"ADMIN".equalsIgnoreCase(user.getRole()))) {
                    sendJsonResponse(exchange, 403, "{\"error\":\"Access denied: Only authenticated sellers and administrators can edit products.\"}");
                    return;
                }

                String body = readRequestBody(exchange);
                if (path.contains("/stock")) {
                    String[] parts = path.split("/");
                    int prodId = -1;
                    for (String part : parts) {
                        if (part.matches("\\d+")) {
                            prodId = Integer.parseInt(part);
                            break;
                        }
                    }
                    if (prodId == -1) {
                        try {
                            prodId = Integer.parseInt(parts[parts.length - 2]);
                        } catch (Exception ignored) {}
                    }
                    Product existingProd = productDAO.getProductById(prodId);
                    if (existingProd == null) {
                        sendJsonResponse(exchange, 404, "{\"error\":\"Product not found\"}");
                        return;
                    }
                    if (!"ADMIN".equalsIgnoreCase(user.getRole()) && existingProd.getSellerId() != 0 && existingProd.getSellerId() != user.getUserId()) {
                        sendJsonResponse(exchange, 403, "{\"error\":\"Access denied: You cannot modify another seller's product stock.\"}");
                        return;
                    }
                    String newStockStr = extractJsonField(body, "newStock");
                    String qtyStr = extractJsonField(body, "quantity");
                    if (newStockStr == null || newStockStr.isEmpty()) {
                        Map<String, String> qMap = parseQueryParams(exchange.getRequestURI().getQuery());
                        newStockStr = qMap.get("newStock");
                        if (qtyStr == null) qtyStr = qMap.get("quantity");
                    }
                    if (newStockStr != null && !newStockStr.isEmpty()) {
                        int newStock = Integer.parseInt(newStockStr);
                        boolean ok = productDAO.setStock(prodId, newStock);
                        ActivityMonitor.log("PRODUCT", "STOCK_SET", user.getFullName(), "Stock set to " + newStock + " for '" + existingProd.getName() + "'", "Product #" + prodId, "info");
                        sendJsonResponse(exchange, 200, "{\"success\":" + ok + ",\"newStock\":" + newStock + "}");
                        return;
                    } else if (qtyStr != null && !qtyStr.isEmpty()) {
                        int qty = Integer.parseInt(qtyStr);
                        boolean ok = productDAO.adjustStock(prodId, qty);
                        Product updated = productDAO.getProductById(prodId);
                        int resultingStock = (updated != null) ? updated.getStockQuantity() : 0;
                        ActivityMonitor.log("PRODUCT", "STOCK_ADJUSTED", user.getFullName(), "Stock adjusted (" + (qty > 0 ? "+" : "") + qty + ") for '" + existingProd.getName() + "' (Stock: " + resultingStock + ")", "Product #" + prodId, "info");
                        sendJsonResponse(exchange, 200, "{\"success\":" + ok + ",\"newStock\":" + resultingStock + "}");
                        return;
                    }
                } else if (path.matches("/api/products/\\d+")) {
                    int prodId = Integer.parseInt(path.substring(path.lastIndexOf('/') + 1));
                    Product existingProd = productDAO.getProductById(prodId);
                    if (existingProd == null) {
                        sendJsonResponse(exchange, 404, "{\"error\":\"Product not found\"}");
                        return;
                    }
                    if (!"ADMIN".equalsIgnoreCase(user.getRole()) && existingProd.getSellerId() != user.getUserId()) {
                        sendJsonResponse(exchange, 403, "{\"error\":\"Access denied: You cannot modify another seller's product.\"}");
                        return;
                    }
                    String name = extractJsonField(body, "name");
                    String priceStr = extractJsonField(body, "price");
                    String mrpStr = extractJsonField(body, "mrp");
                    String stockStr = extractJsonField(body, "stockQuantity");
                    String desc = extractJsonField(body, "description");
                    String specs = extractJsonField(body, "shortSpecs");
                    String catStr = extractJsonField(body, "categoryId");
                    String imgStr = extractJsonField(body, "imageUrl");
                    String activeStr = extractJsonField(body, "active");

                    if (name != null && !name.trim().isEmpty()) existingProd.setName(name.trim());
                    if (priceStr != null && !priceStr.trim().isEmpty()) existingProd.setPrice(Double.parseDouble(priceStr.trim()));
                    if (mrpStr != null && !mrpStr.trim().isEmpty()) existingProd.setMrp(Double.parseDouble(mrpStr.trim()));
                    if (stockStr != null && !stockStr.trim().isEmpty()) existingProd.setStockQuantity(Integer.parseInt(stockStr.trim()));
                    if (desc != null && !desc.trim().isEmpty()) existingProd.setDescription(desc.trim());
                    if (specs != null && !specs.trim().isEmpty()) existingProd.setShortSpecs(specs.trim());
                    if (catStr != null && !catStr.trim().isEmpty()) {
                        int cId = Integer.parseInt(catStr.trim());
                        existingProd.setCategoryId(cId);
                        existingProd.setCategoryName(getCategoryNameById(cId));
                    }
                    if (imgStr != null && !imgStr.trim().isEmpty()) existingProd.setImageUrl(imgStr.trim());
                    if (activeStr != null && !activeStr.trim().isEmpty()) existingProd.setActive(Boolean.parseBoolean(activeStr.trim()));

                    boolean ok = productDAO.updateProduct(existingProd);
                    if (ok) {
                        ActivityMonitor.log("PRODUCT", "PRODUCT_UPDATED", user.getFullName(), "Modified product details for '" + existingProd.getName() + "' (Price: ₹" + existingProd.getPrice() + ")", "Product #" + prodId, "info");
                    }
                    sendJsonResponse(exchange, 200, "{\"success\":" + ok + "}");
                    return;
                }
            }

            if ("DELETE".equalsIgnoreCase(method)) {
                if (path.matches("/api/products/\\d+")) {
                    int id = Integer.parseInt(path.substring(path.lastIndexOf('/') + 1));
                    User user = getCurrentUser(exchange);
                    if (user == null || (!"SELLER".equalsIgnoreCase(user.getRole()) && !"ADMIN".equalsIgnoreCase(user.getRole()))) {
                        sendJsonResponse(exchange, 403, "{\"error\":\"Access denied: Only sellers or administrators can delete products.\"}");
                        return;
                    }
                    Product existingProd = productDAO.getProductById(id);
                    if (existingProd != null && !"ADMIN".equalsIgnoreCase(user.getRole())) {
                        if (existingProd.getSellerId() != user.getUserId()) {
                            sendJsonResponse(exchange, 403, "{\"error\":\"Access denied: You cannot delete another seller's product.\"}");
                            return;
                        }
                    }
                    boolean deleted = productDAO.deleteProduct(id);
                    if (deleted) {
                        ActivityMonitor.log("PRODUCT", "PRODUCT_DELETED", user.getFullName(), "Removed product '" + (existingProd != null ? existingProd.getName() : ("#" + id)) + "' from active catalog", "Product #" + id, "danger");
                    }
                    sendJsonResponse(exchange, 200, "{\"success\":" + deleted + "}");
                    return;
                }
            }

            sendJsonResponse(exchange, 405, "{\"error\":\"Method not allowed\"}");
        }
    }

    static class CartHandler implements HttpHandler {
        @Override
        public void handle(HttpExchange exchange) throws IOException {
            String method = exchange.getRequestMethod();
            String path = exchange.getRequestURI().getPath();

            if ("OPTIONS".equalsIgnoreCase(method)) {
                sendJsonResponse(exchange, 200, "{}");
                return;
            }

            String sessionId = getSessionId(exchange);
            List<CartItem> cart = sessionCarts.computeIfAbsent(sessionId, k -> Collections.synchronizedList(new ArrayList<>()));

            if ("GET".equalsIgnoreCase(method)) {
                double subtotal = 0;
                int totalQuantity = 0;
                StringBuilder itemsJson = new StringBuilder("[");
                synchronized (cart) {
                    for (int i = 0; i < cart.size(); i++) {
                        CartItem it = cart.get(i);
                        subtotal += it.getLineTotal();
                        totalQuantity += it.getQuantity();
                        itemsJson.append(String.format(
                            "{\"productId\":%d,\"name\":\"%s\",\"price\":%.2f,\"quantity\":%d,\"lineTotal\":%.2f,\"imageUrl\":\"%s\",\"maxStock\":%d}",
                            it.getProductId(), escapeJson(it.getName()), it.getPrice(), it.getQuantity(),
                            it.getLineTotal(), escapeJson(it.getImageUrl() != null ? it.getImageUrl() : "mouse.jpg"), it.getMaxStock()
                        ));
                        if (i < cart.size() - 1) itemsJson.append(",");
                    }
                }
                itemsJson.append("]");

                double discount = subtotal > 1000 ? subtotal * 0.10 : 0.0;
                double tax = (subtotal - discount) * 0.05;
                double finalTotal = subtotal - discount + tax;

                String json = String.format(
                    "{\"itemCount\":%d,\"totalQuantity\":%d,\"subtotal\":%.2f,\"discount\":%.2f,\"tax\":%.2f,\"finalTotal\":%.2f,\"items\":%s}",
                    cart.size(), totalQuantity, subtotal, discount, tax, finalTotal, itemsJson.toString()
                );
                sendJsonResponse(exchange, 200, json);
                return;
            }

            if ("POST".equalsIgnoreCase(method)) {
                String body = readRequestBody(exchange);
                String pIdStr = extractJsonField(body, "productId");
                String qtyStr = extractJsonField(body, "quantity");
                if (pIdStr == null) {
                    sendJsonResponse(exchange, 400, "{\"error\":\"productId is required\"}");
                    return;
                }
                int pId;
                int qty = 1;
                try {
                    pId = Integer.parseInt(pIdStr);
                    if (qtyStr != null) qty = Integer.parseInt(qtyStr);
                } catch (NumberFormatException e) {
                    sendJsonResponse(exchange, 400, "{\"error\":\"Invalid productId or quantity\"}");
                    return;
                }
                if (qty <= 0) {
                    sendJsonResponse(exchange, 400, "{\"error\":\"Quantity must be greater than zero\"}");
                    return;
                }
                Product p = productDAO.getProductById(pId);
                if (p == null) {
                    sendJsonResponse(exchange, 404, "{\"error\":\"Product not found\"}");
                    return;
                }
                synchronized (cart) {
                    CartItem existing = null;
                    for (CartItem it : cart) {
                        if (it.getProductId() == pId) {
                            existing = it;
                            break;
                        }
                    }
                    int newQty = (existing != null ? existing.getQuantity() : 0) + qty;
                    if (newQty > p.getStockQuantity()) {
                        sendJsonResponse(exchange, 400, String.format("{\"error\":\"Cannot add %d units. Available stock is only %d.\"}", newQty, p.getStockQuantity()));
                        return;
                    }
                    if (existing != null) {
                        existing.setQuantity(newQty);
                    } else {
                        cart.add(new CartItem(pId, p.getName(), p.getPrice(), p.getMrp(), qty, p.getImageUrl(), p.getStockQuantity()));
                    }
                }
                sendJsonResponse(exchange, 200, "{\"success\":true,\"totalItems\":" + cart.size() + "}");
                return;
            }

            if ("PUT".equalsIgnoreCase(method)) {
                String body = readRequestBody(exchange);
                String pIdStr = extractJsonField(body, "productId");
                String qtyStr = extractJsonField(body, "quantity");
                if (pIdStr == null || qtyStr == null) {
                    sendJsonResponse(exchange, 400, "{\"error\":\"productId and quantity required\"}");
                    return;
                }
                int pId, qty;
                try {
                    pId = Integer.parseInt(pIdStr);
                    qty = Integer.parseInt(qtyStr);
                } catch (NumberFormatException e) {
                    sendJsonResponse(exchange, 400, "{\"error\":\"Invalid productId or quantity\"}");
                    return;
                }
                if (qty < 0) {
                    sendJsonResponse(exchange, 400, "{\"error\":\"Quantity cannot be negative\"}");
                    return;
                }
                Product p = productDAO.getProductById(pId);
                if (qty > 0 && p != null && qty > p.getStockQuantity()) {
                    sendJsonResponse(exchange, 400, String.format("{\"error\":\"Requested quantity (%d) exceeds available stock (%d).\"}", qty, p.getStockQuantity()));
                    return;
                }
                synchronized (cart) {
                    Iterator<CartItem> iter = cart.iterator();
                    boolean found = false;
                    while (iter.hasNext()) {
                        CartItem it = iter.next();
                        if (it.getProductId() == pId) {
                            found = true;
                            if (qty == 0) iter.remove();
                            else it.setQuantity(qty);
                            break;
                        }
                    }
                    if (!found && qty > 0) {
                        sendJsonResponse(exchange, 404, "{\"error\":\"Item not found in cart\"}");
                        return;
                    }
                }
                sendJsonResponse(exchange, 200, "{\"success\":true,\"totalItems\":" + cart.size() + "}");
                return;
            }

            if ("DELETE".equalsIgnoreCase(method)) {
                String pathPart = path.substring("/api/cart".length());
                if (pathPart.startsWith("/")) pathPart = pathPart.substring(1);
                String pIdStr = !pathPart.isEmpty() ? pathPart : null;
                if (pIdStr == null) {
                    Map<String, String> query = parseQueryParams(exchange.getRequestURI().getQuery());
                    pIdStr = query.get("productId");
                }
                if (pIdStr == null || pIdStr.isEmpty()) {
                    cart.clear();
                    sendJsonResponse(exchange, 200, "{\"success\":true,\"message\":\"Cart cleared\"}");
                    return;
                }
                try {
                    int pId = Integer.parseInt(pIdStr);
                    boolean removed;
                    synchronized (cart) {
                        removed = cart.removeIf(it -> it.getProductId() == pId);
                    }
                    sendJsonResponse(exchange, 200, "{\"success\":" + removed + ",\"totalItems\":" + cart.size() + "}");
                } catch (NumberFormatException e) {
                    sendJsonResponse(exchange, 400, "{\"error\":\"Invalid product ID\"}");
                }
                return;
            }

            sendJsonResponse(exchange, 405, "{\"error\":\"Method not allowed\"}");
        }
    }

    static class OrderHandler implements HttpHandler {
        @Override
        public void handle(HttpExchange exchange) throws IOException {
            String method = exchange.getRequestMethod();
            String path = exchange.getRequestURI().getPath();

            if ("OPTIONS".equalsIgnoreCase(method)) {
                sendJsonResponse(exchange, 200, "{}");
                return;
            }

            if ("GET".equalsIgnoreCase(method)) {
                User user = getCurrentUser(exchange);
                if (user == null) {
                    sendJsonResponse(exchange, 401, "{\"error\":\"Authentication required to view orders\"}");
                    return;
                }

                List<Order> orders;
                if ("ADMIN".equalsIgnoreCase(user.getRole())) {
                    orders = orderDAO.getAllOrders();
                } else {
                    orders = orderDAO.getOrdersByUser(user.getUserId());
                }

                StringBuilder sb = new StringBuilder("[");
                for (int i = 0; i < orders.size(); i++) {
                    sb.append(orderToJson(orders.get(i)));
                    if (i < orders.size() - 1) sb.append(",");
                }
                sb.append("]");
                sendJsonResponse(exchange, 200, sb.toString());
                return;
            }

            if ("POST".equalsIgnoreCase(method)) {
                try {
                    String body = readRequestBody(exchange);
                    User user = getCurrentUser(exchange);
                    if (user == null) {
                        sendJsonResponse(exchange, 401, "{\"error\":\"Authentication required to place an order\"}");
                        return;
                    }

                    String name = extractJsonField(body, "shippingName");
                    String phone = extractJsonField(body, "shippingPhone");
                    String address = extractJsonField(body, "shippingAddress");
                    String pincode = extractJsonField(body, "shippingPincode");
                    String payment = extractJsonField(body, "paymentMethod");
                    String totalStr = extractJsonField(body, "totalAmount");
                    String discountStr = extractJsonField(body, "discountAmount");
                    String taxStr = extractJsonField(body, "taxAmount");
                    String shippingStr = extractJsonField(body, "shippingFee");
                    String finalStr = extractJsonField(body, "finalAmount");

                    String orderNum = extractJsonField(body, "orderNumber");
                    if (orderNum == null || orderNum.isEmpty()) {
                        orderNum = "ORD-2026-" + (int)(1000 + Math.random() * 9000);
                    }

                    Order order = new Order();
                    order.setOrderNumber(orderNum);
                    order.setUserId(user.getUserId());
                    order.setBuyerName(name != null ? name : user.getFullName());
                    order.setShippingName(name != null ? name : user.getFullName());
                    order.setShippingPhone(phone != null ? phone : (user.getPhone() != null ? user.getPhone() : "9876543220"));
                    order.setShippingAddress(address != null ? address : "Hostel Zone, IITM");
                    order.setShippingPincode(pincode != null ? pincode : "600113");
                    order.setPaymentMethod(payment != null ? payment : "COD");
                    order.setPaymentStatus("COD".equalsIgnoreCase(payment) ? "PENDING" : "COMPLETED");
                    order.setOrderStatus("CONFIRMED");
                    order.setTotalAmount(totalStr != null ? Double.parseDouble(totalStr) : 0);
                    order.setDiscountAmount(discountStr != null ? Double.parseDouble(discountStr) : 0);
                    order.setTaxAmount(taxStr != null ? Double.parseDouble(taxStr) : 0);
                    order.setShippingFee(shippingStr != null ? Double.parseDouble(shippingStr) : 0);
                    order.setFinalAmount(finalStr != null ? Double.parseDouble(finalStr) : 0);

                    List<OrderItem> items = parseOrderItems(extractJsonArray(body, "items"));
                    if (items.isEmpty()) {
                        // Fallback to session cart
                        String sId = getSessionId(exchange);
                        List<CartItem> sessionCart = sessionCarts.get(sId);
                        if (sessionCart != null && !sessionCart.isEmpty()) {
                            synchronized (sessionCart) {
                                for (CartItem ci : sessionCart) {
                                    items.add(new OrderItem(ci.getProductId(), ci.getName(), ci.getPrice(), ci.getQuantity()));
                                }
                            }
                        }
                    }

                    if (items.isEmpty()) {
                        sendJsonResponse(exchange, 400, "{\"error\":\"Cannot place an order with empty items\"}");
                        return;
                    }

                    for (OrderItem it : items) {
                        order.addItem(it);
                    }

                    orderDAO.placeOrder(order);
                    ActivityMonitor.log("ORDER", "ORDER_PLACED", user.getFullName(), "Placed new order " + order.getOrderNumber() + " (Total: ₹" + String.format("%.2f", order.getFinalAmount()) + ", Method: " + order.getPaymentMethod() + ")", "Order #" + order.getOrderNumber(), "success");

                    // Clear session cart upon successful transaction
                    String sId = getSessionId(exchange);
                    sessionCarts.remove(sId);

                    sendJsonResponse(exchange, 201, "{\"success\":true,\"order\":" + orderToJson(order) + "}");

                } catch (SQLException e) {
                    sendJsonResponse(exchange, 400, "{\"error\":\"Transaction rolled back: " + escapeJson(e.getMessage()) + "\"}");
                } catch (Exception e) {
                    sendJsonResponse(exchange, 400, "{\"error\":\"" + escapeJson(e.getMessage()) + "\"}");
                }
                return;
            }

            if ("PUT".equalsIgnoreCase(method)) {
                User user = getCurrentUser(exchange);
                if (user == null) {
                    sendJsonResponse(exchange, 401, "{\"error\":\"Authentication required\"}");
                    return;
                }
                if (!"ADMIN".equalsIgnoreCase(user.getRole()) && !"SELLER".equalsIgnoreCase(user.getRole())) {
                    sendJsonResponse(exchange, 403, "{\"error\":\"Forbidden: Only admins and sellers can update order status\"}");
                    return;
                }

                String body = readRequestBody(exchange);
                String newStatus = extractJsonField(body, "status");
                if (newStatus != null && path.contains("/status")) {
                    String[] parts = path.split("/");
                    String orderIdOrNum = parts[parts.length - 2];
                    boolean updated = orderDAO.updateOrderStatus(orderIdOrNum, newStatus);
                    if (updated) {
                        ActivityMonitor.log("ORDER", "STATUS_UPDATED", user.getFullName(), "Order " + orderIdOrNum + " status transitioned to " + newStatus, "Order #" + orderIdOrNum, "info");
                    }
                    sendJsonResponse(exchange, 200, "{\"success\":" + updated + "}");
                    return;
                }
            }

            sendJsonResponse(exchange, 405, "{\"error\":\"Method not allowed\"}");
        }
    }

    static class AdminUsersHandler implements HttpHandler {
        @Override
        public void handle(HttpExchange exchange) throws IOException {
            String method = exchange.getRequestMethod();
            String path = exchange.getRequestURI().getPath();

            if ("OPTIONS".equalsIgnoreCase(method)) {
                sendJsonResponse(exchange, 200, "{}");
                return;
            }

            User user = getCurrentUser(exchange);
            if (user == null || !"ADMIN".equalsIgnoreCase(user.getRole())) {
                sendJsonResponse(exchange, 403, "{\"error\":\"Access denied: Administrator privileges required.\"}");
                return;
            }

            if ("GET".equalsIgnoreCase(method)) {
                List<User> list = userDAO.listAll();
                StringBuilder sb = new StringBuilder("[");
                for (int i = 0; i < list.size(); i++) {
                    sb.append(userToJson(list.get(i)));
                    if (i < list.size() - 1) sb.append(",");
                }
                sb.append("]");
                sendJsonResponse(exchange, 200, sb.toString());
                return;
            }

            if ("POST".equalsIgnoreCase(method)) {
                String body = readRequestBody(exchange);
                String name = extractJsonField(body, "fullName");
                String email = extractJsonField(body, "email");
                String password = extractJsonField(body, "password");
                String phone = extractJsonField(body, "phone");
                String role = extractJsonField(body, "role");

                if (name == null || email == null || password == null) {
                    sendJsonResponse(exchange, 400, "{\"error\":\"Name, email, and password required\"}");
                    return;
                }

                User newUser = new User();
                newUser.setFullName(name);
                newUser.setEmail(email);
                newUser.setPassword(password);
                newUser.setPhone(phone != null ? phone : "9876543200");
                newUser.setRole(role != null ? role : "BUYER");
                newUser.setStatus("ACTIVE");

                boolean ok = userDAO.register(newUser);
                if (ok) {
                    ActivityMonitor.log("USER", "ADMIN_CREATED_USER", user.getFullName(), "Admin created new account: " + newUser.getFullName() + " (" + newUser.getRole() + ")", "User #" + newUser.getUserId(), "success");
                    sendJsonResponse(exchange, 201, userToJson(newUser));
                } else {
                    sendJsonResponse(exchange, 409, "{\"error\":\"User email already exists\"}");
                }
                return;
            }

            if ("PUT".equalsIgnoreCase(method)) {
                String body = readRequestBody(exchange);
                String[] parts = path.split("/");
                int userId = Integer.parseInt(parts[parts.length - 2]);
                String action = parts[parts.length - 1];

                if ("role".equalsIgnoreCase(action)) {
                    String newRole = extractJsonField(body, "role");
                    boolean updated = userDAO.updateRole(userId, newRole);
                    if (updated) {
                        ActivityMonitor.log("USER", "ROLE_UPDATED", user.getFullName(), "Updated user #" + userId + " role to " + newRole, "User #" + userId, "info");
                    }
                    sendJsonResponse(exchange, 200, "{\"success\":" + updated + "}");
                    return;
                } else if ("status".equalsIgnoreCase(action)) {
                    String status = extractJsonField(body, "status");
                    boolean updated = userDAO.updateStatus(userId, status);
                    if (updated) {
                        ActivityMonitor.log("USER", "STATUS_UPDATED", user.getFullName(), "Updated user #" + userId + " account status to " + status, "User #" + userId, "warning");
                    }
                    sendJsonResponse(exchange, 200, "{\"success\":" + updated + "}");
                    return;
                }
            }

            if ("DELETE".equalsIgnoreCase(method)) {
                String[] parts = path.split("/");
                int userId = Integer.parseInt(parts[parts.length - 1]);
                boolean deleted = userDAO.deleteUser(userId);
                if (deleted) {
                    ActivityMonitor.log("USER", "USER_DELETED", user.getFullName(), "Removed user account #" + userId + " from platform", "User #" + userId, "danger");
                }
                sendJsonResponse(exchange, 200, "{\"success\":" + deleted + "}");
                return;
            }

            sendJsonResponse(exchange, 405, "{\"error\":\"Method not allowed\"}");
        }
    }

    static class AdminStatsHandler implements HttpHandler {
        @Override
        public void handle(HttpExchange exchange) throws IOException {
            User user = getCurrentUser(exchange);
            if (user == null || !"ADMIN".equalsIgnoreCase(user.getRole())) {
                sendJsonResponse(exchange, 403, "{\"error\":\"Access denied: Administrator privileges required.\"}");
                return;
            }

            List<User> users = userDAO.listAll();
            List<Product> products = productDAO.getProducts(null, null, null, null, false, null);
            List<Order> orders = orderDAO.getAllOrders();

            double totalRevenue = 0;
            for (Order o : orders) {
                if (!"CANCELLED".equalsIgnoreCase(o.getOrderStatus())) {
                    totalRevenue += o.getFinalAmount();
                }
            }

            List<String> lowStockAlerts = inventoryMonitor != null ? inventoryMonitor.getLowStockAlerts() : Collections.emptyList();
            StringBuilder alertsJson = new StringBuilder("[");
            for (int i = 0; i < lowStockAlerts.size(); i++) {
                alertsJson.append("\"").append(escapeJson(lowStockAlerts.get(i))).append("\"");
                if (i < lowStockAlerts.size() - 1) alertsJson.append(",");
            }
            alertsJson.append("]");

            String json = String.format(
                "{\"totalUsers\":%d,\"totalProducts\":%d,\"totalOrders\":%d,\"grossRevenue\":%.2f,\"dbStatus\":\"%s\",\"lowStockAlerts\":%s}",
                users.size(), products.size(), orders.size(), totalRevenue,
                DBConnection.isMySQLAvailable() ? "MySQL 8.0 (Live Connected)" : "In-Memory JDBC Store (Ready)",
                alertsJson.toString()
            );
            sendJsonResponse(exchange, 200, json);
        }
    }

    static class AdminActivitiesHandler implements HttpHandler {
        @Override
        public void handle(HttpExchange exchange) throws IOException {
            String method = exchange.getRequestMethod();

            if ("OPTIONS".equalsIgnoreCase(method)) {
                sendJsonResponse(exchange, 200, "{}");
                return;
            }

            User user = getCurrentUser(exchange);
            if (user == null || !"ADMIN".equalsIgnoreCase(user.getRole())) {
                sendJsonResponse(exchange, 403, "{\"error\":\"Access denied: Administrator privileges required.\"}");
                return;
            }

            if ("GET".equalsIgnoreCase(method)) {
                Map<String, String> query = parseQueryParams(exchange.getRequestURI().getQuery());
                int limit = 100;
                if (query.containsKey("limit")) {
                    try { limit = Integer.parseInt(query.get("limit")); } catch (Exception ignored) {}
                }
                List<ActivityMonitor.ActivityEvent> list = ActivityMonitor.getRecentEvents(limit);
                StringBuilder sb = new StringBuilder("[");
                for (int i = 0; i < list.size(); i++) {
                    sb.append(list.get(i).toJson());
                    if (i < list.size() - 1) sb.append(",");
                }
                sb.append("]");
                sendJsonResponse(exchange, 200, sb.toString());
                return;
            }

            if ("POST".equalsIgnoreCase(method)) {
                String body = readRequestBody(exchange);
                String type = extractJsonField(body, "type");
                String action = extractJsonField(body, "action");
                String actor = extractJsonField(body, "actor");
                String description = extractJsonField(body, "description");
                String details = extractJsonField(body, "details");
                String severity = extractJsonField(body, "severity");

                ActivityMonitor.log(
                    type != null ? type : "SYSTEM",
                    action != null ? action : "CUSTOM_EVENT",
                    actor != null ? actor : user.getFullName(),
                    description != null ? description : "System activity recorded",
                    details != null ? details : "Platform Event",
                    severity != null ? severity : "info"
                );
                sendJsonResponse(exchange, 201, "{\"success\":true}");
                return;
            }

            if ("DELETE".equalsIgnoreCase(method)) {
                ActivityMonitor.clear();
                sendJsonResponse(exchange, 200, "{\"success\":true,\"message\":\"Activity logs cleared\"}");
                return;
            }

            sendJsonResponse(exchange, 405, "{\"error\":\"Method not allowed\"}");
        }
    }

    static class StaticFileHandler implements HttpHandler {
        @Override
        public void handle(HttpExchange exchange) throws IOException {
            String path = exchange.getRequestURI().getPath();
            if (path.equals("/")) {
                path = "/index.html";
            }

            Path filePath = Paths.get("frontend" + path).normalize();
            if (!Files.exists(filePath) || Files.isDirectory(filePath)) {
                filePath = Paths.get("../frontend" + path).normalize();
            }
            if (!Files.exists(filePath) || Files.isDirectory(filePath)) {
                filePath = Paths.get("database" + path).normalize();
            }
            if (!Files.exists(filePath) || Files.isDirectory(filePath)) {
                filePath = Paths.get("../database" + path).normalize();
            }
            if (!Files.exists(filePath) || Files.isDirectory(filePath)) {
                filePath = Paths.get("." + path).normalize();
            }

            if (!Files.exists(filePath) || Files.isDirectory(filePath)) {
                String notFound = "<html><body><h2>404 Not Found</h2><p>Page does not exist.</p><a href='/'>Go to Cartivo Store</a></body></html>";
                byte[] bytes = notFound.getBytes(StandardCharsets.UTF_8);
                exchange.getResponseHeaders().set("Content-Type", "text/html; charset=UTF-8");
                exchange.sendResponseHeaders(404, bytes.length);
                try (OutputStream os = exchange.getResponseBody()) { os.write(bytes); }
                return;
            }

            String contentType = "text/plain";
            String fn = filePath.getFileName().toString().toLowerCase();
            if (fn.endsWith(".html")) contentType = "text/html; charset=UTF-8";
            else if (fn.endsWith(".css")) contentType = "text/css; charset=UTF-8";
            else if (fn.endsWith(".js")) contentType = "application/javascript; charset=UTF-8";
            else if (fn.endsWith(".json")) contentType = "application/json; charset=UTF-8";
            else if (fn.endsWith(".sql")) contentType = "text/plain; charset=UTF-8";
            else if (fn.endsWith(".png")) contentType = "image/png";
            else if (fn.endsWith(".jpg") || fn.endsWith(".jpeg")) contentType = "image/jpeg";
            else if (fn.endsWith(".svg")) contentType = "image/svg+xml";
            else if (fn.endsWith(".ico")) contentType = "image/x-icon";

            byte[] fileBytes = Files.readAllBytes(filePath);
            exchange.getResponseHeaders().set("Content-Type", contentType);
            exchange.sendResponseHeaders(200, fileBytes.length);
            try (OutputStream os = exchange.getResponseBody()) {
                os.write(fileBytes);
            }
        }
    }
}
