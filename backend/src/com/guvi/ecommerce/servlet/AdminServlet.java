package com.guvi.ecommerce.servlet;

import com.guvi.ecommerce.dao.OrderDAO;
import com.guvi.ecommerce.dao.ProductDAO;
import com.guvi.ecommerce.dao.UserDAO;
import com.guvi.ecommerce.model.Order;
import com.guvi.ecommerce.model.Product;
import com.guvi.ecommerce.model.User;
import com.guvi.ecommerce.servlet.base.HttpServlet;
import com.guvi.ecommerce.servlet.base.HttpServletRequest;
import com.guvi.ecommerce.servlet.base.HttpServletResponse;
import com.guvi.ecommerce.servlet.base.HttpSession;

import java.io.IOException;
import java.util.List;

/**
 * Servlet for administrator operations with strict role authorization guards.
 * Implements User moderation, Catalog overview, and Order status management.
 */
public class AdminServlet extends HttpServlet {

    private final UserDAO userDAO = new UserDAO();
    private final ProductDAO productDAO = new ProductDAO();
    private final OrderDAO orderDAO = new OrderDAO();

    private boolean checkAdmin(HttpServletRequest request, HttpServletResponse response) throws IOException {
        HttpSession session = request.getSession(false);
        if (session == null || session.getAttribute("currentUser") == null) {
            response.setStatus(401);
            response.getWriter().write("{\"error\":\"Authentication required for admin access.\"}");
            return false;
        }
        User u = (User) session.getAttribute("currentUser");
        if (!"ADMIN".equalsIgnoreCase(u.getRole())) {
            response.setStatus(403);
            response.getWriter().write("{\"error\":\"Forbidden: Administrator privileges required.\"}");
            return false;
        }
        return true;
    }

    @Override
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setContentType("application/json");
        if (!checkAdmin(request, response)) return;

        String path = request.getPathInfo();
        if (path == null || path.equals("/") || path.equals("/stats")) {
            List<User> users = userDAO.listAll();
            List<Product> products = productDAO.getProducts(null, null, null, null, false, null);
            List<Order> orders = orderDAO.getAllOrders();

            double revenue = 0;
            for (Order o : orders) {
                if (!"CANCELLED".equalsIgnoreCase(o.getOrderStatus())) {
                    revenue += o.getFinalAmount();
                }
            }

            response.setStatus(200);
            response.getWriter().write(String.format(
                "{\"totalUsers\":%d,\"totalProducts\":%d,\"totalOrders\":%d,\"grossRevenue\":%.2f,\"dbStatus\":\"%s\"}",
                users.size(), products.size(), orders.size(), revenue,
                com.guvi.ecommerce.dao.DBConnection.isMySQLAvailable() ? "MySQL 8.0 (Live Connected)" : "In-Memory JDBC Store (Ready)"
            ));
        } else if (path.equals("/users")) {
            List<User> users = userDAO.listAll();
            StringBuilder sb = new StringBuilder("[");
            for (int i = 0; i < users.size(); i++) {
                User u = users.get(i);
                sb.append(String.format(
                    "{\"userId\":%d,\"fullName\":\"%s\",\"email\":\"%s\",\"phone\":\"%s\",\"role\":\"%s\",\"status\":\"%s\"}",
                    u.getUserId(), u.getFullName().replace("\"", "\\\""), u.getEmail(), u.getPhone(), u.getRole(), u.getStatus()
                ));
                if (i < users.size() - 1) sb.append(",");
            }
            sb.append("]");
            response.setStatus(200);
            response.getWriter().write(sb.toString());
        } else {
            response.sendError(404, "Endpoint not found");
        }
    }

    @Override
    public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setContentType("application/json");
        if (!checkAdmin(request, response)) return;

        String action = request.getParameter("action");
        if ("updateOrderStatus".equals(action)) {
            String orderIdStr = request.getParameter("orderId");
            String status = request.getParameter("status");
            if (orderIdStr != null && status != null) {
                boolean ok = orderDAO.updateOrderStatus(orderIdStr, status);
                response.setStatus(200);
                response.getWriter().write("{\"success\":" + ok + "}");
                return;
            }
        } else if ("toggleUserStatus".equals(action)) {
            String userIdStr = request.getParameter("userId");
            String status = request.getParameter("status");
            if (userIdStr != null && status != null) {
                int id = Integer.parseInt(userIdStr);
                boolean ok = userDAO.updateStatus(id, status);
                response.setStatus(200);
                response.getWriter().write("{\"success\":" + ok + "}");
                return;
            }
        } else if ("updateUserRole".equals(action)) {
            String userIdStr = request.getParameter("userId");
            String role = request.getParameter("role");
            if (userIdStr != null && role != null) {
                int id = Integer.parseInt(userIdStr);
                boolean ok = userDAO.updateRole(id, role);
                response.setStatus(200);
                response.getWriter().write("{\"success\":" + ok + "}");
                return;
            }
        } else if ("deleteUser".equals(action)) {
            String userIdStr = request.getParameter("userId");
            if (userIdStr != null) {
                int id = Integer.parseInt(userIdStr);
                boolean ok = userDAO.deleteUser(id);
                response.setStatus(200);
                response.getWriter().write("{\"success\":" + ok + "}");
                return;
            }
        }

        response.setStatus(400);
        response.getWriter().write("{\"error\":\"Invalid admin action.\"}");
    }
}
