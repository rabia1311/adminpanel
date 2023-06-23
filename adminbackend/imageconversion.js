const fs = require('fs');

// Read the image file
const imageFile = "C:\Users\admin\Desktop\bbq1.jpg";
const imageData = fs.readFileSync(imageFile);

// Convert the image data to Base64
const base64ImageData = imageData.toString('base64');

console.log(base64ImageData);
