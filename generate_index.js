const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, 'watchlist');

fs.readdir(directoryPath, (err, files) => {
  if (err) {
    return console.error('Unable to scan directory: ' + err);
  }

  let fileList = files
    .filter(file => path.extname(file) === '.url')
    .map(file => {
      const filePath = path.join(directoryPath, file);
      const content = fs.readFileSync(filePath, 'utf-8');
      const urlMatch = content.match(/URL=(.*)/);
      const url = urlMatch ? urlMatch[1] : '#';
      return `<li><a href="${url}">${file}</a></li>`;
    })
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
    <h1>Watchlist</h1>
    <ul>
      ${fileList}
    </ul>
  </body>
  </html>
  `;

  fs.writeFileSync(path.join(__dirname, 'watchlist.html'), htmlContent, 'utf8');
  console.log('watchlist.html has been generated');
});
