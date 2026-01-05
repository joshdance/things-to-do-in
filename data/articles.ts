import { Article } from "@/types/article";

// Articles that recommend various activities
export const articles: Article[] = [
  {
    id: "1",
    title: "Best Things to Do in London with Kids",
    url: "https://fullsuitcase.com/best-things-london-kids/",
    source: "fullsuitcase",
    city: "london",
    activityIds: ["119"], // The Royal Mews
  },
  {
    id: "2",
    title: "Hidden Gems in London | 21 non touristy things to do in London",
    url: "https://thetravelscribes.com/non-touristy-things-to-do-in-london-hidden-gems/",
    source: "thetravelscribes",
    city: "london",
    activityIds: ["149", "150", "151", "152", "153", "154", "155", "156", "157", "158", "159", "160", "161", "162", "163", "164", "165", "166", "167", "168", "169"],
  },
  {
    id: "3",
    title: "25 Great Things To Do In Seattle If You're Visiting For The First Time",
    url: "https://paperplanesandcaramelwaffles.com/things-to-do-in-seattle-first-time-visitors/",
    source: "paperplanesandcaramelwaffles",
    city: "seattle",
    activityIds: ["60", "64", "67"],
  },
  {
    id: "4",
    title: "23 Free and Cheap Things To Do in Seattle, Washington",
    url: "https://gobackpacking.com/free-things-to-do-seattle/",
    source: "gobackpacking",
    city: "seattle",
    activityIds: ["63"],
  },
  {
    id: "5",
    title: "Locals Guide to Seattle",
    url: "https://seekingthenow.com/destinations/washington/locals-guide-to-seattle/",
    source: "seekingthenow",
    city: "seattle",
    activityIds: ["60", "64", "72", "84", "85", "87", "88", "91", "93", "94", "96", "101", "107", "112", "170", "171", "172", "173", "174", "175", "176", "177", "178", "179", "180", "181", "182", "183", "184", "185", "186", "187", "188", "189", "190", "191", "192", "193", "194"],
  },
];

// Helper function to get articles by city
export function getArticlesByCity(city: string): Article[] {
  return articles.filter((article) => article.city === city);
}

// Helper function to get articles that recommend a specific activity
export function getArticlesByActivityId(activityId: string): Article[] {
  return articles.filter((article) => article.activityIds.includes(activityId));
}

// Helper function to get all articles
export function getAllArticles(): Article[] {
  return articles;
}
