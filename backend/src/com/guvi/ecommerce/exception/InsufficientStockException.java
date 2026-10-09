package com.guvi.ecommerce.exception;

/**
 * Thrown when an order or cart operation requests more units than available inventory.
 * Used during ACID transactions to trigger rollback.
 */
public class InsufficientStockException extends EcommerceException {
    private final int productId;
    private final int requested;
    private final int available;

    public InsufficientStockException(int productId, int requested, int available) {
        super(String.format("Insufficient stock for product #%d: requested %d, available %d", productId, requested, available), 400);
        this.productId = productId;
        this.requested = requested;
        this.available = available;
    }

    public int getProductId() {
        return productId;
    }

    public int getRequested() {
        return requested;
    }

    public int getAvailable() {
        return available;
    }
}
