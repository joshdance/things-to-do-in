import { createApi } from 'unsplash-js';
import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

const unsplash = createApi({
  accessKey: process.env.UNSPLASH_ACCESS_KEY!,
});

// Rate limiting: 50 requests per hour = 1 request every 72 seconds
// We'll use 90 seconds to be conservative and avoid hitting the limit
const RATE_LIMIT_DELAY = 90000; // 90 seconds in milliseconds

interface UnsplashPhoto {
  url: string;
  photographerName: string;
  photographerUsername: string;
  photographerUrl: string;
}

interface Activity {
  id: string;
  name: string;
  slug: string;
  description: string;
  category: string;
  address: string;
  city: string;
  website?: string;
  imageUrl?: string;
  unsplashPhoto?: UnsplashPhoto;
  priceRange?: string;
  tags?: string[];
  recommendedBy?: any[];
  articles?: any[];
  videos?: any[];
}

// Sleep function for rate limiting
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Function to search for an image on Unsplash
async function searchUnsplashImage(query: string): Promise<UnsplashPhoto | null> {
  try {
    console.log(`  Searching Unsplash for: "${query}"`);
    const result = await unsplash.search.getPhotos({
      query,
      page: 1,
      perPage: 1,
      orientation: 'landscape',
    });

    if (result.errors) {
      console.error('  Error from Unsplash API:', result.errors);
      return null;
    }

    if (result.response && result.response.results.length > 0) {
      const photo = result.response.results[0];

      // Create UnsplashPhoto object with proper attribution
      const unsplashPhoto: UnsplashPhoto = {
        url: photo.urls.regular,
        photographerName: photo.user.name,
        photographerUsername: photo.user.username,
        photographerUrl: photo.user.links.html,
      };

      console.log(`  ✓ Found image by ${photo.user.name} (@${photo.user.username})`);

      // Trigger download tracking as per Unsplash API guidelines
      if (photo.links.download_location) {
        await unsplash.photos.trackDownload({
          downloadLocation: photo.links.download_location,
        });
      }

      return unsplashPhoto;
    }

    console.log('  ✗ No images found');
    return null;
  } catch (error) {
    console.error('  Error searching Unsplash:', error);
    return null;
  }
}

// Function to generate search query for an activity
function generateSearchQuery(activity: Activity, city: string): string {
  // Clean up the activity name and city for better search results
  const activityName = activity.name.replace(/&/g, 'and');
  const cityName = city.replace(/-/g, ' ');

  // Start with the most specific query: activity name + city
  return `${activityName} ${cityName}`;
}

// Function to get fallback search queries
function getFallbackQueries(activity: Activity, city: string): string[] {
  const cityName = city.replace(/-/g, ' ');
  const activityName = activity.name.replace(/&/g, 'and');

  return [
    activityName, // Just the activity name
    `${activity.category} ${cityName}`, // Category + city
    activity.category, // Just the category
  ];
}

async function main() {
  console.log('🖼️  Starting Unsplash Image Fetching Script');
  console.log('⏱️  Rate limit: 1 request every 75 seconds (50 requests/hour max)');
  console.log('');

  // Read the activities file
  const activitiesPath = path.join(process.cwd(), 'data', 'activities.ts');
  const fileContent = fs.readFileSync(activitiesPath, 'utf-8');

  // Parse the activities array (this is a simple approach, assumes proper formatting)
  // We'll extract activities using regex
  const activitiesMatch = fileContent.match(/export const activities: Activity\[\] = (\[[\s\S]*?\]);/);

  if (!activitiesMatch) {
    console.error('Could not find activities array in file');
    process.exit(1);
  }

  // Import the activities directly
  const { activities } = await import('../data/activities');

  console.log(`Found ${activities.length} total activities`);

  // Filter activities that don't have images yet
  const activitiesWithoutImages = activities.filter((activity: Activity) => !activity.imageUrl && !activity.unsplashPhoto);

  console.log(`${activitiesWithoutImages.length} activities need images`);
  console.log('');

  if (activitiesWithoutImages.length === 0) {
    console.log('✓ All activities already have images!');
    return;
  }

  // Ask user to confirm before starting
  console.log(`This will take approximately ${Math.ceil((activitiesWithoutImages.length * 90) / 60)} minutes`);
  console.log('Press Ctrl+C to cancel, or the script will start in 5 seconds...');
  await sleep(5000);

  // Output file path
  const outputPath = path.join(process.cwd(), 'scripts', 'unsplash-images.json');

  // Load existing progress if file exists
  let imageUpdates: { [key: string]: UnsplashPhoto } = {};
  if (fs.existsSync(outputPath)) {
    try {
      const existingData = fs.readFileSync(outputPath, 'utf-8');
      imageUpdates = JSON.parse(existingData);
      console.log(`📂 Loaded ${Object.keys(imageUpdates).length} existing images from previous runs`);
      console.log('');
    } catch (error) {
      console.log('⚠️  Could not load existing progress file, starting fresh');
    }
  }

  let successCount = 0;
  let failCount = 0;

  // Process each activity
  for (let i = 0; i < activitiesWithoutImages.length; i++) {
    const activity = activitiesWithoutImages[i];
    const cityName = activity.city;

    // Skip if we already have an image for this activity
    if (imageUpdates[activity.name]) {
      console.log(`[${i + 1}/${activitiesWithoutImages.length}] Skipping: ${activity.name} (already processed)`);
      continue;
    }

    console.log(`[${i + 1}/${activitiesWithoutImages.length}] Processing: ${activity.name}`);

    // Try primary search query
    let unsplashPhoto = await searchUnsplashImage(generateSearchQuery(activity, cityName));

    // If no image found, try fallback queries
    if (!unsplashPhoto) {
      const fallbacks = getFallbackQueries(activity, cityName);
      for (const fallbackQuery of fallbacks) {
        console.log(`  Trying fallback query: "${fallbackQuery}"`);
        unsplashPhoto = await searchUnsplashImage(fallbackQuery);
        if (unsplashPhoto) break;
        await sleep(RATE_LIMIT_DELAY); // Rate limit between attempts
      }
    }

    if (unsplashPhoto) {
      imageUpdates[activity.name] = unsplashPhoto;
      successCount++;

      // Save progress immediately after each successful fetch
      try {
        fs.writeFileSync(outputPath, JSON.stringify(imageUpdates, null, 2));
        console.log(`  💾 Progress saved (${Object.keys(imageUpdates).length} total images)`);
      } catch (error) {
        console.error('  ⚠️  Failed to save progress:', error);
      }
    } else {
      failCount++;
    }

    // Rate limit between activities (unless it's the last one)
    if (i < activitiesWithoutImages.length - 1) {
      console.log(`  Waiting 90 seconds before next request...`);
      console.log('');
      await sleep(RATE_LIMIT_DELAY);
    }
  }

  console.log('');
  console.log('='.repeat(50));
  console.log('📊 Summary:');
  console.log(`  ✓ Successfully found images this run: ${successCount}`);
  console.log(`  ✗ Failed to find images this run: ${failCount}`);
  console.log(`  📦 Total images saved: ${Object.keys(imageUpdates).length}`);
  console.log('='.repeat(50));
  console.log('');

  // Final save (already saved after each fetch, but doing it again for safety)
  fs.writeFileSync(outputPath, JSON.stringify(imageUpdates, null, 2));
  console.log(`💾 Final save complete: ${outputPath}`);
  console.log('');
  console.log('To apply these images to your activities.ts file, run:');
  console.log('  node scripts/apply-unsplash-images.js');
}

main().catch(console.error);
