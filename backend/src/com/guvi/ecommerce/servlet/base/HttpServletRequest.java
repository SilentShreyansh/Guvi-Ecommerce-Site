package com.guvi.ecommerce.servlet.base;

import java.io.BufferedReader;
import java.io.IOException;
import java.util.Map;

public interface HttpServletRequest {
    String getParameter(String name);
    String getPathInfo();
    String getMethod();
    HttpSession getSession();
    HttpSession getSession(boolean create);
    BufferedReader getReader() throws IOException;
    Map<String, String[]> getParameterMap();
}
