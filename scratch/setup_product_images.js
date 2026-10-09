const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

const targetDir = path.resolve('frontend/assets/images');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

// 1. Copy generated images from artifact directory
const artifactDir = 'C:\\Users\\shrey\\.gemini\\antigravity-ide\\brain\\7bc44d54-5c3e-417a-8315-32df97bc1738';
const generatedCopies = {
  'mouse.jpg': 'logitech_mouse_1791393557171.jpg',
  'pendrive.jpg': 'sandisk_pendrive_1791393589987.jpg',
  'keyboard.jpg': 'mechanical_keyboard_1791393602120.jpg',
  'usbhub.jpg': 'usb_hub_1791393613435.jpg',
  'headphones.jpg': 'boat_headphones_1791393811794.jpg',
  'earphones.jpg': 'wired_earphones_1791393824923.jpg',
  'webcam.jpg': 'dell_webcam_1791393628533.jpg',
  'external_hdd.jpg': 'external_hdd_1791393649479.jpg',
  'cooling_pad.jpg': 'cooling_pad_1791393667455.jpg',
  'wifi_adapter.jpg': 'wifi_adapter_1791393724348.jpg',
  'vertical_mouse.jpg': 'vertical_mouse_1791393736687.jpg',
  'smartwatch.jpg': 'smartwatch_pulse_1791393838014.jpg',
  'sony_headphones.jpg': 'sony_wh_headphones_1791393851535.jpg'
};

for (const [destName, srcName] of Object.entries(generatedCopies)) {
  const srcPath = path.join(artifactDir, srcName);
  const destPath = path.join(targetDir, destName);
  if (fs.existsSync(srcPath)) {
    fs.copyFileSync(srcPath, destPath);
    console.log(`[COPIED] ${srcName} -> ${destName} (${fs.statSync(destPath).size} bytes)`);
  } else {
    console.warn(`[MISSING] Source ${srcPath} not found`);
  }
}

// 2. Direct high-res product photo URLs
const remoteDownloads = {
  // Books (OpenLibrary Official High-Res Covers)
  'book_clrs.jpg': 'https://covers.openlibrary.org/b/isbn/9780262033848-L.jpg',
  'book_os.jpg': 'https://covers.openlibrary.org/b/isbn/9781118063330-L.jpg',
  'book_db.jpg': 'https://covers.openlibrary.org/b/isbn/9780078022159-L.jpg',
  'book_networks.jpg': 'https://covers.openlibrary.org/b/isbn/9780132126953-L.jpg',
  'book_ddia.jpg': 'https://covers.openlibrary.org/b/isbn/9781449373320-L.jpg',
  'book_cleancode.jpg': 'https://covers.openlibrary.org/b/isbn/9780132350884-L.jpg',
  'book_ai.jpg': 'https://covers.openlibrary.org/b/isbn/9780134610993-L.jpg',
  'book_coa.jpg': 'https://covers.openlibrary.org/b/isbn/9780134997193-L.jpg',

  // Hardware Boards & Electronics (Wikimedia Commons High-Res Studio Photos)
  'raspberrypi.jpg': 'https://upload.wikimedia.org/wikipedia/commons/f/f1/Raspberry_Pi_4_Model_B_-_Side.jpg',
  'arduino.jpg': 'https://upload.wikimedia.org/wikipedia/commons/3/38/Arduino_Uno_-_R3.jpg',
  'esp32.jpg': 'https://upload.wikimedia.org/wikipedia/commons/c/c2/ESP32_Dev_Board.jpg',
  'pico_rp2040.jpg': 'https://upload.wikimedia.org/wikipedia/commons/3/38/Raspberry_Pi_Pico_top.jpg',
  'multimeter.jpg': 'https://upload.wikimedia.org/wikipedia/commons/0/0b/2017_Cyfrowy_miernik_uniwersalny.jpg',
  'sensor_ultrasonic.jpg': 'https://upload.wikimedia.org/wikipedia/commons/9/99/SparkFun_HC-SR04_Ultrasonic-Sensor_13959-01a.jpg',
  'servo_motor.jpg': 'https://upload.wikimedia.org/wikipedia/commons/4/4d/Tower_Pro_SG90_micro_servo_motor.jpg',
  'calculator.jpg': 'https://upload.wikimedia.org/wikipedia/commons/b/b7/Casio_fx-991EX.jpg',
  'water_bottle.jpg': 'https://upload.wikimedia.org/wikipedia/commons/0/08/Stainless_Steel_Water_Bottle.jpg',
  'desk_lamp.jpg': 'https://upload.wikimedia.org/wikipedia/commons/2/2c/Battery_powered_LED_desk_lamp-7420.jpg',
  'sticky_notes.jpg': 'https://upload.wikimedia.org/wikipedia/commons/7/7f/Sticky_Note_on_a_white_background.jpg',
  'silk_tie_set.jpg': 'https://upload.wikimedia.org/wikipedia/commons/f/f4/Necktie-colour-isolation.jpg',
  'puffer_vest.jpg': 'https://upload.wikimedia.org/wikipedia/commons/b/b8/Adidas_Helionic_Down_vest.jpg',

  // Curated High-Resolution Studio Retail Photography (Crisp, clean neutral background)
  'soldering_iron.jpg': 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop&q=80',
  'notebook.jpg': 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&auto=format&fit=crop&q=80',
  'parkerpen.jpg': 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?w=800&auto=format&fit=crop&q=80',
  'pencils_set.jpg': 'https://images.unsplash.com/photo-1585336261026-77732a316a82?w=800&auto=format&fit=crop&q=80',
  'desk_organizer.jpg': 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=800&auto=format&fit=crop&q=80',

  'bluetooth_speaker.jpg': 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800&auto=format&fit=crop&q=80',
  'tws_earbuds.jpg': 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&auto=format&fit=crop&q=80',
  'fitness_band.jpg': 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=800&auto=format&fit=crop&q=80',

  'cargo_joggers.jpg': 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800&auto=format&fit=crop&q=80',
  'heavy_hoodie.jpg': 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800&auto=format&fit=crop&q=80',
  'polo_shirt.jpg': 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=800&auto=format&fit=crop&q=80',
  'canvas_backpack.jpg': 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&auto=format&fit=crop&q=80',
  'linen_shorts.jpg': 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=800&auto=format&fit=crop&q=80',

  'navy_blazer.jpg': 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&auto=format&fit=crop&q=80',
  'white_formal_shirt.jpg': 'https://images.unsplash.com/photo-1620012253295-c15c429f66bf?w=800&auto=format&fit=crop&q=80',
  'formal_trousers.jpg': 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=800&auto=format&fit=crop&q=80',

  'denim_jacket.jpg': 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=800&auto=format&fit=crop&q=80',
  'bomber_jacket.jpg': 'https://images.unsplash.com/photo-1544441893-675973e31985?w=800&auto=format&fit=crop&q=80',
  'rain_jacket.jpg': 'https://images.unsplash.com/photo-1548883354-7622d03aca27?w=800&auto=format&fit=crop&q=80'
};

function downloadFile(url, destPath) {
  return new Promise((resolve, reject) => {
    const getter = url.startsWith('https') ? https : http;
    const req = getter.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' } }, res => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        downloadFile(res.headers.location, destPath).then(resolve).catch(reject);
        return;
      }
      if (res.statusCode !== 200) {
        reject(new Error(`HTTP ${res.statusCode} for ${url}`));
        return;
      }
      const file = fs.createWriteStream(destPath);
      res.pipe(file);
      file.on('finish', () => {
        file.close(() => {
          const size = fs.statSync(destPath).size;
          resolve(size);
        });
      });
      file.on('error', reject);
    });
    req.on('error', reject);
  });
}

async function downloadAll() {
  console.log('\n--- Downloading High-Resolution Product Images ---');
  let downloadedCount = 0;
  for (const [filename, url] of Object.entries(remoteDownloads)) {
    const destPath = path.join(targetDir, filename);
    try {
      const size = await downloadFile(url, destPath);
      console.log(`[SUCCESS] ${filename} (${size} bytes) from ${url.substring(0, 60)}...`);
      downloadedCount++;
    } catch (err) {
      console.error(`[ERROR] ${filename}: ${err.message}`);
    }
  }
  console.log(`\nCompleted ${downloadedCount}/${Object.keys(remoteDownloads).length} downloads.`);
}

downloadAll();
