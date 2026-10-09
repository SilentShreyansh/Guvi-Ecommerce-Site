package com.guvi.ecommerce.server;

import com.guvi.ecommerce.dao.ProductDAO;
import com.guvi.ecommerce.model.Product;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.concurrent.*;

/**
 * Thread-safe Inventory Monitoring Worker for Phase 25.
 * Monitors low stock products periodically without spawning unlimited threads.
 * Supports graceful start and safe termination.
 */
public class InventoryMonitorThread implements Runnable {

    private static final int CHECK_INTERVAL_SECONDS = 30;
    private static final int LOW_STOCK_THRESHOLD = 5;

    private final ProductDAO productDAO;
    private final ScheduledExecutorService scheduler;
    private final List<String> lowStockAlerts = Collections.synchronizedList(new ArrayList<>());
    private volatile boolean running = false;

    public InventoryMonitorThread(ProductDAO productDAO) {
        this.productDAO = productDAO;
        this.scheduler = Executors.newSingleThreadScheduledExecutor(r -> {
            Thread t = new Thread(r, "InventoryMonitor-Worker");
            t.setDaemon(true);
            return t;
        });
    }

    public synchronized void start() {
        if (running) return;
        running = true;
        scheduler.scheduleWithFixedDelay(this, 2, CHECK_INTERVAL_SECONDS, TimeUnit.SECONDS);
        System.out.println("[InventoryMonitorThread] Background worker started. Checking every " + CHECK_INTERVAL_SECONDS + "s.");
    }

    public synchronized void stop() {
        if (!running) return;
        running = false;
        scheduler.shutdown();
        try {
            if (!scheduler.awaitTermination(2, TimeUnit.SECONDS)) {
                scheduler.shutdownNow();
            }
        } catch (InterruptedException e) {
            scheduler.shutdownNow();
            Thread.currentThread().interrupt();
        }
        System.out.println("[InventoryMonitorThread] Background worker safely stopped.");
    }

    @Override
    public void run() {
        try {
            List<Product> products = productDAO.getProducts(null, null, null, null, false, null);
            List<String> currentAlerts = new ArrayList<>();
            for (Product p : products) {
                if (p.getStockQuantity() <= LOW_STOCK_THRESHOLD) {
                    currentAlerts.add(String.format("LOW STOCK: Product #%d '%s' has only %d units left!",
                            p.getProductId(), p.getName(), p.getStockQuantity()));
                }
            }
            synchronized (lowStockAlerts) {
                boolean hasNew = (currentAlerts.size() != lowStockAlerts.size());
                lowStockAlerts.clear();
                lowStockAlerts.addAll(currentAlerts);
                if (hasNew && !currentAlerts.isEmpty()) {
                    ActivityMonitor.log("INVENTORY", "LOW_STOCK_AUDIT", "InventoryDaemon",
                        "Inventory sweep detected " + currentAlerts.size() + " items below stock threshold (<= " + LOW_STOCK_THRESHOLD + " units)",
                        "Active Alerts: " + currentAlerts.size(), "warning");
                }
            }
        } catch (Exception e) {
            System.err.println("[InventoryMonitorThread] Check encountered error: " + e.getMessage());
        }
    }

    public boolean isRunning() {
        return running;
    }

    public List<String> getLowStockAlerts() {
        synchronized (lowStockAlerts) {
            return new ArrayList<>(lowStockAlerts);
        }
    }
}
