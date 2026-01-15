# Unsplash Image Fetching Scripts

These scripts automate fetching images from Unsplash for activities that don't have images yet.

## Prerequisites

1. Set up your Unsplash API credentials in `.env.local`:
   ```
   UNSPLASH_ACCESS_KEY=your_access_key
   UNSPLASH_SECRET_KEY=your_secret_key
   UNSPLASH_APP_ID=your_app_id
   ```

2. Make sure all dependencies are installed:
   ```bash
   npm install
   ```

## Usage

### Step 1: Fetch Images from Unsplash

```bash
npm run fetch-images
```

This script will:
- Find all activities without images
- Search Unsplash for relevant images (activity name + city)
- Use fallback searches if no results found (activity name, category + city, category)
- Rate limit to 50 requests per hour (1 request every 75 seconds)
- Save image URLs to `scripts/unsplash-images.json`
- Track downloads as per Unsplash API guidelines

**Note:** This will take approximately 75 seconds per activity. The script will show you the estimated time before starting.

### Step 2: Apply Images to Activities

```bash
npm run apply-images
```

This script will:
- Read the saved image URLs from `scripts/unsplash-images.json`
- Update `data/activities.ts` with the `imageUrl` field for each activity
- Skip activities that already have images

## Rate Limiting

The script respects Unsplash's free tier limit of 50 requests per hour by:
- Waiting 75 seconds between each request
- Only fetching images for activities that don't have them yet

## Search Strategy

For each activity, the script tries multiple search queries in order:

1. **Primary:** Activity name + City (e.g., "Space Needle Seattle")
2. **Fallback 1:** Activity name only (e.g., "Space Needle")
3. **Fallback 2:** Category + City (e.g., "attractions Seattle")
4. **Fallback 3:** Category only (e.g., "attractions")

This ensures the best possible match while having reasonable fallbacks.

## Output

The fetched images are stored in `scripts/unsplash-images.json` with the format:
```json
{
  "activity-id": "https://images.unsplash.com/...",
  "another-id": "https://images.unsplash.com/..."
}
```

## Troubleshooting

- **Rate limit errors:** The script already waits 75 seconds between requests. If you still hit rate limits, increase `RATE_LIMIT_DELAY` in `fetch-unsplash-images.ts`
- **No images found:** Some activities may not have good matches on Unsplash. You can manually add images by editing `data/activities.ts`
- **Script crashes:** Check that your `.env.local` file has the correct Unsplash credentials

## Attribution

According to Unsplash API guidelines, make sure to:
- Display photographer attribution when showing images
- Link back to the photographer's Unsplash profile
- Trigger download tracking (automatically handled by the script)
