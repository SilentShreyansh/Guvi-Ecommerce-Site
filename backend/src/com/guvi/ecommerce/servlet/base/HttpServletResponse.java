package com.guvi.ecommerce.servlet.base;

import java.io.IOException;
import java.io.PrintWriter;

public interface HttpServletResponse {
    void setContentType(String type);
    void setCharacterEncoding(String charset);
    void setStatus(int sc);
    void setHeader(String name, String value);
    PrintWriter getWriter() throws IOException;
    void sendError(int sc, String msg) throws IOException;
}
