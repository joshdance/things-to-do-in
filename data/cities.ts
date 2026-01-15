import { Video } from "@/types/activity";

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
  videos?: Video[];
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
  "wales": {
    name: "Wales",
    state: "Wales",
    articles: [
      {
        title: "Things to Do with Kids in Wales",
        url: "https://www.vrbo.com/en-gb/holiday-homes/family/destinations/inspiration/things-to-do-with-kids-in-wales",
        source: "VRBO",
        description: "Family-friendly guide to activities, attractions, and adventures for kids in Wales, from science centers to underground caverns.",
      },
      {
        title: "Wales Family Holiday",
        url: "https://www.vrbo.com/en-gb/holiday-homes/family/destinations/inspiration/wales-family-holiday",
        source: "VRBO",
        description: "Comprehensive guide to planning the perfect family holiday in Wales, featuring holiday parks, outdoor adventures, and toddler-friendly accommodations.",
      },
      {
        title: "A Welsh Bucket List: What to Do in Wales, United Kingdom",
        url: "https://theroadlestraveled.com/a-welsh-bucket-list-what-to-do-in-wales-united-kingdom/",
        source: "The Road Les Traveled",
        description: "Comprehensive bucket list featuring Wales' most iconic castles, national parks, charming villages, and traditional Welsh experiences.",
      },
      {
        title: "Best Things to Do in Wales – Ultimate Road Trip Itinerary",
        url: "https://thewildlylife.com/things-to-do-in-wales/",
        source: "The Wildly Life",
        description: "Ultimate road trip itinerary covering the best things to do across North and South Wales, featuring coastal scenery and hidden gems.",
      },
      {
        title: "Things to Do in Wales",
        url: "https://www.visitwales.com/things-do",
        source: "Visit Wales",
        description: "Official tourism guide featuring adventure sports, heritage sites, natural attractions, family activities, and cultural experiences across Wales.",
      },
      {
        title: "The Most Beautiful Places to Visit in Wales",
        url: "https://readysetjetset.net/wales-beautiful-places/",
        source: "Ready Set Jetset",
        description: "Photography guide to Wales' most Instagram-worthy locations, featuring coastal towns, scenic photo spots, and picturesque destinations.",
      },
    ],
    videos: [
      {
        url: "https://www.youtube.com/watch?v=0sIkFJU0HLo",
        platform: "youtube",
        title: "Wales",
      },
      {
        url: "https://www.youtube.com/watch?v=DBmQwQco5H4",
        platform: "youtube",
        title: "Wales",
      },
    ],
  },
};
