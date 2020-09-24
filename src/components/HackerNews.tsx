import * as React from "react";
import {
  FirebaseAppProvider,
  useDatabaseObjectData,
  useDatabase
} from "reactfire";

const HN_DATABASE_URL = " https://hacker-news.firebaseio.com";

const firebaseConfig = {
  // projectId: "tech-gossip",
  databaseURL: HN_DATABASE_URL
};

export interface StoryItem {
  by: string;
  descendants: number;
  id: number;
  kids: number[];
  score: number;
  time: number;
  title: string;
  type: "story";
  url: string;
}

export interface CommentItem {
  by: string;
  id: number;
  kids: number[];
  parent: number[];
  text: string;
  time: number;
  type: "comment";
}

type Item = StoryItem | CommentItem;

export const HackerNews: React.FC = (props) => {
  return <FirebaseAppProvider firebaseConfig={firebaseConfig} {...props} />;
};

export function useItem<T = Item>(id: number) {
  const db = useDatabase();
  return useDatabaseObjectData<T>(db.ref(`v0/item/${id}`));
}
