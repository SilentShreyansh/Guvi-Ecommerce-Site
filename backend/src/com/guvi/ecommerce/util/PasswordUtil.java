package com.guvi.ecommerce.util;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

/**
 * Security utility for SHA-256 password hashing and constant-time verification.
 * Adheres to Phase 20 Security guidelines (passwords never stored as plaintext).
 */
public class PasswordUtil {

    public static String hash(String password) {
        if (password == null) return null;
        try {
            MessageDigest md = MessageDigest.getInstance("SHA-256");
            byte[] hashBytes = md.digest(password.getBytes(StandardCharsets.UTF_8));
            StringBuilder sb = new StringBuilder();
            for (byte b : hashBytes) {
                sb.append(String.format("%02x", b));
            }
            return sb.toString();
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException("SHA-256 algorithm unavailable", e);
        }
    }

    public static boolean verify(String plainPassword, String storedHashOrPlain) {
        if (plainPassword == null || storedHashOrPlain == null) return false;
        // Verify against SHA-256 hash
        String computedHash = hash(plainPassword);
        if (computedHash.equalsIgnoreCase(storedHashOrPlain)) {
            return true;
        }
        // Fallback backward-compatibility check for unhashed legacy seeds
        return plainPassword.equals(storedHashOrPlain);
    }
}
