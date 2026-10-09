package com.guvi.ecommerce.dao;

import com.guvi.ecommerce.model.User;
import com.guvi.ecommerce.util.PasswordUtil;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicInteger;

public class UserDAO {

    private static final Map<Integer, User> memoryUsers = new ConcurrentHashMap<>();
    private static final AtomicInteger idGenerator = new AtomicInteger(10);

    static {
        seed(new User(1, "System Administrator", "admin@guvi.in", "admin123", "9876543210", "ADMIN", "ACTIVE"));
        seed(new User(2, "Campus Tech Store", "seller.tech@guvi.in", "seller123", "9876543211", "SELLER", "ACTIVE"));
        seed(new User(3, "Stationery & Books Hub", "seller.books@guvi.in", "seller123", "9876543212", "SELLER", "ACTIVE"));
        seed(new User(4, "Rahul Sharma", "rahul.s@student.guvi.in", "student123", "9876543220", "BUYER", "ACTIVE"));
        seed(new User(5, "Ananya Iyer", "ananya.i@student.guvi.in", "student123", "9876543221", "BUYER", "ACTIVE"));
    }

    private static void seed(User u) {
        u.setAddressStreet("Hostel Zone, IITM Research Park");
        u.setAddressCity("Chennai");
        u.setAddressState("Tamil Nadu");
        u.setAddressPincode("600113");
        u.setCreatedAt(new Timestamp(System.currentTimeMillis()));
        memoryUsers.put(u.getUserId(), u);
    }

    public User authenticate(String email, String password) {
        if (email == null || password == null) return null;
        Connection conn = DBConnection.getConnection();
        if (conn != null) {
            String sql = "SELECT * FROM users WHERE email = ? AND status = 'ACTIVE'";
            try (PreparedStatement stmt = conn.prepareStatement(sql)) {
                stmt.setString(1, email);
                try (ResultSet rs = stmt.executeQuery()) {
                    if (rs.next()) {
                        String storedHash = rs.getString("password_hash");
                        if (PasswordUtil.verify(password, storedHash)) {
                            return mapResultSetToUser(rs);
                        }
                    }
                }
            } catch (SQLException e) {
                System.err.println("JDBC Error in authenticate: " + e.getMessage());
            } finally {
                DBConnection.closeConnection(conn);
            }
        }

        for (User u : memoryUsers.values()) {
            if (u.getEmail().equalsIgnoreCase(email) && PasswordUtil.verify(password, u.getPassword()) && "ACTIVE".equalsIgnoreCase(u.getStatus())) {
                return u;
            }
        }
        return null;
    }

    public boolean register(User user) {
        if (user == null || user.getEmail() == null || user.getPassword() == null) return false;
        String hashedPassword = PasswordUtil.hash(user.getPassword());
        user.setPassword(hashedPassword);

        Connection conn = DBConnection.getConnection();
        if (conn != null) {
            String sql = "INSERT INTO users (full_name, email, password_hash, phone, role, status, address_street, address_city, address_state, address_pincode) " +
                         "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
            try (PreparedStatement stmt = conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)) {
                stmt.setString(1, user.getFullName());
                stmt.setString(2, user.getEmail());
                stmt.setString(3, hashedPassword);
                stmt.setString(4, user.getPhone());
                stmt.setString(5, user.getRole() != null ? user.getRole() : "BUYER");
                stmt.setString(6, "ACTIVE");
                stmt.setString(7, user.getAddressStreet());
                stmt.setString(8, user.getAddressCity());
                stmt.setString(9, user.getAddressState());
                stmt.setString(10, user.getAddressPincode());

                int affected = stmt.executeUpdate();
                if (affected > 0) {
                    try (ResultSet rs = stmt.getGeneratedKeys()) {
                        if (rs.next()) {
                            user.setUserId(rs.getInt(1));
                        }
                    }
                    return true;
                }
            } catch (SQLException e) {
                System.err.println("JDBC Error in register: " + e.getMessage());
            } finally {
                DBConnection.closeConnection(conn);
            }
        }

        for (User u : memoryUsers.values()) {
            if (u.getEmail().equalsIgnoreCase(user.getEmail())) {
                return false;
            }
        }
        int newId = idGenerator.incrementAndGet();
        user.setUserId(newId);
        user.setStatus("ACTIVE");
        if (user.getRole() == null || user.getRole().isEmpty()) user.setRole("BUYER");
        user.setCreatedAt(new Timestamp(System.currentTimeMillis()));
        memoryUsers.put(newId, user);
        return true;
    }

    public User findById(int userId) {
        Connection conn = DBConnection.getConnection();
        if (conn != null) {
            String sql = "SELECT * FROM users WHERE user_id = ?";
            try (PreparedStatement stmt = conn.prepareStatement(sql)) {
                stmt.setInt(1, userId);
                try (ResultSet rs = stmt.executeQuery()) {
                    if (rs.next()) return mapResultSetToUser(rs);
                }
            } catch (SQLException e) {
                System.err.println("JDBC Error in findById: " + e.getMessage());
            } finally {
                DBConnection.closeConnection(conn);
            }
        }
        return memoryUsers.get(userId);
    }

    public List<User> listAll() {
        Connection conn = DBConnection.getConnection();
        if (conn != null) {
            List<User> list = new ArrayList<>();
            String sql = "SELECT * FROM users ORDER BY user_id ASC";
            try (PreparedStatement stmt = conn.prepareStatement(sql);
                 ResultSet rs = stmt.executeQuery()) {
                while (rs.next()) {
                    list.add(mapResultSetToUser(rs));
                }
                return list;
            } catch (SQLException e) {
                System.err.println("JDBC Error in listAll: " + e.getMessage());
            } finally {
                DBConnection.closeConnection(conn);
            }
        }
        return new ArrayList<>(memoryUsers.values());
    }

    public boolean updateRole(int userId, String newRole) {
        Connection conn = DBConnection.getConnection();
        if (conn != null) {
            String sql = "UPDATE users SET role = ? WHERE user_id = ?";
            try (PreparedStatement stmt = conn.prepareStatement(sql)) {
                stmt.setString(1, newRole);
                stmt.setInt(2, userId);
                return stmt.executeUpdate() > 0;
            } catch (SQLException e) {
                System.err.println("JDBC Error in updateRole: " + e.getMessage());
            } finally {
                DBConnection.closeConnection(conn);
            }
        }
        User u = memoryUsers.get(userId);
        if (u != null) {
            u.setRole(newRole);
            return true;
        }
        return false;
    }

    public boolean updateStatus(int userId, String status) {
        Connection conn = DBConnection.getConnection();
        if (conn != null) {
            String sql = "UPDATE users SET status = ? WHERE user_id = ?";
            try (PreparedStatement stmt = conn.prepareStatement(sql)) {
                stmt.setString(1, status);
                stmt.setInt(2, userId);
                return stmt.executeUpdate() > 0;
            } catch (SQLException e) {
                System.err.println("JDBC Error in updateStatus: " + e.getMessage());
            } finally {
                DBConnection.closeConnection(conn);
            }
        }
        User u = memoryUsers.get(userId);
        if (u != null) {
            u.setStatus(status);
            return true;
        }
        return false;
    }

    public boolean deleteUser(int userId) {
        Connection conn = DBConnection.getConnection();
        if (conn != null) {
            String sql = "DELETE FROM users WHERE user_id = ?";
            try (PreparedStatement stmt = conn.prepareStatement(sql)) {
                stmt.setInt(1, userId);
                return stmt.executeUpdate() > 0;
            } catch (SQLException e) {
                System.err.println("JDBC Error in deleteUser: " + e.getMessage());
            } finally {
                DBConnection.closeConnection(conn);
            }
        }
        return memoryUsers.remove(userId) != null;
    }

    public boolean updateUser(User user) {
        if (user == null || user.getUserId() <= 0) return false;
        Connection conn = DBConnection.getConnection();
        if (conn != null) {
            String sql = "UPDATE users SET full_name = ?, phone = ?, address_street = ?, address_city = ?, " +
                         "address_state = ?, address_pincode = ? WHERE user_id = ?";
            try (PreparedStatement stmt = conn.prepareStatement(sql)) {
                stmt.setString(1, user.getFullName());
                stmt.setString(2, user.getPhone());
                stmt.setString(3, user.getAddressStreet());
                stmt.setString(4, user.getAddressCity());
                stmt.setString(5, user.getAddressState());
                stmt.setString(6, user.getAddressPincode());
                stmt.setInt(7, user.getUserId());
                return stmt.executeUpdate() > 0;
            } catch (SQLException e) {
                System.err.println("JDBC Error in updateUser: " + e.getMessage());
            } finally {
                DBConnection.closeConnection(conn);
            }
        }
        User existing = memoryUsers.get(user.getUserId());
        if (existing != null) {
            existing.setFullName(user.getFullName());
            existing.setPhone(user.getPhone());
            existing.setAddressStreet(user.getAddressStreet());
            existing.setAddressCity(user.getAddressCity());
            existing.setAddressState(user.getAddressState());
            existing.setAddressPincode(user.getAddressPincode());
            return true;
        }
        return false;
    }

    private User mapResultSetToUser(ResultSet rs) throws SQLException {
        User u = new User();
        u.setUserId(rs.getInt("user_id"));
        u.setFullName(rs.getString("full_name"));
        u.setEmail(rs.getString("email"));
        u.setPhone(rs.getString("phone"));
        u.setRole(rs.getString("role"));
        u.setStatus(rs.getString("status"));
        u.setAddressStreet(rs.getString("address_street"));
        u.setAddressCity(rs.getString("address_city"));
        u.setAddressState(rs.getString("address_state"));
        u.setAddressPincode(rs.getString("address_pincode"));
        u.setCreatedAt(rs.getTimestamp("created_at"));
        return u;
    }
}
