const fs = require('fs');
const path = require('path');

async function main() {
  console.log('📝 Applying Unsplash images to activities.ts');
  console.log('');

  // Read the activities file
  const activitiesPath = path.join(process.cwd(), 'data', 'activities.ts');
  let fileContent = fs.readFileSync(activitiesPath, 'utf-8');

  // Count current state of activities
  const totalActivities = (fileContent.match(/id:\s*["']\d+["']/g) || []).length;
  const activitiesWithImages = (fileContent.match(/imageUrl:/g) || []).length;
  const activitiesMissingImages = totalActivities - activitiesWithImages;

  console.log('📊 Current state of activities.ts:');
  console.log(`   Total activities: ${totalActivities}`);
  console.log(`   With images: ${activitiesWithImages}`);
  console.log(`   Missing images: ${activitiesMissingImages}`);
  console.log('');

  // Read the saved image URLs
  const imagesPath = path.join(process.cwd(), 'scripts', 'unsplash-images.json');
  if (!fs.existsSync(imagesPath)) {
    console.error('❌ Error: unsplash-images.json not found');
    console.error('Please run fetch-unsplash-images.ts first');
    process.exit(1);
  }

  const imageUpdates = JSON.parse(fs.readFileSync(imagesPath, 'utf-8'));
  const updateCount = Object.keys(imageUpdates).length;

  if (updateCount === 0) {
    console.log('No images to apply');
    return;
  }

  console.log(`Found ${updateCount} images in unsplash-images.json`);
  console.log('');

  // For each entry, find the activity in the file and add imageUrl
  let appliedCount = 0;
  let skippedCount = 0;
  let notFoundCount = 0;

  for (const [key, value] of Object.entries(imageUpdates)) {
    // Determine if value is a string URL or an object with url property
    const imageUrl = typeof value === 'string' ? value : value.url;
    
    if (!imageUrl) {
      console.log(`  ⚠ Skipping ${key} (no URL found)`);
      continue;
    }

    // Check if key is a numeric ID or an activity name
    const isNumericId = /^\d+$/.test(key);
    
    let match;
    let activityBlock;
    let matchIndex;

    if (isNumericId) {
      // Find by ID
      const idPattern = new RegExp(`(\\{[^}]*id:\\s*["']${key}["'][^}]*?)(\\})`, 's');
      match = fileContent.match(idPattern);
      if (match) {
        activityBlock = match[1];
        matchIndex = match.index;
      }
    } else {
      // Find by name - need to escape special regex characters in the name
      const escapedName = key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      // Match activity block containing this name
      const namePattern = new RegExp(`(\\{[^}]*name:\\s*["']${escapedName}["'][^}]*?)(\\})`, 's');
      match = fileContent.match(namePattern);
      if (match) {
        activityBlock = match[1];
        matchIndex = match.index;
      }
    }

    if (match && activityBlock) {
      // Check if imageUrl already exists
      if (activityBlock.includes('imageUrl:')) {
        console.log(`  Skipping ${key} (imageUrl already exists)`);
        skippedCount++;
        continue;
      }

      // Find where to insert the imageUrl (after website or address)
      const insertAfterPattern = /(website:\s*"[^"]*",?|address:\s*"[^"]*",?)/;
      const insertMatch = activityBlock.match(insertAfterPattern);

      if (insertMatch) {
        const insertPoint = matchIndex + insertMatch.index + insertMatch[0].length;
        const before = fileContent.substring(0, insertPoint);
        const after = fileContent.substring(insertPoint);

        // Insert the imageUrl with proper formatting
        fileContent = before + `\n    imageUrl: "${imageUrl}",` + after;
        appliedCount++;
        console.log(`  ✓ Applied image to ${key}`);
      } else {
        console.log(`  ⚠ Could not find insertion point for ${key}`);
        notFoundCount++;
      }
    } else {
      console.log(`  ✗ Could not find activity ${key} in file`);
      notFoundCount++;
    }
  }

  // Write the updated content back
  if (appliedCount > 0) {
    fs.writeFileSync(activitiesPath, fileContent, 'utf-8');
  }

  // Re-count after changes
  const newActivitiesWithImages = (fileContent.match(/imageUrl:/g) || []).length;
  const newActivitiesMissingImages = totalActivities - newActivitiesWithImages;
  
  console.log('');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('Summary:');
  console.log(`  Applied: ${appliedCount}`);
  console.log(`  Skipped (already has image): ${skippedCount}`);
  console.log(`  Not found: ${notFoundCount}`);
  console.log('');
  console.log('📊 Final state of activities.ts:');
  console.log(`   Total activities: ${totalActivities}`);
  console.log(`   With images: ${newActivitiesWithImages}`);
  console.log(`   Missing images: ${newActivitiesMissingImages}`);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
}

main().catch(console.error);
