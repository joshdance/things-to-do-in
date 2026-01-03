"use client";

import { useState } from "react";
import { getActivitiesByCity } from "@/data/activities";
import { cities } from "@/data/cities";
import { ActivityCard } from "@/components/ActivityCard";
import { CategoryFilter } from "@/components/CategoryFilter";
import { City } from "@/types/activity";

export default function Home() {
  const [selectedCity, setSelectedCity] = useState<City>("oklahoma-city");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const cityActivities = getActivitiesByCity(selectedCity);

  const filteredActivities =
    selectedCategory === "all"
      ? cityActivities
      : cityActivities.filter((activity) => activity.category === selectedCategory);

  const currentCity = cities[selectedCity];

  return (
    <div className="min-h-screen">
      <header className="bg-blue-600 text-white py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-2">
            <h1 className="text-4xl md:text-5xl font-bold">
              Things to Do in{" "}
              <select
                value={selectedCity}
                onChange={(e) => {
                  setSelectedCity(e.target.value as City);
                  setSelectedCategory("all");
                }}
                className="bg-white text-blue-600 rounded-lg px-4 py-2 text-4xl md:text-5xl font-bold cursor-pointer hover:bg-blue-50 transition-colors"
              >
                {Object.entries(cities).map(([key, city]) => (
                  <option key={key} value={key}>
                    {city.name}
                  </option>
                ))}
              </select>
            </h1>
          </div>
          <p className="text-lg md:text-xl text-blue-100">
            Discover the best attractions, restaurants, and activities in {currentCity.name}
          </p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Filter by Category</h2>
          <CategoryFilter
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
        </div>

        <div className="mb-4">
          <p className="text-gray-600">
            Showing {filteredActivities.length} {filteredActivities.length === 1 ? "activity" : "activities"}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredActivities.map((activity) => (
            <ActivityCard key={activity.id} activity={activity} />
          ))}
        </div>

        {filteredActivities.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No activities found in this category.</p>
          </div>
        )}
      </main>

      <footer className="bg-gray-800 text-white py-6 px-4 mt-12">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-400">Things to Do in {currentCity.name} - Discover your next adventure</p>
        </div>
      </footer>
    </div>
  );
}
