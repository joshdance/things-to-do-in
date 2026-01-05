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
