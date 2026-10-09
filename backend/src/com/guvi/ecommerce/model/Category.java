package com.guvi.ecommerce.model;

public class Category {
    private int categoryId;
    private String name;
    private String slug;
    private String description;

    public Category() {}

    public Category(int categoryId, String name, String slug, String description) {
        this.categoryId = categoryId;
        this.name = name;
        this.slug = slug;
        this.description = description;
    }

    public int getCategoryId() { return categoryId; }
    public void setCategoryId(int categoryId) { this.categoryId = categoryId; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getSlug() { return slug; }
    public void setSlug(String slug) { this.slug = slug; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
}
