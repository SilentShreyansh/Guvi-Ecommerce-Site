package com.guvi.ecommerce.servlet;

import com.guvi.ecommerce.dao.UserDAO;
import com.guvi.ecommerce.model.User;
import com.guvi.ecommerce.servlet.base.HttpServlet;
import com.guvi.ecommerce.servlet.base.HttpServletRequest;
import com.guvi.ecommerce.servlet.base.HttpServletResponse;
import com.guvi.ecommerce.servlet.base.HttpSession;

import java.io.IOException;

public class AuthServlet extends HttpServlet {

    private final UserDAO userDAO = new UserDAO();

    @Override
    public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String path = request.getPathInfo();
        response.setContentType("application/json");

        if (path == null || path.equals("/login")) {
            handleLogin(request, response);
        } else if (path.equals("/register")) {
            handleRegister(request, response);
        } else if (path.equals("/logout")) {
            handleLogout(request, response);
        } else {
            response.sendError(404, "Unknown authentication endpoint");
        }
    }

    @Override
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setContentType("application/json");
        HttpSession session = request.getSession(false);
        if (session != null && session.getAttribute("currentUser") != null) {
            User u = (User) session.getAttribute("currentUser");
            response.getWriter().write("{\"authenticated\":true,\"userId\":" + u.getUserId() + ",\"role\":\"" + u.getRole() + "\"}");
        } else {
            response.getWriter().write("{\"authenticated\":false}");
        }
    }

    private void handleLogin(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String email = request.getParameter("email");
        String password = request.getParameter("password");

        if (email == null || password == null) {
            response.setStatus(400);
            response.getWriter().write("{\"error\":\"Email and password are required.\"}");
            return;
        }

        User user = userDAO.authenticate(email, password);
        if (user != null) {
            HttpSession session = request.getSession(true);
            session.setAttribute("currentUser", user);
            response.setStatus(200);
            response.getWriter().write("{\"success\":true,\"userId\":" + user.getUserId() + ",\"name\":\"" + user.getFullName() + "\",\"role\":\"" + user.getRole() + "\"}");
        } else {
            response.setStatus(401);
            response.getWriter().write("{\"error\":\"Invalid student email or password.\"}");
        }
    }

    private void handleRegister(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String name = request.getParameter("fullName");
        String email = request.getParameter("email");
        String password = request.getParameter("password");
        String phone = request.getParameter("phone");
        String role = request.getParameter("role");

        if (name == null || email == null || password == null || phone == null) {
            response.setStatus(400);
            response.getWriter().write("{\"error\":\"All fields are required.\"}");
            return;
        }

        if (password.length() < 8) {
            response.setStatus(400);
            response.getWriter().write("{\"error\":\"Password must contain at least 8 characters.\"}");
            return;
        }

        User u = new User();
        u.setFullName(name);
        u.setEmail(email);
        u.setPassword(password);
        u.setPhone(phone);
        u.setRole(role != null ? role : "BUYER");

        boolean ok = userDAO.register(u);
        if (ok) {
            response.setStatus(201);
            response.getWriter().write("{\"success\":true,\"message\":\"Registration successful.\"}");
        } else {
            response.setStatus(409);
            response.getWriter().write("{\"error\":\"Email already registered in system.\"}");
        }
    }

    private void handleLogout(HttpServletRequest request, HttpServletResponse response) throws IOException {
        HttpSession session = request.getSession(false);
        if (session != null) {
            session.invalidate();
        }
        response.setStatus(200);
        response.getWriter().write("{\"success\":true,\"message\":\"Logged out successfully.\"}");
    }
}
