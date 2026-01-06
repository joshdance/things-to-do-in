"use client";

import { useParams, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { getActivityBySlug, getSimilarActivities, getAllActivities } from "@/data/activities";
import { cities } from "@/data/cities";
import { Activity, Tag } from "@/types/activity";
import { Suspense } from "react";
import { useFavorites } from "@/contexts/FavoritesContext";
import { ListSidebar } from "@/components/ListSidebar";

const categoryLabels: Record<string, string> = {
  "food-drink": "Food & Drink",
  "attractions": "Attractions",
  "outdoor": "Outdoor",
  "arts-culture": "Arts & Culture",
  "entertainment": "Entertainment",
  "shopping": "Shopping",
  "sports": "Sports",
};

const tagIcons: Record<Tag, string> = {
  "kid-friendly": "👶",
  "stroller-friendly": "🍼",
  "wheelchair-accessible": "♿",
  "dog-friendly": "🐶",
  "free": "💰",
  "budget": "💵",
  "rainy-day": "🌧️",
  "quick-stop": "⏱️",
  "half-day": "🕐",
  "full-day": "📅",
};

function ActivityDetailsContent() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const city = params.city as string;
  const slug = params.slug as string;

  const {
    favorites,
    isSidebarOpen,
    justAddedId,
    toggleFavorite,
    removeFavorite,
    toggleSidebar,
  } = useFavorites();

  const activity = getActivityBySlug(city, slug);
  const similarActivities = activity ? getSimilarActivities(activity, 3) : [];
  const isFavorite = activity ? favorites.includes(activity.id) : false;

  // Get all activities for the favorites sidebar
  const allActivities = getAllActivities();
  const favoriteActivities = allActivities.filter((act) =>
    favorites.includes(act.id)
  );

  if (!activity) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Activity Not Found</h1>
          <p className="text-gray-600 mb-8">
            The activity you're looking for doesn't exist.
          </p>
          <Link
            href={`/?city=${city}`}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Activities
          </Link>
        </div>
      </div>
    );
  }

  const cityData = cities[city as keyof typeof cities];
  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(activity.address)}`;
  const staticMapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${encodeURIComponent(activity.address)}&zoom=15&size=600x300&markers=color:red%7C${encodeURIComponent(activity.address)}&key=YOUR_API_KEY`;

  // Build return URL with filters
  const returnUrl = (() => {
    const params = new URLSearchParams();
    params.set("city", city);
    const category = searchParams.get("category");
    const tags = searchParams.get("tags");
    if (category) params.set("category", category);
    if (tags) params.set("tags", tags);
    return `/?${params.toString()}`;
  })();

  return (
    <div className="min-h-screen bg-gray-50">
      <ListSidebar
        isOpen={isSidebarOpen}
        onToggle={toggleSidebar}
        favorites={favoriteActivities}
        onRemoveFavorite={removeFavorite}
        justAddedId={justAddedId}
      />
      {/* Header */}
      <header className="bg-blue-600 text-white py-6 px-4">
        <div className="max-w-4xl mx-auto">
          <nav className="flex items-center gap-2 text-sm mb-4">
            <Link href="/" className="hover:underline">
              Home
            </Link>
            <span>/</span>
            <Link href={returnUrl} className="hover:underline">
              {cityData?.name || city}
            </Link>
            <span>/</span>
            <span className="text-blue-200">{activity.name}</span>
          </nav>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
          {/* Placeholder Image */}
          <div className="h-64 md:h-96 bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center relative">
            <svg
              className="w-32 h-32 text-white opacity-50"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            {/* Favorite Button */}
            <button
              onClick={() => toggleFavorite(activity.id)}
              className="absolute top-4 right-4 p-3 bg-white rounded-full shadow-lg hover:scale-110 transition-transform"
              aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
            >
              <svg
                className={`w-7 h-7 transition-colors ${
                  isFavorite ? "fill-red-500 text-red-500" : "fill-none text-gray-400 hover:text-red-500"
                }`}
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </button>
          </div>

          <div className="p-8">
            {/* Title and Meta */}
            <div className="mb-6">
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <span className="inline-block bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded">
                  {categoryLabels[activity.category]}
                </span>
                {activity.priceRange && (
                  <span className="text-lg font-medium text-gray-700">
                    {activity.priceRange}
                  </span>
                )}
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                {activity.name}
              </h1>
            </div>

            {/* Quick Info Bar */}
            <div className="flex flex-wrap gap-4 mb-6 pb-6 border-b border-gray-200">
              <a
                href={mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-sm font-medium">{activity.address}</span>
              </a>
            </div>

            {/* Tags */}
            {activity.tags && activity.tags.length > 0 && (
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-700 mb-3">
                  Good to Know
                </h3>
                <div className="flex flex-wrap gap-2">
                  {activity.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center text-sm bg-gray-100 text-gray-700 px-3 py-2 rounded-lg border border-gray-200"
                    >
                      <span className="mr-2">{tagIcons[tag]}</span>
                      {tag
                        .split("-")
                        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                        .join(" ")}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Description */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">About</h2>
              <p className="text-gray-700 text-lg leading-relaxed">
                {activity.description}
              </p>
            </div>

            {/* Recommended By */}
            {activity.recommendedBy && activity.recommendedBy.length > 0 && (
              <div className="mb-8 bg-green-50 border border-green-200 rounded-lg p-6">
                <div className="flex items-start gap-3">
                  <svg
                    className="w-6 h-6 text-green-600 mt-1 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      Recommended By
                    </h3>
                    <div className="space-y-2">
                      {activity.recommendedBy.map((rec, index) => (
                        <div key={index}>
                          {rec.articleUrl && rec.articleTitle ? (
                            <a
                              href={rec.articleUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:text-blue-800 hover:underline font-medium"
                            >
                              {rec.articleTitle} ({rec.source})
                            </a>
                          ) : (
                            <span className="text-gray-700 font-medium">
                              {rec.source}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 mb-8">
              <a
                href={mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 min-w-[200px] inline-flex items-center justify-center bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                    clipRule="evenodd"
                  />
                </svg>
                Get Directions
              </a>
              {activity.website && (
                <a
                  href={activity.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 min-w-[200px] inline-flex items-center justify-center bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-900 transition-colors font-medium"
                >
                  Visit Website
                  <svg className="w-5 h-5 ml-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                    <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                  </svg>
                </a>
              )}
            </div>

            {/* Map Section - Static Map that links to Google Maps */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Location</h2>
              <a
                href={mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-lg overflow-hidden border-2 border-gray-200 hover:border-blue-500 transition-colors"
              >
                <div className="h-64 bg-gray-200 flex items-center justify-center relative group">
                  <svg
                    className="w-16 h-16 text-gray-400 group-hover:text-blue-500 transition-colors"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all flex items-center justify-center">
                    <span className="bg-blue-600 text-white px-4 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity font-medium">
                      Open in Google Maps
                    </span>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Similar Activities */}
        {similarActivities.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              You Might Also Like
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {similarActivities.map((similar) => (
                <Link
                  key={similar.id}
                  href={`/${similar.city}/${similar.slug}?${searchParams.toString()}`}
                  className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden"
                >
                  <div className="h-32 bg-gradient-to-br from-blue-300 to-blue-500 flex items-center justify-center">
                    <svg
                      className="w-12 h-12 text-white opacity-50"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div className="p-4">
                    <span className="inline-block bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded mb-2">
                      {categoryLabels[similar.category]}
                    </span>
                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                      {similar.name}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {similar.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Back Button */}
        <div className="text-center">
          <Link
            href={returnUrl}
            className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to all activities
          </Link>
        </div>
      </main>

      <footer className="bg-gray-800 text-white py-6 px-4 mt-12">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-gray-400">
            Things to Do in {cityData?.name || city} - Discover your next adventure
          </p>
        </div>
      </footer>
    </div>
  );
}

export default function ActivityDetailsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50" />}>
      <ActivityDetailsContent />
    </Suspense>
  );
}
