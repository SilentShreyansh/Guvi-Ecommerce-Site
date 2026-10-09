package com.guvi.ecommerce.dao;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class DBConnection {

    private static final String URL = System.getProperty("db.url", "jdbc:mysql://localhost:3306/guvi_ecommerce?useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=UTC");
    private static final String USER = System.getProperty("db.user", "root");
    private static final String PASSWORD = System.getProperty("db.password", "root");

    private static boolean driverLoaded = false;
    private static boolean mysqlAvailable = false;

    static {
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            driverLoaded = true;
        } catch (ClassNotFoundException e) {
            driverLoaded = false;
        }
    }

    public static Connection getConnection() {
        if (!driverLoaded) {
            return null;
        }
        try {
            Connection conn = DriverManager.getConnection(URL, USER, PASSWORD);
            mysqlAvailable = true;
            return conn;
        } catch (SQLException e) {
            mysqlAvailable = false;
            return null;
        }
    }

    public static boolean isDriverLoaded() {
        return driverLoaded;
    }

    public static boolean isMySQLAvailable() {
        if (!driverLoaded) return false;
        try (Connection c = DriverManager.getConnection(URL, USER, PASSWORD)) {
            return c != null && !c.isClosed();
        } catch (Exception e) {
            return false;
        }
    }

    public static void closeConnection(Connection conn) {
        if (conn != null) {
            try {
                conn.close();
            } catch (SQLException ignored) {}
        }
    }
}
