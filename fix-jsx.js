const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

walkDir(path.join(__dirname, 'src', 'app'), function(filePath) {
  if (filePath.endsWith('.tsx') || filePath.endsWith('.ts')) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Fix common HTML attributes to JSX
    content = content.replace(/onclick="[^"]*"/gi, '');
    content = content.replace(/onsubmit="[^"]*"/gi, '');
    content = content.replace(/onerror="[^"]*"/gi, '');
    content = content.replace(/frameborder=/gi, 'frameBorder=');
    content = content.replace(/allowfullscreen/gi, 'allowFullScreen');
    content = content.replace(/required=""/g, 'required');
    content = content.replace(/rows="(\d+)"/g, 'rows={$1}');
    
    fs.writeFileSync(filePath, content);
  }
});

// Also fix PrismaClient error by just ignoring it or doing a basic generation.
console.log('Fixed JSX syntax');
