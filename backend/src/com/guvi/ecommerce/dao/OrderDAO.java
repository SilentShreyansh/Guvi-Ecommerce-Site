package com.guvi.ecommerce.dao;

import com.guvi.ecommerce.model.Order;
import com.guvi.ecommerce.model.OrderItem;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.stream.Collectors;

public class OrderDAO {

    private static final Map<Integer, Order> memoryOrders = new ConcurrentHashMap<>();
    private static final AtomicInteger orderIdGen = new AtomicInteger(100);

    static {
        Order o1 = new Order();
        o1.setOrderId(1);
        o1.setOrderNumber("ORD-2026-1001");
        o1.setUserId(4);
        o1.setBuyerName("Rahul Sharma");
        o1.setTotalAmount(1148.00);
        o1.setDiscountAmount(100.00);
        o1.setTaxAmount(52.40);
        o1.setShippingFee(0.00);
        o1.setFinalAmount(1100.40);
        o1.setPaymentMethod("UPI");
        o1.setPaymentStatus("COMPLETED");
        o1.setOrderStatus("DELIVERED");
        o1.setShippingName("Rahul Sharma");
        o1.setShippingPhone("9876543220");
        o1.setShippingAddress("Room 204, Kaveri Hostel, IITM Campus");
        o1.setShippingPincode("600113");
        o1.setCreatedAt(new Timestamp(System.currentTimeMillis() - 86400000L * 3));
        o1.addItem(new OrderItem(1, "Logitech B100 Optical USB Mouse", 349.00, 1));
        o1.addItem(new OrderItem(2, "SanDisk Ultra 128GB USB 3.0 Flash Drive", 799.00, 1));
        memoryOrders.put(1, o1);

        Order o2 = new Order();
        o2.setOrderId(2);
        o2.setOrderNumber("ORD-2026-1002");
        o2.setUserId(4);
        o2.setBuyerName("Rahul Sharma");
        o2.setTotalAmount(1450.00);
        o2.setDiscountAmount(0.00);
        o2.setTaxAmount(72.50);
        o2.setShippingFee(0.00);
        o2.setFinalAmount(1522.50);
        o2.setPaymentMethod("COD");
        o2.setPaymentStatus("PENDING");
        o2.setOrderStatus("CONFIRMED");
        o2.setShippingName("Rahul Sharma");
        o2.setShippingPhone("9876543220");
        o2.setShippingAddress("Room 204, Kaveri Hostel, IITM Campus");
        o2.setShippingPincode("600113");
        o2.setCreatedAt(new Timestamp(System.currentTimeMillis() - 86400000L * 1));
        o2.addItem(new OrderItem(11, "Arduino Uno R3 Starter Kit with Breadboard", 1450.00, 1));
        memoryOrders.put(2, o2);

        Order o3 = new Order();
        o3.setOrderId(3);
        o3.setOrderNumber("ORD-2026-1003");
        o3.setUserId(5);
        o3.setBuyerName("Ananya Iyer");
        o3.setTotalAmount(2499.00);
        o3.setDiscountAmount(200.00);
        o3.setTaxAmount(114.95);
        o3.setShippingFee(0.00);
        o3.setFinalAmount(2413.95);
        o3.setPaymentMethod("NET_BANKING");
        o3.setPaymentStatus("COMPLETED");
        o3.setOrderStatus("SHIPPED");
        o3.setShippingName("Ananya Iyer");
        o3.setShippingPhone("9876543221");
        o3.setShippingAddress("Room 112, Ganga Hostel, IITM Campus");
        o3.setShippingPincode("600113");
        o3.setCreatedAt(new Timestamp(System.currentTimeMillis() - 43200000L));
        o3.addItem(new OrderItem(3, "TVS-e Bharat Gold Mechanical Keyboard", 2499.00, 1));
        memoryOrders.put(3, o3);

        Order o4 = new Order();
        o4.setOrderId(4);
        o4.setOrderNumber("ORD-2026-1004");
        o4.setUserId(4);
        o4.setBuyerName("Rahul Sharma");
        o4.setTotalAmount(5499.00);
        o4.setDiscountAmount(549.90);
        o4.setTaxAmount(247.45);
        o4.setShippingFee(0.00);
        o4.setFinalAmount(5196.55);
        o4.setPaymentMethod("UPI");
        o4.setPaymentStatus("COMPLETED");
        o4.setOrderStatus("OUT_FOR_DELIVERY");
        o4.setShippingName("Rahul Sharma");
        o4.setShippingPhone("9876543220");
        o4.setShippingAddress("Room 204, Kaveri Hostel, IITM Campus");
        o4.setShippingPincode("600113");
        o4.setCreatedAt(new Timestamp(System.currentTimeMillis() - 14400000L));
        o4.addItem(new OrderItem(10, "Raspberry Pi 4 Model B (4GB RAM)", 5499.00, 1));
        memoryOrders.put(4, o4);
    }

    public boolean placeOrder(Order order) throws SQLException {
        Connection conn = DBConnection.getConnection();
        if (conn != null) {
            try {
                conn.setAutoCommit(false);

                String orderSql = "INSERT INTO orders (order_number, user_id, total_amount, discount_amount, tax_amount, " +
                                  "shipping_fee, final_amount, payment_method, payment_status, order_status, " +
                                  "shipping_name, shipping_phone, shipping_address, shipping_pincode) " +
                                  "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

                int generatedOrderId = -1;
                try (PreparedStatement orderStmt = conn.prepareStatement(orderSql, Statement.RETURN_GENERATED_KEYS)) {
                    orderStmt.setString(1, order.getOrderNumber());
                    orderStmt.setInt(2, order.getUserId());
                    orderStmt.setDouble(3, order.getTotalAmount());
                    orderStmt.setDouble(4, order.getDiscountAmount());
                    orderStmt.setDouble(5, order.getTaxAmount());
                    orderStmt.setDouble(6, order.getShippingFee());
                    orderStmt.setDouble(7, order.getFinalAmount());
                    orderStmt.setString(8, order.getPaymentMethod());
                    orderStmt.setString(9, order.getPaymentStatus());
                    orderStmt.setString(10, order.getOrderStatus() != null ? order.getOrderStatus() : "PLACED");
                    orderStmt.setString(11, order.getShippingName());
                    orderStmt.setString(12, order.getShippingPhone());
                    orderStmt.setString(13, order.getShippingAddress());
                    orderStmt.setString(14, order.getShippingPincode());

                    orderStmt.executeUpdate();
                    try (ResultSet rs = orderStmt.getGeneratedKeys()) {
                        if (rs.next()) {
                            generatedOrderId = rs.getInt(1);
                            order.setOrderId(generatedOrderId);
                        }
                    }
                }

                String itemSql = "INSERT INTO order_items (order_id, product_id, product_name, unit_price, quantity, line_total) " +
                                 "VALUES (?, ?, ?, ?, ?, ?)";
                String stockSql = "UPDATE products SET stock_quantity = stock_quantity - ? WHERE product_id = ? AND stock_quantity >= ?";

                try (PreparedStatement itemStmt = conn.prepareStatement(itemSql);
                     PreparedStatement stockStmt = conn.prepareStatement(stockSql)) {

                    for (OrderItem item : order.getItems()) {
                        stockStmt.setInt(1, item.getQuantity());
                        stockStmt.setInt(2, item.getProductId());
                        stockStmt.setInt(3, item.getQuantity());
                        int stockUpdated = stockStmt.executeUpdate();
                        if (stockUpdated == 0) {
                            throw new SQLException("Insufficient stock for product ID: " + item.getProductId());
                        }

                        itemStmt.setInt(1, generatedOrderId);
                        itemStmt.setInt(2, item.getProductId());
                        itemStmt.setString(3, item.getProductName());
                        itemStmt.setDouble(4, item.getUnitPrice());
                        itemStmt.setInt(5, item.getQuantity());
                        itemStmt.setDouble(6, item.getLineTotal());
                        itemStmt.addBatch();
                    }
                    itemStmt.executeBatch();
                }

                conn.commit();
                return true;

            } catch (SQLException e) {
                if (conn != null) {
                    try {
                        conn.rollback();
                        System.err.println("Transaction rolled back: " + e.getMessage());
                    } catch (SQLException ex) {
                        System.err.println("Rollback failed: " + ex.getMessage());
                    }
                }
                throw e;
            } finally {
                if (conn != null) {
                    try {
                        conn.setAutoCommit(true);
                        conn.close();
                    } catch (SQLException ignored) {}
                }
            }
        }

        ProductDAO productDAO = new ProductDAO();
        for (OrderItem item : order.getItems()) {
            com.guvi.ecommerce.model.Product p = productDAO.getProductById(item.getProductId());
            if (p == null || p.getStockQuantity() < item.getQuantity()) {
                throw new SQLException("Insufficient stock in inventory for: " + item.getProductName());
            }
        }
        for (OrderItem item : order.getItems()) {
            productDAO.updateStock(item.getProductId(), item.getQuantity());
        }

        int newId = orderIdGen.incrementAndGet();
        order.setOrderId(newId);
        order.setCreatedAt(new Timestamp(System.currentTimeMillis()));
        memoryOrders.put(newId, order);
        return true;
    }

    public List<Order> getOrdersByUser(int userId) {
        Connection conn = DBConnection.getConnection();
        if (conn != null) {
            List<Order> list = new ArrayList<>();
            String sql = "SELECT * FROM orders WHERE user_id = ? ORDER BY order_id DESC";
            try (PreparedStatement stmt = conn.prepareStatement(sql)) {
                stmt.setInt(1, userId);
                try (ResultSet rs = stmt.executeQuery()) {
                    while (rs.next()) {
                        Order o = mapResultSetToOrder(rs);
                        loadOrderItems(conn, o);
                        list.add(o);
                    }
                    return list;
                }
            } catch (SQLException e) {
                System.err.println("JDBC Error in getOrdersByUser: " + e.getMessage());
            } finally {
                DBConnection.closeConnection(conn);
            }
        }

        return memoryOrders.values().stream()
            .filter(o -> o.getUserId() == userId)
            .sorted((a, b) -> Integer.compare(b.getOrderId(), a.getOrderId()))
            .collect(Collectors.toList());
    }

    public List<Order> getAllOrders() {
        Connection conn = DBConnection.getConnection();
        if (conn != null) {
            List<Order> list = new ArrayList<>();
            String sql = "SELECT o.*, u.full_name as buyer_name FROM orders o JOIN users u ON o.user_id = u.user_id ORDER BY o.order_id DESC";
            try (PreparedStatement stmt = conn.prepareStatement(sql);
                 ResultSet rs = stmt.executeQuery()) {
                while (rs.next()) {
                    Order o = mapResultSetToOrder(rs);
                    try { o.setBuyerName(rs.getString("buyer_name")); } catch (Exception ignored) {}
                    loadOrderItems(conn, o);
                    list.add(o);
                }
                return list;
            } catch (SQLException e) {
                System.err.println("JDBC Error in getAllOrders: " + e.getMessage());
            } finally {
                DBConnection.closeConnection(conn);
            }
        }

        return memoryOrders.values().stream()
            .sorted((a, b) -> Integer.compare(b.getOrderId(), a.getOrderId()))
            .collect(Collectors.toList());
    }

    public boolean updateOrderStatus(int orderId, String newStatus) {
        return updateOrderStatus(String.valueOf(orderId), newStatus);
    }

    public boolean updateOrderStatus(String orderIdOrNumber, String newStatus) {
        if (orderIdOrNumber == null || newStatus == null) return false;
        int numericId = -1;
        try {
            numericId = Integer.parseInt(orderIdOrNumber);
        } catch (NumberFormatException ignored) {}

        Connection conn = DBConnection.getConnection();
        if (conn != null) {
            String sql = "UPDATE orders SET order_status = ? WHERE order_id = ? OR order_number = ?";
            try (PreparedStatement stmt = conn.prepareStatement(sql)) {
                stmt.setString(1, newStatus);
                stmt.setInt(2, numericId);
                stmt.setString(3, orderIdOrNumber);
                return stmt.executeUpdate() > 0;
            } catch (SQLException e) {
                System.err.println("JDBC Error in updateOrderStatus: " + e.getMessage());
            } finally {
                DBConnection.closeConnection(conn);
            }
        }

        if (numericId > 0 && memoryOrders.containsKey(numericId)) {
            memoryOrders.get(numericId).setOrderStatus(newStatus);
            return true;
        }
        for (Order o : memoryOrders.values()) {
            if (orderIdOrNumber.equalsIgnoreCase(o.getOrderNumber())) {
                o.setOrderStatus(newStatus);
                return true;
            }
        }
        return false;
    }

    private void loadOrderItems(Connection conn, Order order) {
        String sql = "SELECT * FROM order_items WHERE order_id = ?";
        try (PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setInt(1, order.getOrderId());
            try (ResultSet rs = stmt.executeQuery()) {
                while (rs.next()) {
                    OrderItem item = new OrderItem();
                    item.setItemId(rs.getInt("item_id"));
                    item.setOrderId(rs.getInt("order_id"));
                    item.setProductId(rs.getInt("product_id"));
                    item.setProductName(rs.getString("product_name"));
                    item.setUnitPrice(rs.getDouble("unit_price"));
                    item.setQuantity(rs.getInt("quantity"));
                    item.setLineTotal(rs.getDouble("line_total"));
                    order.addItem(item);
                }
            }
        } catch (SQLException ignored) {}
    }

    private Order mapResultSetToOrder(ResultSet rs) throws SQLException {
        Order o = new Order();
        o.setOrderId(rs.getInt("order_id"));
        o.setOrderNumber(rs.getString("order_number"));
        o.setUserId(rs.getInt("user_id"));
        o.setTotalAmount(rs.getDouble("total_amount"));
        o.setDiscountAmount(rs.getDouble("discount_amount"));
        o.setTaxAmount(rs.getDouble("tax_amount"));
        o.setShippingFee(rs.getDouble("shipping_fee"));
        o.setFinalAmount(rs.getDouble("final_amount"));
        o.setPaymentMethod(rs.getString("payment_method"));
        o.setPaymentStatus(rs.getString("payment_status"));
        o.setOrderStatus(rs.getString("order_status"));
        o.setShippingName(rs.getString("shipping_name"));
        o.setShippingPhone(rs.getString("shipping_phone"));
        o.setShippingAddress(rs.getString("shipping_address"));
        o.setShippingPincode(rs.getString("shipping_pincode"));
        o.setCreatedAt(rs.getTimestamp("created_at"));
        return o;
    }
}
