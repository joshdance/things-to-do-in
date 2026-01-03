export type Category =
  | "food-drink"
  | "attractions"
  | "outdoor"
  | "arts-culture"
  | "entertainment"
  | "shopping"
  | "sports";

export type City = "oklahoma-city" | "salt-lake-city" | "seattle";

export interface Activity {
  id: string;
  name: string;
  description: string;
  category: Category;
  address: string;
  city: City;
  website?: string;
  imageUrl?: string;
  priceRange?: "$" | "$$" | "$$$" | "$$$$";
}
