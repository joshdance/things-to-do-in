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
    articles: [
      {
        title: "25 Great Things To Do In Seattle If You're Visiting For The First Time",
        url: "https://paperplanesandcaramelwaffles.com/things-to-do-in-seattle-first-time-visitors/",
        source: "Paper Planes and Caramel Waffles",
        description: "Comprehensive first-timer's guide to Seattle covering iconic landmarks, hidden gems, and must-see attractions.",
      },
      {
        title: "23 Free and Cheap Things To Do in Seattle, Washington",
        url: "https://gobackpacking.com/free-things-to-do-seattle/",
        source: "Go Backpacking",
        description: "Budget-friendly guide to exploring Seattle without breaking the bank, featuring free attractions and affordable activities.",
      },
      {
        title: "Locals Guide to Seattle",
        url: "https://seekingthenow.com/destinations/washington/locals-guide-to-seattle/",
        source: "Seeking The Now",
        description: "Insider's guide to Seattle featuring local favorites, hidden neighborhoods, authentic restaurants, and off-the-beaten-path experiences.",
      },
    ],
    creators: [
      {
        name: "Secret Seattle",
        url: "https://secretseattle.co/",
        description: "Discover hidden gems, quirky restaurants, secret bars, and the best exhibitions, shows, and nightlife in Seattle.",
        platform: "Website",
      },
      {
        name: "The 500 Hidden Secrets of Seattle",
        url: "https://www.the500hiddensecrets.com/united-states/seattle",
        description: "Curated travel guide featuring 500 hidden spots hand-picked by local authors, covering dining, culture, shopping, and outdoor activities.",
        platform: "Book/Website",
      },
    ],
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
