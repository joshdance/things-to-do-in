"use client";

import { Category } from "@/types/activity";

interface CategoryFilterProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const categories: { value: string; label: string }[] = [
  { value: "all", label: "All" },
  { value: "food-drink", label: "Food & Drink" },
  { value: "attractions", label: "Attractions" },
  { value: "outdoor", label: "Outdoor" },
  { value: "arts-culture", label: "Arts & Culture" },
  { value: "entertainment", label: "Entertainment" },
  { value: "shopping", label: "Shopping" },
  { value: "sports", label: "Sports" },
];

export function CategoryFilter({ selectedCategory, onCategoryChange }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((category) => (
        <button
          key={category.value}
          onClick={() => onCategoryChange(category.value)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
            selectedCategory === category.value
              ? "bg-blue-600 text-white"
              : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
          }`}
        >
          {category.label}
        </button>
      ))}
    </div>
  );
}
