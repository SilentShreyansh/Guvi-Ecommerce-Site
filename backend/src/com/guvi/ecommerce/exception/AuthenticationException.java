package com.guvi.ecommerce.exception;

/**
 * Thrown when credentials fail authentication check.
 */
public class AuthenticationException extends EcommerceException {
    public AuthenticationException(String message) {
        super(message, 401);
    }
}
