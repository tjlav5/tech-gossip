import * as React from "react";
import { useParams } from "react-router-dom";
import { useItem, StoryItem, CommentItem } from "./HackerNews";

export const Story: React.FC = () => {
  const { id } = useParams();
  return (
    <React.Suspense fallback={<div>Loading story...</div>}>
      <StoryFoo id={id} />
    </React.Suspense>
  );
};

enum Tab {
  DISCUSSION,
  PREVIEW
}

const StoryFoo: React.FC<{ id: number }> = ({ id }) => {
  const [tab, setTab] = React.useState(Tab.DISCUSSION);
  const story = useItem<StoryItem>(id);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        width: "100vw"
      }}
    >
      <div>
        <div>{story.title}</div>
        <div>
          <button onClick={() => setTab(Tab.DISCUSSION)}>Discussion</button>
          <button onClick={() => setTab(Tab.PREVIEW)}>Preview</button>
        </div>
      </div>
      {tab === Tab.DISCUSSION ? (
        <StoryDiscussion story={story} />
      ) : (
        <div style={{ flex: 1 }}>
          <StoryPreview story={story} />
        </div>
      )}
    </div>
  );
};

const StoryDiscussion: React.FC<{ story: StoryItem }> = ({ story }) => (
  <React.Suspense fallback={<div>Loading comments</div>}>
    {story.kids.map((k) => (
      <Comment key={k} id={k} />
    ))}
  </React.Suspense>
);

const StoryPreview: React.FC<{ story: StoryItem }> = ({ story }) => (
  <iframe
    src={story.url}
    title={story.title}
    style={{ border: "none", height: "100%", width: "100%" }}
  ></iframe>
);

var decodeHtmlEntity = function (str) {
  return str.replace(/&?#(\w+);/g, function (match, dec) {
    return String.fromCharCode(dec);
  });
};

const Comment: React.FC<{ id: number }> = ({ id }) => {
  const comment = useItem<CommentItem>(id);
  console.log(comment.text);
  const foo = decodeHtmlEntity(comment.text);
  const foos = foo.split("<p>");
  return (
    <>
      {foos.map((f) => (
        <div key={f}>{f}</div>
      ))}
    </>
  );
};
