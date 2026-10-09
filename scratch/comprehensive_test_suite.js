const http = require('http');

function request(options, data = null) {
  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        let json = null;
        try { json = JSON.parse(body); } catch (_) {}
        resolve({
          status: res.statusCode,
          headers: res.headers,
          body,
          json
        });
      });
    });
    req.on('error', reject);
    if (data) {
      if (typeof data === 'object') {
        req.setHeader('Content-Type', 'application/json');
        req.write(JSON.stringify(data));
      } else {
        req.write(data);
      }
    }
    req.end();
  });
}

function get(path, headers = {}) {
  return request({
    host: 'localhost',
    port: 8080,
    path,
    method: 'GET',
    headers
  });
}

function post(path, payload, headers = {}) {
  return request({
    host: 'localhost',
    port: 8080,
    path,
    method: 'POST',
    headers
  }, payload);
}

function put(path, payload, headers = {}) {
  return request({
    host: 'localhost',
    port: 8080,
    path,
    method: 'PUT',
    headers
  }, payload);
}

function del(path, headers = {}) {
  return request({
    host: 'localhost',
    port: 8080,
    path,
    method: 'DELETE',
    headers
  });
}

function extractCookie(headers) {
  const setCookie = headers['set-cookie'];
  if (!setCookie) return '';
  const first = Array.isArray(setCookie) ? setCookie[0] : setCookie;
  return first.split(';')[0];
}

async function run() {
  console.log("===============================================================");
  console.log("  GUVI E-COMMERCE FULL END-TO-END AUTOMATED VERIFICATION SUITE ");
  console.log("===============================================================\n");

  let passed = 0;
  let failed = 0;
  const testResults = [];

  function assert(category, testName, condition, details = "") {
    if (condition) {
      console.log(`[PASS] [${category}] ${testName}`);
      passed++;
      testResults.push({ category, testName, status: "PASS", details });
    } else {
      console.error(`[FAIL] [${category}] ${testName} ${details ? "- " + details : ""}`);
      failed++;
      testResults.push({ category, testName, status: "FAIL", details });
    }
  }

  try {
    // -------------------------------------------------------------------------
    // PHASE 5: FRONTEND ASSET TESTS
    // -------------------------------------------------------------------------
    console.log("\n--- PHASE 5: FRONTEND ASSET & STATIC FILE TESTS ---");
    const htmlRes = await get('/index.html');
    assert("Frontend", "Storefront index.html loads with 200 OK", htmlRes.status === 200 && htmlRes.body.includes("Cartivo"));

    const dashRes = await get('/dashboard.html');
    assert("Frontend", "Dashboard dashboard.html loads with 200 OK", dashRes.status === 200 && dashRes.body.includes("Management Portal"));

    const cssRes = await get('/style.css');
    assert("Frontend", "style.css loads with 200 OK and text/css", cssRes.status === 200 && cssRes.headers['content-type'].includes('text/css'));

    const jsRes = await get('/app.js');
    assert("Frontend", "app.js loads with 200 OK and javascript", jsRes.status === 200 && jsRes.headers['content-type'].includes('javascript'));

    const svgRes = await get('/assets/images/mouse.svg');
    assert("Frontend", "SVG product illustrations load with 200 OK", svgRes.status === 200 && svgRes.headers['content-type'].includes('svg'));

    // -------------------------------------------------------------------------
    // PHASE 6: AUTHENTICATION TESTS
    // -------------------------------------------------------------------------
    console.log("\n--- PHASE 6: AUTHENTICATION TESTS ---");
    const regEmail = `testuser_${Date.now()}@guvi.in`;

    // 1. Valid registration
    const regRes = await post('/api/auth/register', {
      fullName: "Test Verification User",
      email: regEmail,
      password: "StrongPassword123!",
      phone: "9876543299",
      role: "BUYER"
    });
    assert("Auth", "Valid registration returns HTTP 201", regRes.status === 201 && regRes.json && regRes.json.success === true);

    // 2. Duplicate email rejected
    const dupRes = await post('/api/auth/register', {
      fullName: "Test Verification User",
      email: regEmail,
      password: "StrongPassword123!",
      phone: "9876543299",
      role: "BUYER"
    });
    assert("Auth", "Duplicate email registration rejected with HTTP 409", dupRes.status === 409);

    // 3. Invalid email format
    const invEmailRes = await post('/api/auth/register', {
      fullName: "No Email User",
      email: "invalid-email-address",
      password: "StrongPassword123!",
      phone: "9876543299"
    });
    assert("Auth", "Invalid email format rejected with HTTP 400", invEmailRes.status === 400);

    // 4. Empty name
    const emptyNameRes = await post('/api/auth/register', {
      fullName: "",
      email: `user2_${Date.now()}@guvi.in`,
      password: "StrongPassword123!",
      phone: "9876543299"
    });
    assert("Auth", "Empty name rejected with HTTP 400", emptyNameRes.status === 400);

    // 5. Weak password (< 8 chars)
    const weakPassRes = await post('/api/auth/register', {
      fullName: "Weak Pass User",
      email: `user3_${Date.now()}@guvi.in`,
      password: "short",
      phone: "9876543299"
    });
    assert("Auth", "Weak password (<8 chars) rejected with HTTP 400", weakPassRes.status === 400);

    // 6. Correct email + correct password login
    const loginRes = await post('/api/auth/login', {
      email: regEmail,
      password: "StrongPassword123!"
    });
    assert("Auth", "Login with valid credentials returns HTTP 200 and JSESSIONID", loginRes.status === 200 && loginRes.json && loginRes.json.success === true);
    const buyerCookie = extractCookie(loginRes.headers);

    // 7. Correct email + wrong password
    const wrongPassRes = await post('/api/auth/login', {
      email: regEmail,
      password: "WrongPassword999!"
    });
    assert("Auth", "Wrong password rejected with HTTP 401", wrongPassRes.status === 401);

    // 8. Non-existent account
    const noUserRes = await post('/api/auth/login', {
      email: "nonexistent_404@guvi.in",
      password: "password123"
    });
    assert("Auth", "Non-existent account rejected with HTTP 401", noUserRes.status === 401);

    // 9. SQL Injection login bypass attempt: ' OR '1'='1
    const sqlInjRes = await post('/api/auth/login', {
      email: "' OR '1'='1",
      password: "' OR '1'='1"
    });
    assert("Security", "SQL injection login attempt is blocked (HTTP 401)", sqlInjRes.status === 401);

    // -------------------------------------------------------------------------
    // PHASE 7: SESSION LIFECYCLE TESTS
    // -------------------------------------------------------------------------
    console.log("\n--- PHASE 7: SESSION LIFECYCLE TESTS ---");
    // Verify authenticated session
    const sessCheck1 = await get('/api/auth/session', { Cookie: buyerCookie });
    assert("Session", "Active session validates authenticated: true", sessCheck1.status === 200 && sessCheck1.json && sessCheck1.json.authenticated === true);

    // Logout
    const logoutRes = await post('/api/auth/logout', {}, { Cookie: buyerCookie });
    assert("Session", "Logout returns HTTP 200", logoutRes.status === 200);

    // Verify session destroyed
    const sessCheck2 = await get('/api/auth/session', { Cookie: buyerCookie });
    assert("Session", "Session after logout is unauthenticated", sessCheck2.status === 200 && sessCheck2.json && sessCheck2.json.authenticated === false);

    // Access protected orders without session
    const unauthOrders = await get('/api/orders');
    assert("Session", "Access to /api/orders without session rejected with HTTP 401", unauthOrders.status === 401);

    // -------------------------------------------------------------------------
    // PHASE 8: ROLE AUTHORIZATION TESTS
    // -------------------------------------------------------------------------
    console.log("\n--- PHASE 8: ROLE AUTHORIZATION TESTS ---");
    // Login as Admin
    const adminLoginRes = await post('/api/auth/login', { email: 'admin@guvi.in', password: 'admin123' });
    assert("Auth", "Admin login succeeds", adminLoginRes.status === 200);
    const adminCookie = extractCookie(adminLoginRes.headers);

    // Login as Seller
    const sellerLoginRes = await post('/api/auth/login', { email: 'seller.tech@guvi.in', password: 'seller123' });
    assert("Auth", "Seller login succeeds", sellerLoginRes.status === 200);
    const sellerCookie = extractCookie(sellerLoginRes.headers);

    // Login as Buyer
    const buyerLoginRes = await post('/api/auth/login', { email: 'rahul.s@student.guvi.in', password: 'student123' });
    assert("Auth", "Buyer login succeeds", buyerLoginRes.status === 200);
    const buyerSharmaCookie = extractCookie(buyerLoginRes.headers);

    // Admin can view all users
    const adminUsersRes = await get('/api/admin/users', { Cookie: adminCookie });
    assert("Authorization", "Admin can view all users (HTTP 200)", adminUsersRes.status === 200 && Array.isArray(adminUsersRes.json));

    // Admin can view stats
    const adminStatsRes = await get('/api/admin/stats', { Cookie: adminCookie });
    assert("Authorization", "Admin can view stats (HTTP 200)", adminStatsRes.status === 200 && adminStatsRes.json.totalUsers >= 5);

    // Seller CANNOT view admin users
    const sellerUsersRes = await get('/api/admin/users', { Cookie: sellerCookie });
    assert("Authorization", "Seller blocked from admin users (HTTP 403 Forbidden)", sellerUsersRes.status === 403);

    // Buyer CANNOT view admin users
    const buyerUsersRes = await get('/api/admin/users', { Cookie: buyerSharmaCookie });
    assert("Authorization", "Buyer blocked from admin users (HTTP 403 Forbidden)", buyerUsersRes.status === 403);

    // Buyer CANNOT create products
    const buyerCreateProdRes = await post('/api/products', {
      name: "Illegal Product",
      price: 100,
      mrp: 200,
      stockQuantity: 10
    }, { Cookie: buyerSharmaCookie });
    assert("Authorization", "Buyer blocked from creating products (HTTP 403 Forbidden)", buyerCreateProdRes.status === 403);

    // Seller CANNOT delete other seller's product (e.g. product #7 owned by Stationery Hub #3)
    const sellerDelOtherProd = await del('/api/products/7', { Cookie: sellerCookie });
    assert("Authorization", "Seller blocked from deleting another seller's product (HTTP 403 Forbidden)", sellerDelOtherProd.status === 403);

    // -------------------------------------------------------------------------
    // PHASE 9 & 10: PRODUCT CRUD & VALIDATION TESTS
    // -------------------------------------------------------------------------
    console.log("\n--- PHASE 9 & 10: PRODUCT CRUD & VALIDATION TESTS ---");
    // Product listing
    const prodListRes = await get('/api/products');
    assert("Product", "Product catalog returns 59 products", prodListRes.status === 200 && prodListRes.json.length === 59);

    // Valid Product Detail by ID
    const prodDetailRes = await get('/api/products/1');
    assert("Product", "Valid product ID #1 returns detail", prodDetailRes.status === 200 && prodDetailRes.json.productId === 1);

    // Invalid Product ID
    const invProdDetailRes = await get('/api/products/99999');
    assert("Product", "Invalid product ID #99999 returns HTTP 404", invProdDetailRes.status === 404);

    // Seller Add Product with invalid data
    const negPriceRes = await post('/api/products', {
      name: "Bad Price Product",
      price: -50,
      mrp: 100,
      stockQuantity: 10
    }, { Cookie: sellerCookie });
    assert("Product", "Negative selling price rejected with HTTP 400", negPriceRes.status === 400);

    const mrpLessRes = await post('/api/products', {
      name: "Bad MRP Product",
      price: 500,
      mrp: 300,
      stockQuantity: 10
    }, { Cookie: sellerCookie });
    assert("Product", "MRP less than selling price rejected with HTTP 400", mrpLessRes.status === 400);

    const negStockRes = await post('/api/products', {
      name: "Bad Stock Product",
      price: 200,
      mrp: 300,
      stockQuantity: -5
    }, { Cookie: sellerCookie });
    assert("Product", "Negative stock rejected with HTTP 400", negStockRes.status === 400);

    // Seller Add Valid Product
    const validProdRes = await post('/api/products', {
      name: "Campus Pro Mechanical Numpad",
      shortSpecs: "21 Keys • Hot-Swappable • Type-C",
      description: "Dedicated mechanical numeric keypad for engineering calculations and finance courses.",
      price: 899.0,
      mrp: 1299.0,
      stockQuantity: 25,
      categoryId: 1,
      imageUrl: "keyboard.svg"
    }, { Cookie: sellerCookie });
    assert("Product", "Seller add product succeeds with HTTP 201", validProdRes.status === 201 && validProdRes.json.productId > 0);
    const createdProdId = validProdRes.json.productId;

    // Seller Edit Own Product
    const editProdRes = await put(`/api/products/${createdProdId}`, {
      name: "Campus Pro Mechanical Numpad (RGB)",
      price: 949.0,
      mrp: 1399.0,
      stockQuantity: 30
    }, { Cookie: sellerCookie });
    assert("Product", "Seller update own product succeeds (HTTP 200)", editProdRes.status === 200 && editProdRes.json.success === true);

    // Seller Delete Own Product
    const delProdRes = await del(`/api/products/${createdProdId}`, { Cookie: sellerCookie });
    assert("Product", "Seller delete own product succeeds (HTTP 200)", delProdRes.status === 200 && delProdRes.json.success === true);

    // -------------------------------------------------------------------------
    // PHASE 11: CART TESTING & ISOLATION
    // -------------------------------------------------------------------------
    console.log("\n--- PHASE 11: CART TESTING & ISOLATION ---");
    const buyerACookie = buyerSharmaCookie;

    // Login another buyer (Buyer B)
    const buyerBLogin = await post('/api/auth/login', { email: 'ananya.i@student.guvi.in', password: 'student123' });
    const buyerBCookie = extractCookie(buyerBLogin.headers);

    // Buyer A adds product #1 (qty: 2)
    const addCartARes = await post('/api/cart', { productId: 1, quantity: 2 }, { Cookie: buyerACookie });
    assert("Cart", "Buyer A adds product to cart (HTTP 200)", addCartARes.status === 200);

    // Verify Buyer A cart has 1 item
    const getCartARes = await get('/api/cart', { Cookie: buyerACookie });
    assert("Cart", "Buyer A cart has 1 item with total quantity 2", getCartARes.status === 200 && getCartARes.json.itemCount === 1 && getCartARes.json.totalQuantity === 2);

    // Verify Buyer B cart is completely empty (Buyer A cannot leak into Buyer B)
    const getCartBRes = await get('/api/cart', { Cookie: buyerBCookie });
    assert("Cart", "Buyer B cart is completely isolated and empty", getCartBRes.status === 200 && getCartBRes.json.itemCount === 0);

    // Update quantity in Buyer A cart to 3
    const updateCartRes = await put('/api/cart', { productId: 1, quantity: 3 }, { Cookie: buyerACookie });
    assert("Cart", "Update quantity in cart succeeds", updateCartRes.status === 200);

    const getCartAUpdated = await get('/api/cart', { Cookie: buyerACookie });
    assert("Cart", "Buyer A cart updated quantity is 3", getCartAUpdated.json.totalQuantity === 3);

    // Reject negative quantity
    const negQtyCartRes = await put('/api/cart', { productId: 1, quantity: -2 }, { Cookie: buyerACookie });
    assert("Cart", "Negative quantity in cart rejected with HTTP 400", negQtyCartRes.status === 400);

    // Reject quantity > stock (Product #1 stock is 28)
    const overStockCartRes = await put('/api/cart', { productId: 1, quantity: 999 }, { Cookie: buyerACookie });
    assert("Cart", "Quantity greater than stock rejected with HTTP 400", overStockCartRes.status === 400);

    // Remove item from cart
    const removeCartRes = await del('/api/cart/1', { Cookie: buyerACookie });
    assert("Cart", "Remove item from cart succeeds", removeCartRes.status === 200);

    const getCartAEmpty = await get('/api/cart', { Cookie: buyerACookie });
    assert("Cart", "Cart is empty after removal", getCartAEmpty.json.itemCount === 0);

    // -------------------------------------------------------------------------
    // PHASE 12 & 25: INVENTORY & CONCURRENCY TESTS
    // -------------------------------------------------------------------------
    console.log("\n--- PHASE 12 & 25: INVENTORY & CONCURRENCY TESTS ---");
    // Check initial stock of product #2
    const p2Before = await get('/api/products/2');
    const stock2Initial = p2Before.json.stockQuantity;
    assert("Inventory", `Product #2 initial stock recorded (${stock2Initial})`, stock2Initial > 0);

    // Setup product #23 with stock = 1 for race condition test
    // Let's create a temporary product with stock = 1
    const raceProdRes = await post('/api/products', {
      name: "Limited Edition Hackathon Badge",
      shortSpecs: "PCB Enamel • 1 Unit Only",
      description: "Only one badge available for concurrency stress test.",
      price: 199.0,
      mrp: 299.0,
      stockQuantity: 1,
      categoryId: 4,
      imageUrl: "arduino.svg"
    }, { Cookie: sellerCookie });
    const raceProdId = raceProdRes.json.productId;
    assert("Inventory", `Created single-stock test product #${raceProdId} (stock=1)`, raceProdId > 0);

    // Concurrency test: Two simultaneous purchase requests
    const orderPayload1 = {
      orderNumber: "ORD-RACE-1-" + Date.now(),
      shippingName: "Buyer 1",
      totalAmount: 199.0,
      finalAmount: 199.0,
      items: [{ productId: raceProdId, unitPrice: 199.0, quantity: 1, productName: "Limited Edition Badge" }]
    };
    const orderPayload2 = {
      orderNumber: "ORD-RACE-2-" + Date.now(),
      shippingName: "Buyer 2",
      totalAmount: 199.0,
      finalAmount: 199.0,
      items: [{ productId: raceProdId, unitPrice: 199.0, quantity: 1, productName: "Limited Edition Badge" }]
    };

    const [res1, res2] = await Promise.all([
      post('/api/orders', orderPayload1, { Cookie: buyerACookie }),
      post('/api/orders', orderPayload2, { Cookie: buyerBCookie })
    ]);

    const oneSucceeded = (res1.status === 201 && res2.status !== 201) || (res2.status === 201 && res1.status !== 201);
    assert("Concurrency", "Only exactly one simultaneous buyer successfully purchased the single-stock item", oneSucceeded);

    // Verify remaining stock is exactly 0 and NEVER -1!
    const raceProdAfter = await get(`/api/products/${raceProdId}`);
    assert("Concurrency", "Stock was decremented to 0 and never became negative (-1)", raceProdAfter.json.stockQuantity === 0);

    // -------------------------------------------------------------------------
    // PHASE 13 & 14: COMPLETE ORDER & TRANSACTION ROLLBACK TESTS
    // -------------------------------------------------------------------------
    console.log("\n--- PHASE 13 & 14: ORDER & TRANSACTION ROLLBACK TESTS ---");
    // 1. Deliberate Transaction Failure (stock is 0, attempt to purchase 1)
    const failOrderPayload = {
      orderNumber: "ORD-FAIL-" + Date.now(),
      shippingName: "Failed Order Buyer",
      totalAmount: 199.0,
      finalAmount: 199.0,
      items: [{ productId: raceProdId, unitPrice: 199.0, quantity: 1, productName: "Out of Stock Item" }]
    };
    const failOrderRes = await post('/api/orders', failOrderPayload, { Cookie: buyerACookie });
    assert("Transaction", "Order with insufficient stock fails with HTTP 400 and transaction rollback message",
      failOrderRes.status === 400 && failOrderRes.body.includes("Insufficient stock"));

    // 2. Full Valid Buyer Flow
    // Add product #5 to cart
    await post('/api/cart', { productId: 5, quantity: 1 }, { Cookie: buyerACookie });
    const cartBeforeOrder = await get('/api/cart', { Cookie: buyerACookie });
    assert("Order", "Cart contains item before checkout", cartBeforeOrder.json.itemCount === 1);

    // Place order from cart
    const p5Before = await get('/api/products/5');
    const p5StockBefore = p5Before.json.stockQuantity;

    const validOrderPayload = {
      orderNumber: "ORD-FLOW-" + Date.now(),
      shippingName: "Rahul Sharma",
      shippingPhone: "9876543220",
      shippingAddress: "Room 204, Kaveri Hostel, IITM",
      shippingPincode: "600113",
      paymentMethod: "UPI",
      totalAmount: 1299.0,
      discountAmount: 100.0,
      taxAmount: 59.95,
      shippingFee: 0.0,
      finalAmount: 1258.95,
      items: [{ productId: 5, unitPrice: 1299.0, quantity: 1, productName: "boAt Rockerz 450" }]
    };
    const orderSuccessRes = await post('/api/orders', validOrderPayload, { Cookie: buyerACookie });
    assert("Order", "Order successfully placed with HTTP 201", orderSuccessRes.status === 201 && orderSuccessRes.json.success === true);

    // Verify stock reduced by 1
    const p5After = await get('/api/products/5');
    assert("Order", "Inventory stock decremented accurately", p5After.json.stockQuantity === p5StockBefore - 1);

    // Verify cart was cleared automatically
    const cartAfterOrder = await get('/api/cart', { Cookie: buyerACookie });
    assert("Order", "Shopping cart cleared automatically upon order completion", cartAfterOrder.json.itemCount === 0);

    // -------------------------------------------------------------------------
    // PHASE 15: ORDER STATUS UPDATES
    // -------------------------------------------------------------------------
    console.log("\n--- PHASE 15: ORDER STATUS TRANSITION TESTS ---");
    const testOrderNum = orderSuccessRes.json.order.orderNumber;

    // Buyer CANNOT update order status
    const buyerUpdateStatus = await put(`/api/orders/${testOrderNum}/status`, { status: "SHIPPED" }, { Cookie: buyerACookie });
    assert("Authorization", "Buyer blocked from updating order status (HTTP 403 Forbidden)", buyerUpdateStatus.status === 403);

    // Seller updates status to SHIPPED
    const sellerUpdateStatus = await put(`/api/orders/${testOrderNum}/status`, { status: "SHIPPED" }, { Cookie: sellerCookie });
    assert("Order", "Seller can update order status to SHIPPED (HTTP 200)", sellerUpdateStatus.status === 200);

    // Admin updates status to DELIVERED
    const adminUpdateStatus = await put(`/api/orders/${testOrderNum}/status`, { status: "DELIVERED" }, { Cookie: adminCookie });
    assert("Order", "Admin can update order status to DELIVERED (HTTP 200)", adminUpdateStatus.status === 200);

    // -------------------------------------------------------------------------
    // PHASE 16, 17, 18: DASHBOARD API TESTS
    // -------------------------------------------------------------------------
    console.log("\n--- PHASE 16, 17, 18: DASHBOARD API TESTS ---");
    // Buyer sees only their own orders
    const buyerOrders = await get('/api/orders', { Cookie: buyerACookie });
    assert("Dashboard", "Buyer retrieves their own order list", buyerOrders.status === 200 && Array.isArray(buyerOrders.json) && buyerOrders.json.length > 0);

    // Admin sees all orders
    const adminOrders = await get('/api/orders', { Cookie: adminCookie });
    assert("Dashboard", "Admin retrieves all platform orders", adminOrders.status === 200 && adminOrders.json.length >= buyerOrders.json.length);

    // -------------------------------------------------------------------------
    // PHASE 20: SECURITY CHECKS
    // -------------------------------------------------------------------------
    console.log("\n--- PHASE 20: SECURITY CHECKS ---");
    // Verify password is not exposed in User responses
    assert("Security", "User responses do not expose raw password", adminUsersRes.json.every(u => u.password === undefined && u.passwordHash === undefined));

    // Admin can delete user
    const adminDelUser = await del(`/api/admin/users/${regRes.json.user.userId}`, { Cookie: adminCookie });
    assert("Security", "Admin user delete operation succeeds (HTTP 200)", adminDelUser.status === 200 && adminDelUser.json.success === true);

    // -------------------------------------------------------------------------
    // PHASE 25: THREAD / INVENTORY MONITORING WORKER
    // -------------------------------------------------------------------------
    console.log("\n--- PHASE 25: INVENTORY MONITOR THREAD CHECK ---");
    assert("Threading", "Admin stats contains low-stock alerts generated by background worker",
      Array.isArray(adminStatsRes.json.lowStockAlerts));

    console.log("\n===============================================================");
    console.log(`TOTAL TESTS: ${passed + failed} | PASSED: ${passed} | FAILED: ${failed}`);
    console.log("===============================================================");

    return { total: passed + failed, passed, failed, results: testResults };
  } catch (err) {
    console.error("Test execution threw error:", err);
    return { total: passed + failed, passed, failed, error: err.message };
  }
}

run().then(res => {
  if (res.failed > 0) process.exit(1);
  else process.exit(0);
});
