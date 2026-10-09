package com.guvi.ecommerce.servlet;

import com.guvi.ecommerce.dao.ProductDAO;
import com.guvi.ecommerce.model.CartItem;
import com.guvi.ecommerce.model.Product;
import com.guvi.ecommerce.servlet.base.HttpServlet;
import com.guvi.ecommerce.servlet.base.HttpServletRequest;
import com.guvi.ecommerce.servlet.base.HttpServletResponse;
import com.guvi.ecommerce.servlet.base.HttpSession;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

/**
 * Servlet for managing session-isolated shopping cart state.
 * Implements full CRUD: Add, Read, Update Quantity, Remove Item, and Clear Cart.
 */
public class CartServlet extends HttpServlet {

    private final ProductDAO productDAO = new ProductDAO();

    @SuppressWarnings("unchecked")
    private List<CartItem> getCartFromSession(HttpSession session) {
        List<CartItem> cart = (List<CartItem>) session.getAttribute("cart");
        if (cart == null) {
            cart = new ArrayList<>();
            session.setAttribute("cart", cart);
        }
        return cart;
    }

    @Override
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setContentType("application/json");
        HttpSession session = request.getSession(true);
        List<CartItem> cart = getCartFromSession(session);

        double subtotal = 0;
        int totalItems = 0;
        StringBuilder itemsJson = new StringBuilder("[");
        for (int i = 0; i < cart.size(); i++) {
            CartItem it = cart.get(i);
            subtotal += it.getLineTotal();
            totalItems += it.getQuantity();
            itemsJson.append(String.format(
                "{\"productId\":%d,\"name\":\"%s\",\"price\":%.2f,\"quantity\":%d,\"lineTotal\":%.2f,\"imageUrl\":\"%s\",\"maxStock\":%d}",
                it.getProductId(), it.getName().replace("\"", "\\\""), it.getPrice(), it.getQuantity(),
                it.getLineTotal(), it.getImageUrl() != null ? it.getImageUrl() : "mouse.jpg", it.getMaxStock()
            ));
            if (i < cart.size() - 1) itemsJson.append(",");
        }
        itemsJson.append("]");

        double discount = subtotal > 1000 ? subtotal * 0.10 : 0.0;
        double tax = (subtotal - discount) * 0.05;
        double finalTotal = subtotal - discount + tax;

        response.setStatus(200);
        response.getWriter().write(String.format(
            "{\"itemCount\":%d,\"totalQuantity\":%d,\"subtotal\":%.2f,\"discount\":%.2f,\"tax\":%.2f,\"finalTotal\":%.2f,\"items\":%s}",
            cart.size(), totalItems, subtotal, discount, tax, finalTotal, itemsJson.toString()
        ));
    }

    @Override
    public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setContentType("application/json");
        HttpSession session = request.getSession(true);
        List<CartItem> cart = getCartFromSession(session);

        String prodIdStr = request.getParameter("productId");
        String qtyStr = request.getParameter("quantity");

        if (prodIdStr == null) {
            response.setStatus(400);
            response.getWriter().write("{\"error\":\"Product ID is required.\"}");
            return;
        }

        int productId;
        int qty = 1;
        try {
            productId = Integer.parseInt(prodIdStr);
            if (qtyStr != null && !qtyStr.isEmpty()) {
                qty = Integer.parseInt(qtyStr);
            }
        } catch (NumberFormatException e) {
            response.setStatus(400);
            response.getWriter().write("{\"error\":\"Invalid product ID or quantity.\"}");
            return;
        }

        if (qty <= 0) {
            response.setStatus(400);
            response.getWriter().write("{\"error\":\"Quantity must be greater than zero.\"}");
            return;
        }

        Product prod = productDAO.getProductById(productId);
        if (prod == null) {
            response.setStatus(404);
            response.getWriter().write("{\"error\":\"Product not found.\"}");
            return;
        }

        CartItem existing = null;
        for (CartItem it : cart) {
            if (it.getProductId() == productId) {
                existing = it;
                break;
            }
        }

        int newTotalQty = (existing != null ? existing.getQuantity() : 0) + qty;
        if (newTotalQty > prod.getStockQuantity()) {
            response.setStatus(400);
            response.getWriter().write(String.format("{\"error\":\"Cannot add %d units. Available stock is only %d.\"}",
                    newTotalQty, prod.getStockQuantity()));
            return;
        }

        if (existing != null) {
            existing.setQuantity(newTotalQty);
        } else {
            cart.add(new CartItem(productId, prod.getName(), prod.getPrice(), prod.getMrp(), qty,
                    prod.getImageUrl(), prod.getStockQuantity()));
        }

        response.setStatus(200);
        response.getWriter().write("{\"success\":true,\"totalItems\":" + cart.size() + "}");
    }

    @Override
    public void doPut(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setContentType("application/json");
        HttpSession session = request.getSession(true);
        List<CartItem> cart = getCartFromSession(session);

        String prodIdStr = request.getParameter("productId");
        String qtyStr = request.getParameter("quantity");

        if (prodIdStr == null || qtyStr == null) {
            response.setStatus(400);
            response.getWriter().write("{\"error\":\"Product ID and quantity required.\"}");
            return;
        }

        int productId;
        int qty;
        try {
            productId = Integer.parseInt(prodIdStr);
            qty = Integer.parseInt(qtyStr);
        } catch (NumberFormatException e) {
            response.setStatus(400);
            response.getWriter().write("{\"error\":\"Invalid product ID or quantity.\"}");
            return;
        }

        if (qty < 0) {
            response.setStatus(400);
            response.getWriter().write("{\"error\":\"Quantity cannot be negative.\"}");
            return;
        }

        Product prod = productDAO.getProductById(productId);
        if (qty > 0 && prod != null && qty > prod.getStockQuantity()) {
            response.setStatus(400);
            response.getWriter().write(String.format("{\"error\":\"Requested quantity (%d) exceeds available stock (%d).\"}",
                    qty, prod.getStockQuantity()));
            return;
        }

        Iterator<CartItem> iter = cart.iterator();
        boolean found = false;
        while (iter.hasNext()) {
            CartItem it = iter.next();
            if (it.getProductId() == productId) {
                found = true;
                if (qty == 0) {
                    iter.remove();
                } else {
                    it.setQuantity(qty);
                }
                break;
            }
        }

        if (!found && qty > 0) {
            response.setStatus(404);
            response.getWriter().write("{\"error\":\"Item not found in cart.\"}");
            return;
        }

        response.setStatus(200);
        response.getWriter().write("{\"success\":true,\"totalItems\":" + cart.size() + "}");
    }

    @Override
    public void doDelete(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setContentType("application/json");
        HttpSession session = request.getSession(true);
        List<CartItem> cart = getCartFromSession(session);

        String prodIdStr = request.getParameter("productId");
        if (prodIdStr == null || prodIdStr.isEmpty()) {
            cart.clear();
            response.setStatus(200);
            response.getWriter().write("{\"success\":true,\"message\":\"Cart cleared.\"}");
            return;
        }

        try {
            int productId = Integer.parseInt(prodIdStr);
            boolean removed = cart.removeIf(it -> it.getProductId() == productId);
            response.setStatus(200);
            response.getWriter().write("{\"success\":" + removed + ",\"totalItems\":" + cart.size() + "}");
        } catch (NumberFormatException e) {
            response.setStatus(400);
            response.getWriter().write("{\"error\":\"Invalid product ID.\"}");
        }
    }
}
