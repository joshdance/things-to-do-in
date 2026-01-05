import { Tag } from "@/types/activity";

interface TagFilterProps {
  selectedTags: Tag[];
  onTagToggle: (tag: Tag) => void;
}

const tagLabels: Record<Tag, { label: string; icon: string }> = {
  "kid-friendly": { label: "Kid-friendly", icon: "👶" },
  "stroller-friendly": { label: "Stroller-friendly", icon: "🍼" },
  "wheelchair-accessible": { label: "Wheelchair accessible", icon: "♿" },
  "dog-friendly": { label: "Dog-friendly", icon: "🐶" },
  "free": { label: "Free", icon: "💰" },
  "budget": { label: "Budget", icon: "💵" },
  "rainy-day": { label: "Good for rainy days", icon: "🌧️" },
  "quick-stop": { label: "Quick stop", icon: "⏱️" },
  "half-day": { label: "Half-day", icon: "🕐" },
  "full-day": { label: "Full-day", icon: "📅" },
};

export function TagFilter({ selectedTags, onTagToggle }: TagFilterProps) {
  const tags = Object.keys(tagLabels) as Tag[];

  return (
    <div className="space-y-2">
      <h3 className="text-lg font-semibold text-gray-900">Filter by Tags</h3>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => {
          const isSelected = selectedTags.includes(tag);
          const { label, icon } = tagLabels[tag];

          return (
            <button
              key={tag}
              onClick={() => onTagToggle(tag)}
              className={`px-3 py-2 rounded-full text-sm font-medium transition-colors ${
                isSelected
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <span className="mr-1">{icon}</span>
              {label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
