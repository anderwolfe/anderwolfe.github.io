const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname);

fs.readdir(directoryPath, (err, files) => {
  if (err) {
    return console.error('Unable to scan directory: ' + err);
  }

  let fileList = files
    .filter(file => file !== 'index.html' && file !== 'generate_index.js')
    .map(file => `<li><a href="${file}">${file}</a></li>`)
    .join('\n');

  let htmlContent = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Directory Listing</title>
  </head>
  <body>
    <h1>Contents of the Directory</h1>
    <ul>
      ${fileList}
    </ul>
  </body>
  </html>
  `;

  fs.writeFileSync(path.join(directoryPath, 'index.html'), htmlContent, 'utf8');
  console.log('index.html has been generated');
});