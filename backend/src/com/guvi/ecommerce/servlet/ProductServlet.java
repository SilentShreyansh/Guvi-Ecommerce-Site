package com.guvi.ecommerce.servlet;

import com.guvi.ecommerce.dao.ProductDAO;
import com.guvi.ecommerce.model.Product;
import com.guvi.ecommerce.model.User;
import com.guvi.ecommerce.servlet.base.HttpServlet;
import com.guvi.ecommerce.servlet.base.HttpServletRequest;
import com.guvi.ecommerce.servlet.base.HttpServletResponse;
import com.guvi.ecommerce.servlet.base.HttpSession;

import java.io.IOException;
import java.util.List;

/**
 * Servlet handling product catalog querying, creation, updating, and deletion.
 * Enforces role-based authorization for seller catalog operations.
 */
public class ProductServlet extends HttpServlet {

    private final ProductDAO productDAO = new ProductDAO();

    private User getSessionUser(HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        if (session != null && session.getAttribute("currentUser") != null) {
            return (User) session.getAttribute("currentUser");
        }
        return null;
    }

    @Override
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setContentType("application/json");
        String path = request.getPathInfo();

        if (path != null && path.matches("/\\d+")) {
            int id = Integer.parseInt(path.substring(1));
            Product p = productDAO.getProductById(id);
            if (p != null) {
                response.setStatus(200);
                response.getWriter().write(productToJson(p));
            } else {
                response.setStatus(404);
                response.getWriter().write("{\"error\":\"Product not found\"}");
            }
            return;
        }

        String catStr = request.getParameter("category");
        String search = request.getParameter("search");
        String minStr = request.getParameter("minPrice");
        String maxStr = request.getParameter("maxPrice");
        String inStockStr = request.getParameter("inStock");
        String sort = request.getParameter("sort");

        Integer categoryId = (catStr != null && !catStr.isEmpty()) ? Integer.parseInt(catStr) : null;
        Double minPrice = (minStr != null && !minStr.isEmpty()) ? Double.parseDouble(minStr) : null;
        Double maxPrice = (maxStr != null && !maxStr.isEmpty()) ? Double.parseDouble(maxStr) : null;
        Boolean inStock = Boolean.parseBoolean(inStockStr);

        List<Product> products = productDAO.getProducts(categoryId, search, minPrice, maxPrice, inStock, sort);

        StringBuilder sb = new StringBuilder("[");
        for (int i = 0; i < products.size(); i++) {
            sb.append(productToJson(products.get(i)));
            if (i < products.size() - 1) sb.append(",");
        }
        sb.append("]");

        response.setStatus(200);
        response.getWriter().write(sb.toString());
    }

    @Override
    public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setContentType("application/json");
        User user = getSessionUser(request);
        if (user == null || (!"SELLER".equalsIgnoreCase(user.getRole()) && !"ADMIN".equalsIgnoreCase(user.getRole()))) {
            response.setStatus(403);
            response.getWriter().write("{\"error\":\"Forbidden: Only authenticated sellers or admins can create products.\"}");
            return;
        }

        String name = request.getParameter("name");
        String catStr = request.getParameter("categoryId");
        String priceStr = request.getParameter("price");
        String mrpStr = request.getParameter("mrp");
        String stockStr = request.getParameter("stock");
        String specs = request.getParameter("specs");
        String desc = request.getParameter("description");
        String img = request.getParameter("imageUrl");

        if (name == null || name.trim().length() < 3 || priceStr == null || mrpStr == null || stockStr == null) {
            response.setStatus(400);
            response.getWriter().write("{\"error\":\"Required product fields missing or invalid.\"}");
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
            response.setStatus(400);
            response.getWriter().write("{\"error\":\"Price, MRP, and stock must be valid numbers.\"}");
            return;
        }

        if (price <= 0 || mrp < price || stock < 0) {
            response.setStatus(400);
            response.getWriter().write("{\"error\":\"Invalid price, MRP, or stock quantity.\"}");
            return;
        }

        int catId = catStr != null ? Integer.parseInt(catStr) : 6;
        String catName = getCategoryName(catId);

        Product p = new Product();
        p.setSellerId(user.getUserId());
        p.setSellerName(user.getFullName());
        p.setCategoryId(catId);
        p.setCategoryName(catName);
        p.setName(name.trim());
        p.setPrice(price);
        p.setMrp(mrp);
        p.setStockQuantity(stock);
        p.setShortSpecs(specs != null && !specs.trim().isEmpty() ? specs.trim() : (name.trim() + " • Premium Quality"));
        p.setDescription(desc != null && !desc.trim().isEmpty() ? desc.trim() : name.trim());
        p.setImageUrl(img != null && !img.trim().isEmpty() ? img.trim() : "tshirt_casual.jpg");
        p.setRating(4.5);
        p.setReviewCount(1);
        p.setActive(true);

        boolean ok = productDAO.addProduct(p);
        if (ok) {
            response.setStatus(201);
            response.getWriter().write(productToJson(p));
        } else {
            response.setStatus(500);
            response.getWriter().write("{\"error\":\"Failed to save product in database.\"}");
        }
    }

    @Override
    public void doPut(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setContentType("application/json");
        User user = getSessionUser(request);
        if (user == null || (!"SELLER".equalsIgnoreCase(user.getRole()) && !"ADMIN".equalsIgnoreCase(user.getRole()))) {
            response.setStatus(403);
            response.getWriter().write("{\"error\":\"Forbidden: Only authenticated sellers or admins can edit products.\"}");
            return;
        }

        String path = request.getPathInfo();
        if (path == null) {
            response.setStatus(400);
            response.getWriter().write("{\"error\":\"Product path required.\"}");
            return;
        }

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
                    prodId = Integer.parseInt(parts[1]);
                } catch (Exception ignored) {}
            }
            Product prod = productDAO.getProductById(prodId);
            if (prod == null) {
                response.setStatus(404);
                response.getWriter().write("{\"error\":\"Product not found.\"}");
                return;
            }
            if (!"ADMIN".equalsIgnoreCase(user.getRole()) && prod.getSellerId() != 0 && prod.getSellerId() != user.getUserId()) {
                response.setStatus(403);
                response.getWriter().write("{\"error\":\"Forbidden: You cannot modify another seller's product stock.\"}");
                return;
            }
            String qtyStr = request.getParameter("quantity");
            String newStockStr = request.getParameter("newStock");
            if (qtyStr == null && newStockStr == null) {
                try {
                    java.io.BufferedReader reader = request.getReader();
                    StringBuilder sb = new StringBuilder();
                    String line;
                    while ((line = reader.readLine()) != null) sb.append(line);
                    String body = sb.toString();
                    if (body.contains("\"quantity\"")) {
                        int idx = body.indexOf("\"quantity\"");
                        int colon = body.indexOf(":", idx);
                        int end = body.indexOf(",", colon);
                        if (end == -1) end = body.indexOf("}", colon);
                        if (colon != -1 && end != -1) {
                            qtyStr = body.substring(colon + 1, end).replaceAll("[^0-9\\-]", "").trim();
                        }
                    }
                    if (body.contains("\"newStock\"")) {
                        int idx = body.indexOf("\"newStock\"");
                        int colon = body.indexOf(":", idx);
                        int end = body.indexOf(",", colon);
                        if (end == -1) end = body.indexOf("}", colon);
                        if (colon != -1 && end != -1) {
                            newStockStr = body.substring(colon + 1, end).replaceAll("[^0-9]", "").trim();
                        }
                    }
                } catch (Exception ignored) {}
            }

            if (newStockStr != null && !newStockStr.isEmpty()) {
                int newStock = Integer.parseInt(newStockStr);
                boolean ok = productDAO.setStock(prodId, newStock);
                response.setStatus(200);
                response.getWriter().write("{\"success\":" + ok + ",\"newStock\":" + newStock + "}");
                return;
            } else if (qtyStr != null && !qtyStr.isEmpty()) {
                int qty = Integer.parseInt(qtyStr);
                boolean ok = productDAO.adjustStock(prodId, qty);
                Product updated = productDAO.getProductById(prodId);
                int resultingStock = (updated != null) ? updated.getStockQuantity() : 0;
                response.setStatus(200);
                response.getWriter().write("{\"success\":" + ok + ",\"newStock\":" + resultingStock + "}");
                return;
            }
        } else if (path.matches("/\\d+")) {
            int prodId = Integer.parseInt(path.substring(1));
            Product prod = productDAO.getProductById(prodId);
            if (prod == null) {
                response.setStatus(404);
                response.getWriter().write("{\"error\":\"Product not found.\"}");
                return;
            }
            if (!"ADMIN".equalsIgnoreCase(user.getRole()) && prod.getSellerId() != user.getUserId()) {
                response.setStatus(403);
                response.getWriter().write("{\"error\":\"Forbidden: You cannot modify another seller's product.\"}");
                return;
            }
            String name = request.getParameter("name");
            String priceStr = request.getParameter("price");
            String mrpStr = request.getParameter("mrp");
            String stockStr = request.getParameter("stock");
            if (name != null) prod.setName(name);
            if (priceStr != null) prod.setPrice(Double.parseDouble(priceStr));
            if (mrpStr != null) prod.setMrp(Double.parseDouble(mrpStr));
            if (stockStr != null) prod.setStockQuantity(Integer.parseInt(stockStr));

            boolean updated = productDAO.updateProduct(prod);
            response.setStatus(200);
            response.getWriter().write("{\"success\":" + updated + "}");
            return;
        }

        response.setStatus(400);
        response.getWriter().write("{\"error\":\"Invalid product edit request.\"}");
    }

    @Override
    public void doDelete(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setContentType("application/json");
        User user = getSessionUser(request);
        if (user == null || (!"SELLER".equalsIgnoreCase(user.getRole()) && !"ADMIN".equalsIgnoreCase(user.getRole()))) {
            response.setStatus(403);
            response.getWriter().write("{\"error\":\"Forbidden: Only authenticated sellers or admins can delete products.\"}");
            return;
        }

        String path = request.getPathInfo();
        if (path != null && path.matches("/\\d+")) {
            int id = Integer.parseInt(path.substring(1));
            Product prod = productDAO.getProductById(id);
            if (prod == null) {
                response.setStatus(404);
                response.getWriter().write("{\"error\":\"Product not found.\"}");
                return;
            }
            if (!"ADMIN".equalsIgnoreCase(user.getRole()) && prod.getSellerId() != user.getUserId()) {
                response.setStatus(403);
                response.getWriter().write("{\"error\":\"Forbidden: You cannot delete another seller's product.\"}");
                return;
            }
            boolean deleted = productDAO.deleteProduct(id);
            response.setStatus(200);
            response.getWriter().write("{\"success\":" + deleted + "}");
            return;
        }

        response.setStatus(400);
        response.getWriter().write("{\"error\":\"Product ID required.\"}");
    }

    private String getCategoryName(int catId) {
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

    private String productToJson(Product p) {
        return String.format(
            "{\"productId\":%d,\"sellerId\":%d,\"sellerName\":\"%s\",\"categoryId\":%d,\"categoryName\":\"%s\",\"name\":\"%s\",\"description\":\"%s\",\"shortSpecs\":\"%s\",\"price\":%.2f,\"mrp\":%.2f,\"discountPercentage\":%d,\"stockQuantity\":%d,\"rating\":%.1f,\"reviewCount\":%d,\"imageUrl\":\"%s\",\"active\":%b}",
            p.getProductId(), p.getSellerId(), p.getSellerName().replace("\"", "\\\""), p.getCategoryId(), p.getCategoryName().replace("\"", "\\\""),
            p.getName().replace("\"", "\\\""), p.getDescription().replace("\"", "\\\""), p.getShortSpecs().replace("\"", "\\\""),
            p.getPrice(), p.getMrp(), p.getDiscountPercentage(), p.getStockQuantity(), p.getRating(), p.getReviewCount(),
            p.getImageUrl(), p.isActive()
        );
    }
}
