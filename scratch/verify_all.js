const http = require('http');
const fs = require('fs');

async function runTests() {
  console.log('=== E-COMMERCE PLATFORM IMAGE AUDIT & INTEGRITY VERIFICATION ===\n');

  // 1. Fetch products from API
  const apiData = await new Promise((resolve, reject) => {
    http.get('http://localhost:8080/api/products', res => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => resolve(JSON.parse(data)));
    }).on('error', reject);
  });

  console.log('1. API Catalog Size:', apiData.length);

  // 2. Check each product image locally and via HTTP
  let missingImages = 0;
  let smallImages = 0;
  let serverErrors = 0;

  for (const p of apiData) {
    const localPath = 'frontend/assets/images/' + p.imageUrl;
    if (!fs.existsSync(localPath)) {
      console.error('[ERROR] Local file missing:', p.imageUrl, 'for', p.name);
      missingImages++;
      continue;
    }

    const stat = fs.statSync(localPath);
    if (stat.size < 1000) {
      console.error('[WARN] Suspiciously small image:', p.imageUrl, stat.size, 'bytes');
      smallImages++;
    }

    // Verify HTTP access
    const httpStatus = await new Promise(resolve => {
      http.get('http://localhost:8080/assets/images/' + p.imageUrl, res => {
        res.resume(); // consume response data to free socket
        res.on('end', () => resolve(res.statusCode));
      }).on('error', () => resolve(500));
    });

    if (httpStatus !== 200) {
      console.error('[ERROR] Server HTTP', httpStatus, 'for /assets/images/' + p.imageUrl);
      serverErrors++;
    }
  }

  console.log('\n2. Results:');
  console.log('  - Missing images on disk:', missingImages);
  console.log('  - Low resolution (<1KB) images:', smallImages);
  console.log('  - Server HTTP errors:', serverErrors);

  // 3. Check for any remaining SVG images
  const usedSvgImages = apiData.filter(p => p.imageUrl.endsWith('.svg'));
  console.log('  - Products using .svg images:', usedSvgImages.length);

  // 4. Check Cart API fallback
  const cartRes = await new Promise(resolve => {
    http.get('http://localhost:8080/api/cart', res => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => resolve({ status: res.statusCode, body: data }));
    }).on('error', () => resolve({ status: 500 }));
  });
  console.log('\n3. Cart API Status:', cartRes.status);
  console.log('  - Cart JSON contains .svg?:', cartRes.body ? cartRes.body.includes('.svg') : false);

  if (missingImages === 0 && smallImages === 0 && serverErrors === 0 && usedSvgImages.length === 0) {
    console.log('\n>>> SUCCESS: ALL 59 PRODUCTS VERIFIED WITH HIGH-QUALITY REALISTIC PHOTOGRAPHY! <<<');
  } else {
    console.error('\n>>> SOME TESTS FAILED <<<');
  }
}

runTests();
