package com.guvi.ecommerce.model;

import java.sql.Timestamp;

public class Product {
    private int productId;
    private int sellerId;
    private String sellerName;
    private int categoryId;
    private String categoryName;
    private String name;
    private String description;
    private String shortSpecs;
    private double price;
    private double mrp;
    private int stockQuantity;
    private double rating;
    private int reviewCount;
    private String imageUrl;
    private boolean active;
    private Timestamp createdAt;

    public Product() {
        this.active = true;
    }

    public Product(int productId, int sellerId, int categoryId, String name, String shortSpecs, double price, double mrp, int stockQuantity, String imageUrl) {
        this.productId = productId;
        this.sellerId = sellerId;
        this.categoryId = categoryId;
        this.name = name;
        this.shortSpecs = shortSpecs;
        this.price = price;
        this.mrp = mrp;
        this.stockQuantity = stockQuantity;
        this.imageUrl = imageUrl;
        this.active = true;
    }

    public int getProductId() { return productId; }
    public void setProductId(int productId) { this.productId = productId; }

    public int getSellerId() { return sellerId; }
    public void setSellerId(int sellerId) { this.sellerId = sellerId; }

    public String getSellerName() { return sellerName; }
    public void setSellerName(String sellerName) { this.sellerName = sellerName; }

    public int getCategoryId() { return categoryId; }
    public void setCategoryId(int categoryId) { this.categoryId = categoryId; }

    public String getCategoryName() { return categoryName; }
    public void setCategoryName(String categoryName) { this.categoryName = categoryName; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getShortSpecs() { return shortSpecs; }
    public void setShortSpecs(String shortSpecs) { this.shortSpecs = shortSpecs; }

    public double getPrice() { return price; }
    public void setPrice(double price) { this.price = price; }

    public double getMrp() { return mrp; }
    public void setMrp(double mrp) { this.mrp = mrp; }

    public int getStockQuantity() { return stockQuantity; }
    public void setStockQuantity(int stockQuantity) { this.stockQuantity = stockQuantity; }

    public double getRating() { return rating; }
    public void setRating(double rating) { this.rating = rating; }

    public int getReviewCount() { return reviewCount; }
    public void setReviewCount(int reviewCount) { this.reviewCount = reviewCount; }

    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }

    public boolean isActive() { return active; }
    public void setActive(boolean active) { this.active = active; }

    public Timestamp getCreatedAt() { return createdAt; }
    public void setCreatedAt(Timestamp createdAt) { this.createdAt = createdAt; }

    public int getDiscountPercentage() {
        if (mrp > price && mrp > 0) {
            return (int) Math.round(((mrp - price) / mrp) * 100);
        }
        return 0;
    }
}
