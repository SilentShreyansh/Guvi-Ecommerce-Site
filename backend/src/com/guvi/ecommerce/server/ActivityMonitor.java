package com.guvi.ecommerce.server;

import java.text.SimpleDateFormat;
import java.util.*;
import java.util.concurrent.ConcurrentLinkedDeque;
import java.util.concurrent.atomic.AtomicLong;

/**
 * Thread-safe In-Memory Real-Time Activity Monitoring Service.
 * Tracks user interactions, transactional orders, catalog mutations,
 * and background inventory daemon heartbeat events.
 */
public class ActivityMonitor {

    public static class ActivityEvent {
        private final long id;
        private final String timestamp;
        private final String type;       // ORDER, PRODUCT, USER, INVENTORY, SYSTEM
        private final String action;     // Specific action name
        private final String actor;      // Who performed the action
        private final String description;
        private final String details;    // Reference ID or metadata
        private final String severity;   // info, success, warning, danger

        public ActivityEvent(long id, String timestamp, String type, String action, String actor, String description, String details, String severity) {
            this.id = id;
            this.timestamp = timestamp;
            this.type = type;
            this.action = action;
            this.actor = actor;
            this.description = description;
            this.details = details;
            this.severity = severity;
        }

        public long getId() { return id; }
        public String getTimestamp() { return timestamp; }
        public String getType() { return type; }
        public String getAction() { return action; }
        public String getActor() { return actor; }
        public String getDescription() { return description; }
        public String getDetails() { return details; }
        public String getSeverity() { return severity; }

        public String toJson() {
            return String.format(
                "{\"id\":%d,\"timestamp\":\"%s\",\"type\":\"%s\",\"action\":\"%s\",\"actor\":\"%s\",\"description\":\"%s\",\"details\":\"%s\",\"severity\":\"%s\"}",
                id,
                escapeJson(timestamp),
                escapeJson(type),
                escapeJson(action),
                escapeJson(actor),
                escapeJson(description),
                escapeJson(details),
                escapeJson(severity)
            );
        }

        private static String escapeJson(String s) {
            if (s == null) return "";
            return s.replace("\\", "\\\\")
                    .replace("\"", "\\\"")
                    .replace("\n", "\\n")
                    .replace("\r", "\\r");
        }
    }

    private static final int MAX_EVENTS = 200;
    private static final AtomicLong idGen = new AtomicLong(1000);
    private static final Deque<ActivityEvent> events = new ConcurrentLinkedDeque<>();
    private static final SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

    static {
        // Seed realistic historical activity events
        seedEvent("SYSTEM", "SERVER_STARTUP", "System Daemon", "E-Commerce HTTP Application Server initialized on port 8080", "Core Engine", "info", -1800000);
        seedEvent("SYSTEM", "DB_CONNECTED", "System Daemon", "Connected to relational database store with ACID compliance", "JDBC Connection Pool", "success", -1700000);
        seedEvent("INVENTORY", "DAEMON_INITIALIZED", "InventoryDaemon", "Background inventory monitoring worker registered (30s interval)", "Thread: InventoryMonitor-Worker", "info", -1600000);
        seedEvent("USER", "USER_LOGIN", "Rahul Sharma", "Buyer user logged into session from hostel network", "User #4 (rahul.s@student.guvi.in)", "info", -1200000);
        seedEvent("ORDER", "ORDER_PLACED", "Rahul Sharma", "Placed new order ORD-2026-1004 for ₹5,196.55 via UPI", "Order #ORD-2026-1004", "success", -900000);
        seedEvent("ORDER", "STATUS_UPDATED", "System Administrator", "Advanced order ORD-2026-1004 status to OUT_FOR_DELIVERY", "Order #ORD-2026-1004", "info", -600000);
        seedEvent("PRODUCT", "STOCK_ADJUSTED", "Campus Style Studio", "Adjusted stock for 'Vintage Washed Denim Trucker Jacket' (+5 units)", "Product #56", "info", -350000);
        seedEvent("INVENTORY", "LOW_STOCK_DETECTED", "InventoryDaemon", "Low stock threshold alert triggered for 'Raspberry Pi 4 Model B' (8 units remaining)", "Product #10", "warning", -120000);
    }

    private static void seedEvent(String type, String action, String actor, String description, String details, String severity, long offsetMillis) {
        long id = idGen.incrementAndGet();
        Date d = new Date(System.currentTimeMillis() + offsetMillis);
        String ts;
        synchronized (dateFormat) {
            ts = dateFormat.format(d);
        }
        events.addFirst(new ActivityEvent(id, ts, type, action, actor, description, details, severity));
    }

    public static void log(String type, String action, String actor, String description, String details, String severity) {
        long id = idGen.incrementAndGet();
        String ts;
        synchronized (dateFormat) {
            ts = dateFormat.format(new Date());
        }
        ActivityEvent event = new ActivityEvent(id, ts, type, action, actor, description, details, severity);
        events.addFirst(event);

        while (events.size() > MAX_EVENTS) {
            events.pollLast();
        }
    }

    public static List<ActivityEvent> getRecentEvents(int limit) {
        List<ActivityEvent> list = new ArrayList<>();
        int count = 0;
        for (ActivityEvent e : events) {
            list.add(e);
            count++;
            if (limit > 0 && count >= limit) break;
        }
        return list;
    }

    public static void clear() {
        events.clear();
        log("SYSTEM", "LOGS_CLEARED", "System Administrator", "Activity audit log was cleared by administrator", "System Audit", "info");
    }
}
