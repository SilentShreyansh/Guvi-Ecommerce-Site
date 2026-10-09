package com.guvi.ecommerce.exception;

/**
 * Base custom unchecked exception for the GUVI E-Commerce application.
 * Demonstrates Object-Oriented Exception Hierarchy (Abstraction & Inheritance).
 */
public class EcommerceException extends RuntimeException {
    private final int statusCode;

    public EcommerceException(String message) {
        super(message);
        this.statusCode = 400;
    }

    public EcommerceException(String message, int statusCode) {
        super(message);
        this.statusCode = statusCode;
    }

    public EcommerceException(String message, Throwable cause, int statusCode) {
        super(message, cause);
        this.statusCode = statusCode;
    }

    public int getStatusCode() {
        return statusCode;
    }
}
