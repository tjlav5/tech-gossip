import * as React from "react";
import { useItem, StoryItem } from "./HackerNews";
import { Link } from "react-router-dom";

export const StoryListItem: React.FC<{ id: number }> = ({ id }) => (
  <React.Suspense fallback={<div>loading story...</div>}>
    <StoryContent id={id} />
  </React.Suspense>
);

const StoryContent: React.FC<{ id: number }> = ({ id }) => {
  const story = useItem<StoryItem>(id);
  return (
    <div>
      <Link to={`/item/${story.id}`}>{story.title}</Link>
    </div>
  );
};
