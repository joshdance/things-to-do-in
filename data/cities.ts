export interface CityArticle {
  title: string;
  url: string;
  source: string;
  description?: string;
}

export interface CityCreator {
  name: string;
  url: string;
  description?: string;
  platform?: string;
}

export interface CityInfo {
  name: string;
  state: string;
  articles?: CityArticle[];
  creators?: CityCreator[];
}

export const cities: Record<string, CityInfo> = {
  "oklahoma-city": {
    name: "Oklahoma City",
    state: "Oklahoma",
    articles: [],
  },
  "salt-lake-city": {
    name: "Salt Lake City",
    state: "Utah",
    articles: [],
  },
  "seattle": {
    name: "Seattle",
    state: "Washington",
    articles: [],
  },
  "london": {
    name: "London",
    state: "England",
    articles: [
      {
        title: "Best Things to Do in London with Kids",
        url: "https://fullsuitcase.com/best-things-london-kids/",
        source: "Full Suitcase",
        description: "Family-friendly guide covering top attractions, tours, and activities for visiting London with children.",
      },
      {
        title: "The 14 Best Things to Do in London with a Toddler",
        url: "https://thekittchen.com/the-14-best-things-to-do-in-london-with-a-toddler/",
        source: "The Kittchen",
        description: "Comprehensive guide specifically designed for families with toddlers, featuring play areas, museums, and outdoor spaces perfect for young children.",
      },
    ],
    creators: [
      {
        name: "Secret London",
        url: "https://secretldn.com/",
        description: "Discover hidden gems, unique experiences, and off-the-beaten-path adventures in London.",
        platform: "Website",
      },
    ],
  },
};
