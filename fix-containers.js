const fs = require('fs');
const path = require('path');

function replaceInDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      replaceInDir(fullPath);
    } else if (fullPath.endsWith('.tsx')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      let changed = false;
      
      if (content.includes('className="container"')) {
        content = content.replace(/className="container"/g, 'className="w-full max-w-[1240px] mx-auto px-6"');
        changed = true;
      }
      
      if (content.includes('className="container mx-auto px-6"')) {
        content = content.replace(/className="container mx-auto px-6"/g, 'className="w-full max-w-[1240px] mx-auto px-6"');
        changed = true;
      }

      if (content.includes('className="container mx-auto px-6 relative z-10"')) {
        content = content.replace(/className="container mx-auto px-6 relative z-10"/g, 'className="w-full max-w-[1240px] mx-auto px-6 relative z-10"');
        changed = true;
      }

      if (changed) {
        fs.writeFileSync(fullPath, content);
        console.log('Updated: ' + fullPath);
      }
    }
  }
}

replaceInDir('src/app');
