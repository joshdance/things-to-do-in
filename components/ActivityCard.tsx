import { Activity } from "@/types/activity";

interface ActivityCardProps {
  activity: Activity;
}

const categoryLabels: Record<string, string> = {
  "food-drink": "Food & Drink",
  "attractions": "Attractions",
  "outdoor": "Outdoor",
  "arts-culture": "Arts & Culture",
  "entertainment": "Entertainment",
  "shopping": "Shopping",
  "sports": "Sports",
};

export function ActivityCard({ activity }: ActivityCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden">
      <div className="p-6">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-xl font-semibold text-gray-900">{activity.name}</h3>
          {activity.priceRange && (
            <span className="text-sm font-medium text-gray-600 bg-gray-100 px-2 py-1 rounded">
              {activity.priceRange}
            </span>
          )}
        </div>

        <div className="mb-3">
          <span className="inline-block bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
            {categoryLabels[activity.category]}
          </span>
        </div>

        <p className="text-gray-600 text-sm mb-4">{activity.description}</p>

        <div className="text-sm text-gray-500 mb-3">
          <svg className="inline w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
          </svg>
          {activity.address}
        </div>

        {activity.website && (
          <a
            href={activity.website}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            Visit Website
            <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20">
              <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
              <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
            </svg>
          </a>
        )}
      </div>
    </div>
  );
}
