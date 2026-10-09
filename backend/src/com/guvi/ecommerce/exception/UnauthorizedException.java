package com.guvi.ecommerce.exception;

/**
 * Thrown when an authenticated user attempts an operation restricted to another role.
 */
public class UnauthorizedException extends EcommerceException {
    public UnauthorizedException(String message) {
        super(message, 403);
    }
}
