package com.guvi.ecommerce.servlet;

import com.guvi.ecommerce.dao.OrderDAO;
import com.guvi.ecommerce.model.CartItem;
import com.guvi.ecommerce.model.Order;
import com.guvi.ecommerce.model.OrderItem;
import com.guvi.ecommerce.model.User;
import com.guvi.ecommerce.servlet.base.HttpServlet;
import com.guvi.ecommerce.servlet.base.HttpServletRequest;
import com.guvi.ecommerce.servlet.base.HttpServletResponse;
import com.guvi.ecommerce.servlet.base.HttpSession;

import java.io.IOException;
import java.sql.SQLException;
import java.util.List;

/**
 * Servlet handling transactional order submission and role-authorized order retrieval.
 */
public class OrderServlet extends HttpServlet {

    private final OrderDAO orderDAO = new OrderDAO();

    @Override
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setContentType("application/json");
        HttpSession session = request.getSession(false);
        if (session == null || session.getAttribute("currentUser") == null) {
            response.setStatus(401);
            response.getWriter().write("{\"error\":\"Authentication required to view orders.\"}");
            return;
        }

        User user = (User) session.getAttribute("currentUser");
        List<Order> orders;
        if ("ADMIN".equalsIgnoreCase(user.getRole())) {
            orders = orderDAO.getAllOrders();
        } else {
            orders = orderDAO.getOrdersByUser(user.getUserId());
        }

        StringBuilder sb = new StringBuilder("[");
        for (int i = 0; i < orders.size(); i++) {
            Order o = orders.get(i);
            sb.append(String.format(
                "{\"orderId\":%d,\"orderNumber\":\"%s\",\"userId\":%d,\"totalAmount\":%.2f,\"finalAmount\":%.2f,\"orderStatus\":\"%s\",\"shippingAddress\":\"%s\"}",
                o.getOrderId(), o.getOrderNumber(), o.getUserId(), o.getTotalAmount(), o.getFinalAmount(), o.getOrderStatus(), o.getShippingAddress().replace("\"", "\\\"")
            ));
            if (i < orders.size() - 1) sb.append(",");
        }
        sb.append("]");

        response.setStatus(200);
        response.getWriter().write(sb.toString());
    }

    @Override
    public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setContentType("application/json");
        HttpSession session = request.getSession(false);
        if (session == null || session.getAttribute("currentUser") == null) {
            response.setStatus(401);
            response.getWriter().write("{\"error\":\"Authentication required to place an order.\"}");
            return;
        }

        User user = (User) session.getAttribute("currentUser");

        String name = request.getParameter("shippingName");
        String phone = request.getParameter("shippingPhone");
        String address = request.getParameter("shippingAddress");
        String pin = request.getParameter("shippingPincode");
        String payment = request.getParameter("paymentMethod");
        String totalStr = request.getParameter("totalAmount");

        if (name == null || phone == null || address == null || pin == null) {
            response.setStatus(400);
            response.getWriter().write("{\"error\":\"All shipping fields are required.\"}");
            return;
        }

        try {
            Order order = new Order();
            order.setOrderNumber("ORD-2026-" + (int)(1000 + Math.random() * 9000));
            order.setUserId(user.getUserId());
            order.setBuyerName(user.getFullName());
            order.setShippingName(name);
            order.setShippingPhone(phone);
            order.setShippingAddress(address);
            order.setShippingPincode(pin);
            order.setPaymentMethod(payment != null ? payment : "COD");
            order.setPaymentStatus("COD".equalsIgnoreCase(payment) ? "PENDING" : "COMPLETED");
            order.setOrderStatus("CONFIRMED");

            double total = totalStr != null ? Double.parseDouble(totalStr) : 0.0;
            order.setTotalAmount(total);
            order.setFinalAmount(total);

            @SuppressWarnings("unchecked")
            List<CartItem> cart = (List<CartItem>) session.getAttribute("cart");
            if (cart != null && !cart.isEmpty()) {
                for (CartItem ci : cart) {
                    order.addItem(new OrderItem(ci.getProductId(), ci.getName(), ci.getPrice(), ci.getQuantity()));
                }
            } else {
                response.setStatus(400);
                response.getWriter().write("{\"error\":\"Cannot place order with an empty cart.\"}");
                return;
            }

            orderDAO.placeOrder(order);

            // Clear session cart upon successful transaction
            session.removeAttribute("cart");

            response.setStatus(201);
            response.getWriter().write("{\"success\":true,\"orderNumber\":\"" + order.getOrderNumber() + "\"}");

        } catch (SQLException e) {
            response.setStatus(500);
            response.getWriter().write("{\"error\":\"Transaction rolled back: " + e.getMessage().replace("\"", "\\\"") + "\"}");
        }
    }
}
