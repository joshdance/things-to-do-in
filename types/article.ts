import { City } from "./activity";

export interface Article {
  id: string;
  title: string;
  url: string;
  source: string; // e.g., "fullsuitcase"
  city: City;
  activityIds: string[]; // IDs of activities recommended in this article
}
