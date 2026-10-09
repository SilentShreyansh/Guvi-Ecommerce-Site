package com.guvi.ecommerce.servlet.base;

public interface HttpSession {
    Object getAttribute(String name);
    void setAttribute(String name, Object value);
    void removeAttribute(String name);
    void invalidate();
    String getId();
}
