"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getActivitiesByCity } from "@/data/activities";
import { cities } from "@/data/cities";
import { ActivityCard } from "@/components/ActivityCard";
import { CategoryFilter } from "@/components/CategoryFilter";
import { TagFilter } from "@/components/TagFilter";
import { SearchBar } from "@/components/SearchBar";
import { ArticlesSection } from "@/components/ArticlesSection";
import { CreatorsSection } from "@/components/CreatorsSection";
import { ListSidebar } from "@/components/ListSidebar";
import { City, Tag } from "@/types/activity";
import { useFavorites } from "@/contexts/FavoritesContext";

function HomeContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const cityParam = searchParams.get("city") as City | null;
  const categoryParam = searchParams.get("category");
  const tagsParam = searchParams.get("tags");
  const searchParam = searchParams.get("search");

  const {
    favorites,
    isSidebarOpen,
    justAddedId,
    toggleFavorite,
    removeFavorite,
    toggleSidebar,
  } = useFavorites();

  const [selectedCity, setSelectedCity] = useState<City>(
    cityParam && cityParam in cities ? cityParam : "oklahoma-city"
  );
  const [selectedCategory, setSelectedCategory] = useState(categoryParam || "all");
  const [selectedTags, setSelectedTags] = useState<Tag[]>(
    tagsParam ? (tagsParam.split(",") as Tag[]) : []
  );
  const [searchQuery, setSearchQuery] = useState(searchParam || "");
  const cityActivities = getActivitiesByCity(selectedCity);

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    params.set("city", selectedCity);
    if (selectedCategory !== "all") {
      params.set("category", selectedCategory);
    }
    if (selectedTags.length > 0) {
      params.set("tags", selectedTags.join(","));
    }
    if (searchQuery) {
      params.set("search", searchQuery);
    }

    const newUrl = `/?${params.toString()}`;
    const currentUrl = `/?${searchParams.toString()}`;

    if (newUrl !== currentUrl) {
      router.push(newUrl, { scroll: false });
    }
  }, [selectedCity, selectedCategory, selectedTags, searchQuery, router, searchParams]);

  const handleCityChange = (newCity: City) => {
    setSelectedCity(newCity);
    setSelectedCategory("all");
    setSelectedTags([]);
    setSearchQuery("");
  };

  const handleTagToggle = (tag: Tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const filteredActivities = cityActivities.filter((activity) => {
    const categoryMatch =
      selectedCategory === "all" || activity.category === selectedCategory;

    const tagMatch =
      selectedTags.length === 0 ||
      selectedTags.every((tag) => activity.tags?.includes(tag));

    const searchMatch =
      !searchQuery ||
      activity.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      activity.description.toLowerCase().includes(searchQuery.toLowerCase());

    return categoryMatch && tagMatch && searchMatch;
  });

  const currentCity = cities[selectedCity];

  const favoriteActivities = cityActivities.filter((activity) =>
    favorites.includes(activity.id)
  );

  return (
    <div className="min-h-screen">
      <ListSidebar
        isOpen={isSidebarOpen}
        onToggle={toggleSidebar}
        favorites={favoriteActivities}
        onRemoveFavorite={removeFavorite}
        justAddedId={justAddedId}
      />
      <header className="bg-blue-600 text-white py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-2">
            <h1 className="text-4xl md:text-5xl font-bold">
              Things to Do in{" "}
              <select
                value={selectedCity}
                onChange={(e) => handleCityChange(e.target.value as City)}
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
        <SearchBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          resultsCount={filteredActivities.length}
        />

        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Filter by Category</h2>
          <CategoryFilter
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
        </div>

        <div className="mb-8">
          <TagFilter selectedTags={selectedTags} onTagToggle={handleTagToggle} />
        </div>

        <div className="mb-4">
          <p className="text-gray-600">
            Showing {filteredActivities.length} {filteredActivities.length === 1 ? "activity" : "activities"}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredActivities.map((activity) => (
            <ActivityCard
              key={activity.id}
              activity={activity}
              isFavorite={favorites.includes(activity.id)}
              onToggleFavorite={toggleFavorite}
            />
          ))}
        </div>

        {filteredActivities.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No activities found in this category.</p>
          </div>
        )}

        <ArticlesSection
          articles={currentCity.articles || []}
          cityName={currentCity.name}
        />

        <CreatorsSection
          creators={currentCity.creators || []}
          cityName={currentCity.name}
        />
      </main>

      <footer className="bg-gray-800 text-white py-6 px-4 mt-12">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-400">Things to Do in {currentCity.name} - Discover your next adventure</p>
        </div>
      </footer>
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50" />}>
      <HomeContent />
    </Suspense>
  );
}
