const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, 'watchlist');

function readDirectory(dirPath, folderName = '') {
  let fileList = [];
  const files = fs.readdirSync(dirPath);

  files.forEach(file => {
    const filePath = path.join(dirPath, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      const subfolderContent = readDirectory(filePath, path.join(folderName, file));
      if (subfolderContent.length > 0) {
        fileList.push(`
          <h2>${path.join(folderName, file)}</h2>
          <hr>
          <ul>
            ${subfolderContent.join('\n')}
          </ul>
          <p style="page-break-after: always;"></p>
        `);
      }
    } else if (path.extname(file) === '.url') {
      const content = fs.readFileSync(filePath, 'utf-8');
      const urlMatch = content.match(/URL=(.*)/);
      const url = urlMatch ? urlMatch[1] : '#';
      const displayName = folderName ? path.join(folderName, file) : file;
      fileList.push(`<li><a href="${url}">${displayName}</a></li>`);
    }
  });

  return fileList;
}

const fileList = readDirectory(directoryPath).join('\n');

const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Directory Listing</title>
</head>
<body>
  <h1>Watchlist</h1>
  ${fileList}
</body>
</html>
`;

fs.writeFileSync(path.join(__dirname, 'watchlist.html'), htmlContent, 'utf8');
console.log('watchlist.html has been generated');
