const fs = require('fs');
const path = require('path');

// 1. Update ProductDAO.java
const productDaoPath = path.resolve('backend/src/com/guvi/ecommerce/dao/ProductDAO.java');
let productDaoContent = fs.readFileSync(productDaoPath, 'utf8');
const initialProductDaoMatches = (productDaoContent.match(/\.svg/g) || []).length;
productDaoContent = productDaoContent.replace(/([a-zA-Z0-9_\-]+)\.svg/g, '$1.jpg');
fs.writeFileSync(productDaoPath, productDaoContent, 'utf8');
console.log(`Updated ProductDAO.java: replaced ${initialProductDaoMatches} occurrences with .jpg`);

// 2. Update database/schema.sql
const schemaSqlPath = path.resolve('database/schema.sql');
let schemaSqlContent = fs.readFileSync(schemaSqlPath, 'utf8');
const initialSchemaMatches = (schemaSqlContent.match(/\.svg/g) || []).length;
schemaSqlContent = schemaSqlContent.replace(/([a-zA-Z0-9_\-]+)\.svg/g, '$1.jpg');
fs.writeFileSync(schemaSqlPath, schemaSqlContent, 'utf8');
console.log(`Updated schema.sql: replaced ${initialSchemaMatches} occurrences with .jpg`);

// 3. Update database/sample_data.sql
const sampleSqlPath = path.resolve('database/sample_data.sql');
let sampleSqlContent = fs.readFileSync(sampleSqlPath, 'utf8');
const initialSampleMatches = (sampleSqlContent.match(/\.svg/g) || []).length;
sampleSqlContent = sampleSqlContent.replace(/([a-zA-Z0-9_\-]+)\.svg/g, '$1.jpg');
fs.writeFileSync(sampleSqlPath, sampleSqlContent, 'utf8');
console.log(`Updated sample_data.sql: replaced ${initialSampleMatches} occurrences with .jpg`);

// 4. Update frontend/app.js
const appJsPath = path.resolve('frontend/app.js');
let appJsContent = fs.readFileSync(appJsPath, 'utf8');
const initialAppMatches = (appJsContent.match(/\.svg/g) || []).length;
appJsContent = appJsContent.replace(/([a-zA-Z0-9_\-]+)\.svg/g, '$1.jpg');
fs.writeFileSync(appJsPath, appJsContent, 'utf8');
console.log(`Updated frontend/app.js: replaced ${initialAppMatches} occurrences with .jpg`);
