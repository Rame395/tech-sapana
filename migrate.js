const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

const pages = [
  { file: 'aboutts.html', route: 'about', name: 'About' },
  { file: 'service.html', route: 'services', name: 'Services' },
  { file: 'portfolio.html', route: 'portfolio', name: 'Portfolio' },
  { file: 'coursepage.html', route: 'courses', name: 'Courses' },
  { file: 'contact.html', route: 'contact', name: 'Contact' },
  { file: 'coursedetails.html', route: 'courses/[slug]', name: 'CourseDetails' },
];

let allCss = '';

pages.forEach(page => {
  const htmlPath = path.join(__dirname, 'legacy-html', page.file);
  if (!fs.existsSync(htmlPath)) return;

  const html = fs.readFileSync(htmlPath, 'utf8');
  const dom = new JSDOM(html);
  const document = dom.window.document;

  // Extract styles
  const styles = document.querySelectorAll('style');
  styles.forEach(style => {
    let cssText = style.textContent;
    // Remove :root and html[] blocks to prevent duplication, since we put them in globals.css
    cssText = cssText.replace(/:root\s*\{[^}]+\}/g, '');
    cssText = cssText.replace(/html\[data-theme="[^"]+"\]\s*\{[^}]+\}/g, '');
    cssText = cssText.replace(/\*,\s*\*\:\:before,\s*\*\:\:after\s*\{[^}]+\}/g, '');
    cssText = cssText.replace(/html\s*\{[^}]+\}/g, '');
    cssText = cssText.replace(/body\s*\{[^}]+\}/g, '');
    allCss += `/* Styles from ${page.file} */\n` + cssText + '\n';
  });

  // Extract body content
  const body = document.querySelector('body');
  
  // Remove nav and footer elements as they are in layout
  const navs = body.querySelectorAll('nav, .navbar');
  navs.forEach(nav => nav.remove());
  
  const footers = body.querySelectorAll('footer, .footer');
  footers.forEach(footer => footer.remove());

  // Also remove script tags
  const scripts = body.querySelectorAll('script');
  scripts.forEach(script => script.remove());

  // Convert innerHTML to JSX using simple string replacement
  let jsx = body.innerHTML;
  
  // Basic JSX conversions
  jsx = jsx.replace(/class=/g, 'className=');
  jsx = jsx.replace(/for=/g, 'htmlFor=');
  
  // Convert HTML comments to JSX comments
  jsx = jsx.replace(/<!--([\s\S]*?)-->/g, '{/*$1*/}');

  // Convert inline styles to objects is too complex for regex, so we'll just clear them or leave them if they are simple
  // But wait, JSX requires style to be an object. We'll strip style attributes for now to prevent build errors.
  jsx = jsx.replace(/style="[^"]*"/g, '');
  
  // Self closing tags
  jsx = jsx.replace(/<img([^>]+[^\/])>/g, '<img$1 />');
  jsx = jsx.replace(/<input([^>]+[^\/])>/g, '<input$1 />');
  jsx = jsx.replace(/<br>/g, '<br />');
  jsx = jsx.replace(/<hr([^>]*[^\/])?>/g, '<hr$1 />');

  // Fix unclosed tags caused by naive regex
  jsx = jsx.replace(/ \/>/g, ' />');

  // Create Next.js page
  const pageDir = path.join(__dirname, 'src', 'app', page.route);
  fs.mkdirSync(pageDir, { recursive: true });
  
  const pageComponent = `
export default function ${page.name}() {
  return (
    <>
      ${jsx}
    </>
  );
}
`;
  
  fs.writeFileSync(path.join(pageDir, 'page.tsx'), pageComponent);
  console.log(`Created page: ${page.route}`);
});

// Write extracted CSS to a new file
fs.writeFileSync(path.join(__dirname, 'src', 'app', 'legacy-styles.css'), allCss);
console.log('Extracted legacy styles to legacy-styles.css');
