package com.guvi.ecommerce.exception;

/**
 * Thrown when entity input parameters fail domain validation rules.
 */
public class ValidationException extends EcommerceException {
    public ValidationException(String message) {
        super(message, 400);
    }
}
