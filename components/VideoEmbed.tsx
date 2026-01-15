import { Video } from "@/types/activity";

interface VideoEmbedProps {
  video: Video;
}

function getEmbedUrl(video: Video): string {
  const { url, platform } = video;

  switch (platform) {
    case "youtube": {
      // Handle both regular YouTube URLs and Shorts
      const videoId = extractYouTubeId(url);
      if (videoId) {
        return `https://www.youtube.com/embed/${videoId}`;
      }
      return url;
    }
    case "instagram": {
      // Instagram embed format: https://www.instagram.com/p/{postId}/embed
      const match = url.match(/instagram\.com\/(p|reel|reels)\/([^/?]+)/);
      if (match) {
        const postId = match[2];
        return `https://www.instagram.com/p/${postId}/embed`;
      }
      return url;
    }
    case "facebook": {
      // Facebook video embeds need the plugin URL
      return `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(url)}&show_text=false`;
    }
    case "tiktok": {
      // TikTok embed format
      const match = url.match(/tiktok\.com\/@[^/]+\/video\/(\d+)/);
      if (match) {
        const videoId = match[1];
        return `https://www.tiktok.com/embed/v2/${videoId}`;
      }
      return url;
    }
    default:
      return url;
  }
}

function extractYouTubeId(url: string): string | null {
  // Handle youtube.com/watch?v=VIDEO_ID
  const watchMatch = url.match(/youtube\.com\/watch\?v=([^&]+)/);
  if (watchMatch) return watchMatch[1];

  // Handle youtu.be/VIDEO_ID
  const shortMatch = url.match(/youtu\.be\/([^?]+)/);
  if (shortMatch) return shortMatch[1];

  // Handle youtube.com/shorts/VIDEO_ID
  const shortsMatch = url.match(/youtube\.com\/shorts\/([^?]+)/);
  if (shortsMatch) return shortsMatch[1];

  return null;
}

function getPlatformIcon(platform: Video["platform"]): string {
  switch (platform) {
    case "youtube":
      return "▶️";
    case "instagram":
      return "📷";
    case "facebook":
      return "👍";
    case "tiktok":
      return "🎵";
    default:
      return "🎥";
  }
}

function isPortraitVideo(video: Video): boolean {
  // If orientation is explicitly set, use that
  if (video.orientation) {
    return video.orientation === "portrait";
  }

  // Auto-detect based on platform and URL patterns
  const { url, platform } = video;

  // YouTube Shorts are always portrait
  if (platform === "youtube" && url.includes("/shorts/")) {
    return true;
  }

  // Instagram Reels are always portrait
  if (platform === "instagram" && url.match(/\/(reel|reels)\//)) {
    return true;
  }

  // TikTok videos are always portrait
  if (platform === "tiktok") {
    return true;
  }

  // Default to landscape
  return false;
}

export function VideoEmbed({ video }: VideoEmbedProps) {
  const embedUrl = getEmbedUrl(video);
  const icon = getPlatformIcon(video.platform);
  const isPortrait = isPortraitVideo(video);

  // Portrait videos use 9:16 aspect ratio, landscape uses 16:9
  const aspectRatioClass = isPortrait ? "aspect-[9/16]" : "aspect-video";

  return (
    <div className="flex flex-col">
      <div className={`relative ${aspectRatioClass} bg-gray-900 rounded-lg overflow-hidden max-h-[600px]`}>
        <iframe
          src={embedUrl}
          className="absolute inset-0 w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title={video.title || `${video.platform} video`}
        />
      </div>
      {video.title && (
        <div className="mt-2 flex items-start gap-2">
          <span className="text-lg">{icon}</span>
          <p className="text-sm text-gray-700 font-medium">{video.title}</p>
        </div>
      )}
    </div>
  );
}
