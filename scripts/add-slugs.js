const fs = require('fs');
const path = require('path');

function generateSlug(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

const filePath = path.join(__dirname, '../data/activities.ts');
let content = fs.readFileSync(filePath, 'utf8');

// Find all activity objects and add slug field after name
const regex = /(\{[\s\S]*?id: "(\d+)",\s*name: "([^"]+)",)/g;

content = content.replace(regex, (match, group1, id, name) => {
  const slug = generateSlug(name);
  return match + `\n    slug: "${slug}",`;
});

fs.writeFileSync(filePath, content, 'utf8');
console.log('Slugs added successfully!');
