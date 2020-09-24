import * as React from "react";
import { useDatabaseList, useDatabaseListData, useDatabase } from "reactfire";
import { StoryListItem } from "../components/StoryListItem";

export const TopStories: React.FC = () => (
  <React.Suspense fallback={<div>Loading top stories...</div>}>
    <TopStoriesContent />
  </React.Suspense>
);

export const TopStoriesContent: React.FC = () => {
  const db = useDatabase();
  const ids = useDatabaseListData<number>(db.ref("v0/topstories"));
  const uniqueIds = new Set(ids);
  return (
    <>
      {[...uniqueIds.values()].map((id) => (
        <StoryListItem key={id} id={id} />
      ))}
    </>
  );
};
