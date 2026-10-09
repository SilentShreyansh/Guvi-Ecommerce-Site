package com.guvi.ecommerce.model;

public class CartItem {
    private int productId;
    private String name;
    private double price;
    private double mrp;
    private int quantity;
    private String imageUrl;
    private int stockQuantity;

    public CartItem() {}

    public CartItem(int productId, String name, double price, double mrp, int quantity, String imageUrl, int stockQuantity) {
        this.productId = productId;
        this.name = name;
        this.price = price;
        this.mrp = mrp;
        this.quantity = quantity;
        this.imageUrl = imageUrl;
        this.stockQuantity = stockQuantity;
    }

    public int getProductId() { return productId; }
    public void setProductId(int productId) { this.productId = productId; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public double getPrice() { return price; }
    public void setPrice(double price) { this.price = price; }

    public double getMrp() { return mrp; }
    public void setMrp(double mrp) { this.mrp = mrp; }

    public int getQuantity() { return quantity; }
    public void setQuantity(int quantity) { this.quantity = quantity; }

    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }

    public int getStockQuantity() { return stockQuantity; }
    public void setStockQuantity(int stockQuantity) { this.stockQuantity = stockQuantity; }
    public int getMaxStock() { return stockQuantity; }

    public double getLineTotal() {
        return this.price * this.quantity;
    }
}
