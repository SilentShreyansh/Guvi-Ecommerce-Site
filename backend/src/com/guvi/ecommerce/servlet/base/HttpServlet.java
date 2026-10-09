package com.guvi.ecommerce.servlet.base;

import java.io.IOException;

public abstract class HttpServlet {

    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.sendError(405, "HTTP GET Method Not Allowed");
    }

    public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.sendError(405, "HTTP POST Method Not Allowed");
    }

    public void doPut(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.sendError(405, "HTTP PUT Method Not Allowed");
    }

    public void doDelete(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.sendError(405, "HTTP DELETE Method Not Allowed");
    }
}
